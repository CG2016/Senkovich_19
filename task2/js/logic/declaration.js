var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = start;
img.src = "images/example.jpg";
function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, canvas.width / 2 - img.width / 2,
        canvas.height / 2 - img.height / 2);
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
