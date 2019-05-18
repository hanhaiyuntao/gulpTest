/**
 * Created by 24028 on 2018/7/5.
 */


$(function(){
    $("#footer").load('footer.html');
})


var limit = 4;//每页显示数据
var page = 0;
$(function(){
    activeAjax();
    tuijian();
})
function activeAjax(){
    $.ajax({
        url:baseUrl+"/RValleyService.svc/GetDataActivitydynamicToList?jsoncallback=?",
        type:"get",
        dataType:"jsonp",
        data:{offset:page,limitnum:limit},
        success:function (data) {
            var QDstr = QDecrypt(data)
            var bca = eval('('+QDstr+')');
            //console.log(bca);
            if(bca.Code=='200'){
                if (bca.Results.length < limit) {
                    $('.fond_all').hide();

                }else{
                    $('.fond_all').show();

                }
                for(var i=0;i<bca.Results.length;i++ ){
                    var date = bca.Results[i].Modifydate;
                    var dateD=date.split("T");
                    var splitDate = dateD[0];//日期
                    var $newList = $(".newListContent");
                    var Min = bca.Results[i].Mincontent;
                    var winwidth = window.screen.width;
                    if(bca.Results[i].keyvalue !='推荐阅读'){
                        //console.log(bca.Results[i])
                        var html='<div class="news_left  mb20" onclick="checkAll(this)" id="'+bca.Results[i].Id+'" path="'+bca.Results[i].path+'">'
                            +'<div class="col-md-3 col-sm-3 col-xs-5 gust_left">'
                            +'<img class="img-responsive" src="'+bca.Results[i].Picturesource+'"/>'
                            +'</div>'
                            +'<div class="col-md-9 col-sm-9 col-xs-7 gust_right">'
                            +'<div class="comTitle">'
                            +'<span>'+bca.Results[i].Title+'</span>'
                            +'</div>'
                            +'<p style="clear:both" class="fontP">'+(winwidth>=768?Min.substring(0,46):Min.substring(0,20))+'...</p>'
                            +'<div class="dateFont bottom_date">'
                            +'<span class="pull-left ">'+bca.Results[i].keyvalue+'</span>'
                            +'<span class="pull-left le_date">'+splitDate+'</span>'
                            +'</div>'
                            +' </div>'
                            +'</div>'
                        $newList.append(html);
                    }
                }
            }
        },
        error:function(){
            alert('error');
        }
    });
}
//查看更多
function inFormation() {
    page = page + 4;
    $.ajax({
        url: baseUrl+"/RValleyService.svc/GetDataActivitydynamicToList?jsoncallback=?",
        type: "get",
        dataType: "jsonp",
        data: {offset:page,limitnum:limit},
        success:function (data) {
            var QDstr = QDecrypt(data)
            var bca = eval('(' + QDstr + ')');

            if(bca.Code=='200'){
                if(bca.Results.length == 0) {
                    $(".warn_font").html("没有更多数据");
                    $(".warn_wrap").fadeIn();
                    setTimeout(function(){
                        $(".warn_wrap").fadeOut();
                    },2000);

                }
                for(var i=0;i<bca.Results.length;i++ ){
                    var date = bca.Results[i].Modifydate;
                    var dateD=date.split("T");
                    var splitDate = dateD[0];
                    var $newList = $(".newListContent");
                    var Min = bca.Results[i].Mincontent;
                    var winwidth = window.screen.width;

                    var html='<div class="news_left mb20" onclick="checkAll(this)" id="'+bca.Results[i].Id+'" path="'+bca.Results[i].path+'">'
                        +'<div class="col-md-3 col-sm-3 col-xs-5 gust_left">'
                        +'<img class="img-responsive" src="'+bca.Results[i].Picturesource+'"/>'
                        +'</div>'
                        +'<div class="col-md-9 col-sm-9 col-xs-7 gust_right">'
                        +'<div class="comTitle">'
                        +'<span>'+bca.Results[i].Title+'</span>'
                        +'</div>'
                        +'<p style="clear:both" class="fontP">'+(winwidth>=768?Min.substring(0,46):Min.substring(0,20))+'...</p>'
                        +'<div class="dateFont bottom_date">'
                        +'<span class="pull-left">'+bca.Results[i].keyvalue+'</span>'
                        +'<span class="le_date pull-left">'+splitDate+'</span>'
                        +'</div>'
                        +' </div>'
                        +'</div>'
                    $newList.append(html);
                }
            }

        },
        error:function(){
            //alert('error');
        }
    });

}
//产品推荐


function tuijian() {


    $.ajax({
        url: baseUrl + "/RValleyService.svc/GetDataActivitydynamicRecommendToList?jsoncallback=?",
        type: 'get',
        dataType: 'jsonp',
        data: { keyvalue: "推荐阅读" },
        success: function(data) {
            var QDstr = QDecrypt(data)
            var bca = eval('(' + QDstr + ')');

            if (bca.Code == '200') {
                //console.log(bca.Results)
                if (bca.Results.length == 0) {
                    console.log(bca.Results.length)
                    $(".warn_font").html("没有更多数据")
                    $(".warn_wrap").fadeIn();
                    setTimeout(function() {
                        $(".warn_wrap").fadeOut();
                    }, 2000);

                }
                for (var i = 0; i < bca.Results.length; i++) {
                    //	console.log(bca.Results[i].keyvalue);
                    var date = bca.Results[i].Modifydate;
                    var dateD = date.split("T");
                    var splitDate = dateD[0];
                    var Min = bca.Results[i].Mincontent;
                    var read_right = $(".read_right")
                    var html = '<li class="mb20" onclick="recommend(this)" id=' + bca.Results[i].Id + ' path="' + bca.Results[i].path + '">'
                        + '<p class="fs14 re_color lin20">' + bca.Results[i].Title + '</p>'
//			                              +'<span class="fs12 re_color">'+splitDate+'</span>'
                        + '</li>';

                    read_right.append(html);

                }
                var index = 0;
                $(".ac_next").click(function() {
                    if ($(".read_right").is(":animated")) {
                        return;
                    }
                    if (index < (bca.Results.length - 9)) {
                        index++;
                        $(".read_right").animate({ "top": -(index * 40) }, 400)
                    } else {
                    }

                });
                //  点击左按钮从下边进
                $(".ac_prev").click(function() {
                    if (index > 0) {
                        index--;
                        $(".read_right").animate({ "top": -(index * 40) }, 400)
                    } else {

                    }
                });
                //点击右按钮从上边进
            }

        },
        error: function() {

        }

    });
}

//点击跳转产品详情页
function checkAll(ele){
    var productId = $(ele).attr('id');
    var path = $(ele).attr('path');
    console.log(path)
    $(ele).siblings().find(".comTitle").removeClass('activeFont');
    $(ele).find(".comTitle").addClass('activeFont');
    if(path!='null'&&path!=''){
        window.open(path);
    }else {
        window.location.href = 'productDetails.html?id='+productId;
    }
};
//点击右侧跳转
function recommend(ele){
    var recommendId = $(ele).attr('id');
    var path = $(ele).attr('path');
    if(path!=null&&path!=''){
        window.open(path);
    }else{
        window.location.href = 'productDetails.html?id='+recommendId;

    }
};

$(".load_more").hover(function() {
        $(".load_more").attr("src", "../img/active-img/button_suspension.png");
    }, function() {
        $(".load_more").attr("src", "../img/active-img/button_default.png");
    }
);
