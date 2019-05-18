$(function(){
    $("#footer").load('footer.html');
productAjax();
 window.onresize = function () {
        location.reload();
    };
})

/*获取url地址栏参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var fundid = GetQueryString("id");
var id = fundid;
var productArr = [];

/*内容*/
function productAjax(){
	$.ajax({
        url:baseUrl+"/RValleyService.svc/GetResearchReport?jsoncallback=?",
        type:"post",
        dataType:"json",
        data:{id:id},
        success:function (data) {
        var QDstr = QDecrypt(data)	    
        var bca = eval('(' + QDstr + ')');
        var date = bca[0].Modifydate;
				var dateD=date.split("T");
				var splitDate = dateD[0];//日期 
         var list = '<div>'
                      +'<p class="comTitle fs20" style="font-weight:600;">'+bca[0].Title+'</p>'
                      +'<P class="fs16 col6">'
							        +'<span>'+splitDate+'</span>'
							        +'<span style="padding-left:30px;">'+bca[0].keyvalue+'</span>'
							        +'</P>'
							        +'<P class="product_wrap">'+bca[0].Activitycontent+'</P>'
							        +'</div>'
         $(".col-md-8").append(list) ;
         var authorContent = '<div class="use_img"><img src="'+bca[0].author_picture+'"/></div>'
                             +'<p class="use_Name text-center" style="margin-top:75px;font-size:16px;font-weight:600;"">'+bca[0].author_name+'</p>'
                             +'<p style="font-size:14px;margin-bottom:20px;line-height:24px;">'+bca[0].author_content+'</p>'
           $(".author_wrap").append(authorContent); 
           var keyvalue = bca[0].keyvalue;
           var author_id= bca[0].authorid;
          // relativeAjax(keyvalue,author_id);  
          
           var imgWidth =$(".product_left").width();
           var imgHeight = imgWidth*2/3;
           $(".product_left img").css({"height":imgHeight+'px','width':imgWidth+'px'});
        },

        error:function(){
        	alert('error');
        }
    });
}

/*右侧推荐阅读*/
//function relativeAjax(keyvalue,author_id){
//     
//		$.ajax({
//          url:baseUrl+"/RValleyService.svc/GetDataActivitydyauthorToList?jsoncallback=?",
//          type:"get",
//          dataType:"jsonp",
//          data:{id:id,keyvalue:keyvalue,author_id:author_id},
//          success:function (data) {
//              var QDstr = QDecrypt(data)
//              var bca = eval('(' + QDstr + ')'); 
//              if(bca.Code=='200'){ 
//              	 for(var i=0;i<bca.Results.length;i++ ){
//                      var id = bca.Results[i].Id;
//              	 	var date = bca.Results[i].Modifydate;
//						var dateD=date.split("T");
//						var splitDate = dateD[0];//日期 
//              	 	var $relative_read = $(".relative_read"); 
//              	 	if (i<=3) {
//                          var activitycontent = bca.Results[i].Activitycontent;
//                          productArr.push(activitycontent);
//
//              	 		var html='<li class="mb30" onclick="rightConent(this)" path="'+bca.Results[i].path+'" style="cursor:pointer;">'
//							                    	+'<p class="fs14 col6 lin24">'+bca.Results[i].Title+'</p>'
//							                	 	+'<p style="clear:both" class="fs14 col9">'+bca.Results[i].Mincontent.substring(0,30)+'...'+'</p>'
//							                	
//		                          +'</li>'
//		                      $(".relative_read").append(html);
//              	 	}
//
//              	 	
//              	 }    	
//              }
//
//          },
//          error:function(){
//          	alert('error');
//          }
//
//      });
//
//	}
//  function rightConent(ele){
//   $(".col-md-8").html("");
//   var path = $(ele).attr('path');
//			 	if(path!='null'&&path!=''){
//           		window.location.href = path;
//           	}else{
//           	$(".col-md-8").html(productArr[$(ele).index()]);
// 
//			 }
//       
//  }
