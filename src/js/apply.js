 
 $(function(){

	function validatas(){
		var phone = /^1[34578]\d{9}$/;    
		var phoneNum=$("#apply_phone").val();
		var phoneValidata=phone.test(phoneNum);
		var apply_suggestVal=$("#apply_suggest").val();
		var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		var apply_emailNum=$("#apply_email").val();
		var emailValidata=email.test(apply_emailNum);
		if($("#apply_company").val()==''){
			$('#warn').modal('show');
			$(".warnContent").html("请输入您的公司名称")
			return false;
		}
		if($("#apply_Name").val()==''){
			$('#warn').modal('show');
			$(".warnContent").html("请输入您的姓名")
			return false;
		}
		
		if($("#apply_phone").val()==''){
			$('#warn').modal('show');
			$(".warnContent").html("请输入手机号码")
			return false;
		}
		if(!phoneValidata){
           $('#warn').modal('show');
		   $(".warnContent").html("请输入正确的电话号码")
            return false;
      }	
    
        if($("#apply_email").val()==''){
        	$('#warn').modal('show');
			$(".warnContent").html("请输入邮箱")
        	 return false;
        }
        if (!emailValidata) {
            $('#warn').modal('show');
			$(".warnContent").html("请输入正确的邮箱")
            return false;
        }
        if(apply_suggestVal==''){
        	$('#warn').modal('show');
			$(".warnContent").html("请输入您的建议")
            return false;
        }
        return true;
	};
	
	var obj={};
	 $("#apply_use").click(function(){
	 	var validata=validatas();
	 	if(!validata){
	 		return;
	 	}

	 	var applyCompany=$("#apply_company").val();
	 	var applyName=$("#apply_Name").val();
	 	var applyPhone=$("#apply_phone").val();
	 	var applyEmail=$("#apply_email").val();
	 	var applySuggest=$("#apply_suggest").val();
	 	obj = {
            Name: applyName,
            CompanyName: applyCompany,
            Tel:applyPhone,
            Email: applyEmail,
            Advice: applySuggest
        };
  		Contact(obj);
  	})

	function Contact (obj) {
			var obj=obj;
	        //序列化对象
	        var jsonobj = JSON.stringify(obj);
	        //加密Action
	        var suggest = QEncrypt(jsonobj);
	     
	            $.ajax({
	                url: baseUrl+"/RValleyService.svc/SubUserTrial?jsoncallback=?",
	                type: "get",
	                dataType: "jsonp",
	                data: {
	                    usertoken: '123',
	                    userTrial: suggest
	                },
	                success: function (data) {
	                	// console.log(data)
	                    var QDstr = QDecrypt(data)
	                    var bca = eval('(' + QDstr + ')');
	                   /* console.log(bca);
	                    console.log(bca.Code);*/
	                  $('#warn2').modal('show');
					  $('.warnContent').html(bca.Message);					
					  document.getElementById("opinionSubmit").addEventListener("click", function(){
					    $("#clear_apply").find('input').val("");
						$("#clear_apply").find('textarea').val("");
						$("#mymodal").modal("toggle");
						
					});
					  		  				  
	                },
	                error:function(){
	                	
	                }
	            });
	       
		}
})
     