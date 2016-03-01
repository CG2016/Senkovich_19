var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = start;
img.src = "images/example.jpg";
function start() {
    ctx.drawImage(img, 0, 0);
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
