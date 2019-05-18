
$(function() {

    //停止轮播
    $('.carousel').carousel('pause');

    $(".bnt_left img").hover(function() {
        $(this).attr("src", "img/index/up_but1.png");
    }, function() {
        $(this).attr("src", "img/index/up_but.png");
    })
    $(".bnt_right img").hover(function() {
        $(this).attr("src", "img/index/down_but2.png");
    }, function() {
        $(this).attr("src", "img/index/down_but.png");
    })
    $(".bnt_left1 img").hover(function() {
        $(this).attr("src", "img/index/up_but1.png");
    }, function() {
        $(this).attr("src", "img/index/up_but.png");
    })
    $(".bnt_right1 img").hover(function() {
        $(this).attr("src", "img/index/down_but2.png");
    }, function() {
        $(this).attr("src", "img/index/down_but.png");
    })

    /*$(".com_div").hover(function(){
     $(this).animate({top:"-20px"});
     },function(){
     $(this).animate({top:"0px"});
     })*/
    //点击申请试用
    $(".com_use").click(function() {
        $(this).parent().parent().find(".com_use").removeClass("comBg");
        $(this).addClass("comBg");

        $("#clear_apply").find('input').val("");
        $("#clear_apply").find('textarea').val("");
        $("#mymodal").modal("show");
    });

    //联系我们

    function validata() {

        var ipName = $("#inp_name").val();
        if (ipName == '') {

            $('#warn').modal('show');
            $(".warnContent").html("请输入您的姓名");
            return false;
        }
        var phone = /^1[34578]\d{9}$/;
        if ($("#inp_phone").val() == '') {
            $('#warn').modal('show');
            $(".warnContent").html("请输入手机号码");
            return false;
        } else if (!phone.test($("#inp_phone").val())) {
            $('#warn').modal('show');
            $(".warnContent").html("请输入正确的电话号码");
            return false;
        };
        var inp_mailbox = $("#inp_mailbox").val();
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (inp_mailbox == '') {
            $('#warn').modal('show');
            $(".warnContent").html("请输入邮箱");
            return false;
        } else if (!email.test(inp_mailbox)) {
            $('#warn').modal('show');
            $(".warnContent").html("请输入正确的邮箱");
            return false;
        }
        if ($("#report_cont").val() == '') {
            $('#warn').modal('show');
            $(".warnContent").html("请输入您的建议");
            return false;
        }
        return true;
    };

    var obj = {};
    $("#submit").click(function() {
        if (!validata()) {

            return;
        }
        var ipName = $("#inp_name").val();
        var ipPhone = $("#inp_phone").val();
        var ipEmail = $("#inp_mailbox").val();
        var report_cont = $("#report_cont").val();
        obj = {
            name: ipName,
            tel: ipPhone,
            email: ipEmail,
            suggestion: report_cont,
        };
        Contact_us(obj);
    });

    function Contact_us(obj) {
        var obj = obj;
        //序列化对象
        var jsonobj = JSON.stringify(obj);
        //加密Action
        var suggest = QEncrypt(jsonobj);

        $.ajax({
            url: baseUrl + "/RValleyService.svc/SubmitSuggestion?jsoncallback=?",
            type: "get",
            dataType: "jsonp",
            data: {
                usertoken: '123',
                suggestion: suggest
            },
            success: function(data) {
                var QDstr = QDecrypt(data);
                var bca = eval('(' + QDstr + ')');
                /*console.log(bca);
                 console.log(bca.Code);*/
                $('#warn').modal('show');
                $(".warnContent").html(bca.Message);
                document.getElementById("opinionSubmit").addEventListener("click", function() {
                    $("#contact").find('input').val("");
                    $("#contact").find('textarea').val("");
                });
            },
            error: function() {
                //alert('')
            }
        });

    }
});