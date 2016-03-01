// 85, 30, 89 - car
function recolorImage() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    var convertParams = getConvertParams();
    var lr = convertParams[0];
    var uvr = convertParams[1];
    var oldLUV = convertParams[2];
    var newLUV = convertParams[3];
    var newColor = fromLUVtoRGB(newLUV);

    for (var i = 0; i < data.length; i += 4) {
        red = data[i + 0];
        green = data[i + 1];
        blue = data[i + 2];

        var currentColor = fromRGBtoLUV([red/255, green/255, blue/255]);
        var fits = ((oldLUV[0] - lr) < currentColor[0] && currentColor[0] < (oldLUV[0] + lr))
            && ((oldLUV[1] - uvr) < currentColor[1] && currentColor[1] < (oldLUV[1] + uvr))
            && ((oldLUV[2] - uvr) < currentColor[2] && currentColor[2] < (oldLUV[2] + uvr));

        if (!fits)
            continue;

        newColor[0] = currentColor[0];
        data[i + 0] = newColor[0];
        data[i + 1] = newColor[1];
        data[i + 2] = newColor[2];
    }
    console.log(diff);
    ctx.putImageData(imgData, 0, 0);
}

function getConvertParams() {
    var lr = parseInt(LRadiusOutput.val());
    var uvr = parseInt(UVRadiusOutput.val());
    var oldLUV = [parseInt(LOldOutput.val()), parseInt(UOldOutput.val()), parseInt(VOldOutput.val())];
    var newLUV = [parseInt(LOldOutput.val()), parseInt(UNewOutput.val()), parseInt(VNewOutput.val())];
    return [lr, uvr, oldLUV, newLUV];
}
