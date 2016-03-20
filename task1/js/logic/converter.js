var X_MAX = 95.047;
var Y_MAX = 100.0;
var Z_MAX = 108.883;

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

function convertLuvToXyz(luv) {
    var L = luv[0];
    var U = luv[1];
    var V = luv[2];
    if (U == 0 && V == 0 && L == 0) {
        return [0, 0, 0];
    }
    var tmpY = (L + 16) / 116.0;
    tmpY = Math.pow(tmpY, 3) > 0.008856 ? Math.pow(tmpY, 3) : (tmpY - 16.0 / 116) / 7.787;

    var refU = (4 * X_MAX) / (X_MAX + (15 * Y_MAX) + (3 * Z_MAX));
    var refV = (9 * Y_MAX) / (X_MAX + (15 * Y_MAX) + (3 * Z_MAX));

    var tmpU = U / (13 * L) + refU;
    var tmpV = V / (13 * L) + refV;

    var Y = tmpY * 100;
    var X = -(9 * Y * tmpU) / ((tmpU - 4) * tmpV - tmpU * tmpV);
    var Z = (9 * Y - (15 * tmpV * Y) - (tmpV * X)) / (3 * tmpV);

    Y = (Y < Y_MAX && Y > 0.) ? Y : (Y < 0.) ? 0 : Y_MAX;
    X = (X < X_MAX && X > 0.) ? X : (X < 0.) ? 0 : X_MAX;
    Z = (Z < Z_MAX && Z > 0.) ? Z : (Z < 0.) ? 0 : Z_MAX;

    return [X, Y, Z];
}

function convertXyzToRgb(xyz) {
    var X = xyz[0] / 100.0;
    var Y = xyz[1] / 100.0;
    var Z = xyz[2] / 100.0;
    var tmpX = X;
    var tmpY = Y;
    var tmpZ = Z;

    var tmpR = tmpX * 3.2406 + tmpY * -1.5372 + tmpZ * -0.4986;
    var tmpG = tmpX * -0.9689 + tmpY * 1.8758 + tmpZ * 0.0415;
    var tmpB = tmpX * 0.0557 + tmpY * -0.2040 + tmpZ * 1.0570;

    tmpR = tmpR > 0.0031308 ? 1.055 * Math.pow(tmpR, 1 / 2.4) - 0.055 : 12.92 * tmpR;
    tmpG = tmpG > 0.0031308 ? 1.055 * Math.pow(tmpG, 1 / 2.4) - 0.055 : 12.92 * tmpG;
    tmpB = tmpB > 0.0031308 ? 1.055 * Math.pow(tmpB, 1 / 2.4) - 0.055 : 12.92 * tmpB;

    var red = tmpR*255;
    var green = tmpG*255;
    var blue = tmpB*255;

    return [red, green, blue];
}

function convertRgbToXyz(rgb) {
    var tmpRed = rgb[0];
    var tmpBlue = rgb[2];
    var tmpGreen = rgb[1];

    tmpRed = tmpRed > 0.04045 ? Math.pow((tmpRed + 0.055) / 1.055, 2.4) : tmpRed / 12.92;
    tmpBlue = tmpBlue > 0.04045 ? Math.pow((tmpBlue + 0.055) / 1.055, 2.4) : tmpBlue / 12.92;
    tmpGreen = tmpGreen > 0.04045 ? Math.pow((tmpGreen + 0.055) / 1.055, 2.4) : tmpGreen / 12.92;

    tmpRed *= 100;
    tmpGreen *= 100;
    tmpBlue *= 100;

    var X = tmpRed * 0.4124 + tmpGreen * 0.3576 + tmpBlue * 0.1805;
    var Y = tmpRed * 0.2126 + tmpGreen * 0.7152 + tmpBlue * 0.0722;
    var Z = tmpRed * 0.0193 + tmpGreen * 0.1192 + tmpBlue * 0.9505;

    return [X, Y, Z];
}

function convertXyzToLuv(xyz) {
    var X = xyz[0];
    var Y = xyz[1];
    var Z = xyz[2];
    if (X == 0 && Y == 0 && Z == 0) {
        return [0, 0, 0];
    }
    var tmpU = (4 * X) / (X + (15 * Y) + (3 * Z));
    var tmpV = (9 * Y) / (X + (15 * Y) + (3 * Z));
    var tmpY = Y / 100;
    tmpY = tmpY > 0.008856 ? Math.pow(tmpY, 1.0 / 3) : (7.787 * tmpY) + (16.0 / 116);

    var refU = (4 * X_MAX) / (X_MAX + (15 * Y_MAX) + (3 * Z_MAX));
    var refV = (9 * Y_MAX) / (X_MAX + (15 * Y_MAX) + (3 * Z_MAX));

    var L = (116 * tmpY) - 16;
    var U = 13 * L * (tmpU - refU);
    var V = 13 * L * (tmpV - refV);

    return [L, U, V];
}

function fromRGBtoLUV(rgb) {
    var xyz = convertRgbToXyz(rgb);
    var luv = convertXyzToLuv(xyz);
    return luv;
}

function fromLUVtoRGB(luv) {
    var xyz = convertLuvToXyz(luv);
    var rgb = convertXyzToRgb(xyz);
    return rgb;
}
