var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = start;
img.src = "images/example.jpg";
function start() {
    var ratio = 1;
    if (img.height > canvas.height || img.width > canvas.width) {
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        ratio = Math.min(hRatio, vRatio);
    }
    var centerShift_x = (canvas.width - img.width*ratio) / 2;
    var centerShift_y = (canvas.height - img.height*ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
              centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
}

var LRadiusInput = $('#LRadiusInput');
var LRadiusOutput = $('#LRadiusOutput');

var UVRadiusInput = $('#UVRadiusInput');
var UVRadiusOutput = $('#UVRadiusOutput');

var LOldInput = $('#LOldInput');
var LOldOutput = $('#LOldOutput');

var UOldInput = $('#UOldInput');
var UOldOutput = $('#UOldOutput');

var VOldInput = $('#VOldInput');
var VOldOutput = $('#VOldOutput');

var UNewInput = $('#UNewInput');
var UNewOutput = $('#UNewOutput');

var VNewInput = $('#VNewInput');
var VNewOutput = $('#VNewOutput');
