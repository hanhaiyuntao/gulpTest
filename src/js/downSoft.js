$('#sy').css('color','#9d9d9d');
$('#fw').css('color','#9d9d9d');
$('#hd').css('color','#9d9d9d');
$("#gy").css('color','#9d9d9d');
$("#downLoad").css('color','#fff');

$(".download>img").hover(function() {
		$(".download>img").attr("src", "../img/button_suspension.png")
	}, function() {
		$(".download>img").attr("src", "../img/button_default.png")
	}
);

$("#footer").load('footer.html');

function downSoft(){
	window.open('../app/xfund_setup_1_6_11_20190305001.exe');
}
$(".version").html("v1.6.11")
$(".newDate").html("2019/03/05")
