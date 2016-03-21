var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = start;
img.src = "images/empty.png";
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

var brightnessInput = $('#brightness-input');
var brightnessOutput = $('#brightness-output');

var contrastInput = $('#contrast-input');
var contrastOutput = $('#contrast-output');
