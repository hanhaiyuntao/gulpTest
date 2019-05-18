  //var baseUrl = 'http://192.168.1.125:93';
  var baseUrl = 'http://trumgu.com:93'
 var windowHeight = $(window).height();
 var header = $(".nav").height();
 var foot = $(".foot_wrap").height();
 var contenthHeight = windowHeight -260;
 $(".productList").css('min-height',contenthHeight);
$(function() {

    $("#bntLogin").click(function() {
    	return;
        $("#login_modal").modal("toggle");
    })
    $(".exit").click(function() {
        $(".login_clear").val('');
        $(".index_cover").css("display", "none")
    });

    //点击显示密码可见和密码不可见
    $("#watch").click(function() {
        if ($("#password").attr("type") == "password") {
            $("#password").attr("type", "text");
            $(this).find("img").attr("src", "img/icon3.png");

        } else {
            $("#password").attr("type", "password");
            $(this).find("img").attr("src", "img/icon2.png");
        }
    })

    
 

})
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?73cc5f564ddfb5a97b10564a2e3106bf";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();



//友盟 
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1264830265' style=\"display:none;\" %3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1264830265' type='text/javascript'%3E%3C/script%3E"));


