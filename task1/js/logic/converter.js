function rgbToHsl(R, G, B) {
    r = R/255, g = G/255, b = B/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}

function fromRGBtoXYZ(rgb) {
    var varR = rgb[0] / 255;
    var varG = rgb[1] / 255;
    var varB = rgb[2] / 255;

    if(varR <= 0.4045) {
        varR /= 12.92;
    }
    else {
        varR = Math.pow((varR + 0.055) / 1.055, 2.4);
    }

    if(varG <= 0.4045) {
        varG /= 12.92;
    }
    else {
        varG = Math.pow((varG + 0.055) / 1.055, 2.4);
    }

    if(varB <= 0.4045) {
        varB /= 12.92;
    }
    else {
        varB = Math.pow((varB + 0.055) / 1.055, 2.4);
    }

    varR *= 100;
    varG *= 100;
    varB *= 100;

    var xyz = [0, 0, 0];
    xyz[0] = 0.4124 * varR + 0.3576 * varG + 0.1805 * varB;
    xyz[1] = 0.2126 * varR + 0.7152 * varG + 0.0722 * varB;
    xyz[2] = 0.0193 * varR + 0.1192 * varG + 0.9505 * varB;

    //X from 0 to  95.047
    //Y from 0 to 100.000
    //Z from 0 to 108.883

    return xyz;
}

function fromXYZtoRGB(xyz) {
    var xVar = xyz[0] / 100;
    var yVar = xyz[1] / 100;
    var zVar = xyz[2] / 100;

    var varR = 3.2406 * xVar - 1.5372 * yVar - 0.4986 * zVar;
    var varG = -0.9689 * xVar + 1.8758 * yVar + 0.0415 * zVar;
    var varB = 0.0557 * xVar - 0.2040 * yVar + 1.0570 * zVar;

    if(varR > 0.0031308) {
        varR = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    }
    else {
        varR *= 12.92;
    }

    if(varG > 0.0031308) {
        varG = 1.055 * (Math.pow(varG, 1 / 2.4)) - 0.055;
    }
    else {
        varG *= 12.92;
    }

    if(varB > 0.0031308) {
        varB = 1.055 * (Math.pow(varB, 1 / 2.4)) - 0.055;
    }
    else {
        varB *= 12.92;
    }

    var rValue = varR * 255;
    var gValue = varG * 255;
    var bValue = varB * 255;

    var colorsPure = true;

    if(rValue < 0) {
        colorsPure = false;
        rValue = 0;
    }
    if(rValue > 255) {
        colorsPure = false;
        rValue = 255;
    }
    if(gValue < 0) {
        colorsPure = false;
        gValue = 0;
    }
    if(gValue > 255) {
        colorsPure = false;
        gValue = 255;
    }
    if(bValue < 0) {
        colorsPure = false;
        bValue = 0;
    }
    if(bValue > 255) {
        colorsPure = false;
        bValue = 255;
    }

    console.log("Was error: " + !colorsPure);

    return [rValue, gValue, bValue];
}

function fromXYZtoLUV(xyz) {
    var luv = [0, 0, 0];
    luv[0] = xyz[1];
    if(xyz[0] == 0 && xyz[2] == 0) {
        luv[1] = 0;
        luv[2] = 0;
    }
    else {
        luv[1] = 4 * xyz[0] / (xyz[0] + 15 * xyz[1] + 3 * xyz[2]);
        luv[2] = 9 * xyz[1] / (xyz[0] + 15 * xyz[1] + 3 * xyz[2]);
    }
    return luv;
}

function fromLUVtoXYZ(luv) {
    var xyz = [0, 0, 0];
    if(luv[2] == 0) {
        xyz[0] = 0;
        xyz[1] = 0;
        xyz[2] = 0;
        return xyz;
    }
    xyz[1] = luv[0];
    var eq = 9 * xyz[1] / luv[2];
    xyz[0] = luv[1] * eq / 4;
    xyz[2] = (eq - xyz[0] - 15 * xyz[1]) / 3;
    return xyz;
}

function rgbToLuv(R, G, B) {
    var xyz = fromRGBtoXYZ([R, G, B]);
    var luv = fromXYZtoLUV(xyz);
    return luv;
}

function luvToRgb(L, U, V) {
    var xyz = fromLUVtoXYZ([L, U, V]);
    var rgb = fromXYZtoRGB(xyz);
    return rgb;
}
