$(function(){
    $("#footer").load('footer.html');
})

$('#sy').css('color','#9d9d9d');
$('#fw').css('color','#9d9d9d');
$('#hd').css('color','#9d9d9d');
$("#zp").css('color','#fff');
$("#gy").css('color','#9d9d9d');
$(".nav_ul").on("click", "li", function() {
    $(this).siblings().find("a").removeClass('activeA');
    $(this).find("a").addClass('activeA');

    var index1 = $(this).index();
    if (index1 == 0) {
        $(".brand").show();
        $(".finance").hide();
        $(".markroom").hide();
        $(".jishu").hide();
        $(".reserach").hide();
    } else if (index1 == 1) {
        $(".finance").show();
        $(".markroom").hide();
        $(".brand").hide();
        $(".jishu").hide();
        $(".reserach").hide();

    } else if (index1 == 2) {
        $(".markroom").show();
        $(".finance").hide();
        $(".brand").hide();
        $(".jishu").hide();
        $(".reserach").hide();

    } else if (index1 == 3) {
        $(".brand").hide();
        $(".finance").hide();
        $(".markroom").hide();
        $(".reserach").hide();
        $(".jishu").show();
    } else if (index1 == 4) {
        $(".brand").hide();
        $(".finance").hide();
        $(".markroom").hide();
        $(".jishu").hide();
        $(".reserach").show();

    }
    return;
});
$(".bntUl").on("click", 'li', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('bntActive');
    $(this).addClass('bntActive');
    $(this).siblings().find('.changImg').attr('src', '../img/zhaopin_img/charge.png');
    $(this).find('.changImg').attr('src', '../img/zhaopin_img/unfurled.png');
    if (index == 0) {
        $(".media").show();
        $(".sell").hide();
    } else if (index == 1) {
        $(".media").hide();
        $(".sell").show();
    }
    return;
});
$(".bntUl1").on("click", 'li', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('bntActive');
    $(this).addClass('bntActive');
    $(this).siblings().find('.changImg').attr('src', '../img/zhaopin_img/charge.png');
    $(this).find('.changImg').attr('src', '../img/zhaopin_img/unfurled.png');
    if (index == 0) {
        $(".chanpin").show();
        $(".net").hide();
        $(".algorithm").hide();
    } else if (index == 1) {
        $(".chanpin").hide();
        $(".net").show();
        $(".algorithm").hide();
    } else if (index == 2) {
        $(".chanpin").hide();
        $(".algorithm").show();
        $(".net").hide();
    }
    return;
});
$(".bntUl2").on("click", 'li', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('bntActive');
    $(this).addClass('bntActive');
    $(this).siblings().find('.changImg').attr('src', '../img/zhaopin_img/charge.png');
    $(this).find('.changImg').attr('src', '../img/zhaopin_img/unfurled.png');
    if (index == 0) {
        $(".sell").show();
        $(".shixi").hide();

    } else if (index == 1) {
        $(".shixi").show();
        $(".sell").hide();

    }

    return;
});
