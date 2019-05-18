/**
 * Created by 24028 on 2018/7/5.
 */
$(function() {
    $("#footer").load('footer.html');
})

//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addPolyline();//向地图中添加线
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(116.454493,39.93024);//定义一个中心点坐标
    map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

//标注线数组
var plPoints = [{style:"solid",weight:4,color:"#00f",opacity:0.4,points:["116.45385|39.930876","116.455027|39.930876","116.455027|39.93035","116.453832|39.93035","116.453832|39.930876"]}
];
//向地图中添加线函数
function addPolyline(){
    for(var i=0;i<plPoints.length;i++){
        var json = plPoints[i];
        var points = [];
        for(var j=0;j<json.points.length;j++){
            var p1 = json.points[j].split("|")[0];
            var p2 = json.points[j].split("|")[1];
            points.push(new BMap.Point(p1,p2));
        }
        var line = new BMap.Polyline(points,{strokeStyle:json.style,strokeWeight:json.weight,strokeColor:json.color,strokeOpacity:json.opacity});
        map.addOverlay(line);
    }
}

initMap();//创建和初始化地图