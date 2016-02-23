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

function rgbToLuv(R, G, B) {
    r = R/255, g = G/255, b = B/255;

    if (r > 0.04045)
        r = Math.pow(((r + 0.055) / 1.055), 2.4);
    else
        r = r / 12.92;
    if (g > 0.04045)
        g = Math.pow(((g + 0.055) / 1.055), 2.4);
    else
        g = g / 12.92;
    if (b > 0.04045)
        b = Math.pow(((b + 0.055) / 1.055), 2.4);
    else
        b = b / 12.92;

    r *= 100, g *= 100, b *= 100;

    var X = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var Z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    var U = (4 * X) / (X + (15 * Y) + (3 * Z));
    var V = (9 * Y) / (X + (15 * Y) + (3 * Z));
    Y = Y / ref_Y;

    if (Y > 0.008856)
        Y = Math.pow(Y, 1/3);
    else
        Y = (7.787 * Y) + (4.0 / 29.0);

    var ref_X = 95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;


    var ref_U = (4 * ref_X) / (ref_X + (15 * ref_Y) + (3 * ref_Z));
    var ref_V = (9 * ref_Y) / (ref_X + (15 * ref_Y) + (3 * ref_Z));

    res_L = (116 * Y) - 16;
    res_U = 13 * res_L * (U - ref_U);
    res_V = 13 * res_L * (V - ref_V);

    return [res_L, ref_U, ref_V];
}

function luvToRgb(res_L, res_U, res_V) {
    var Y = (res_L + 16) / 116;
    if (Math.pow(Y, 3) > 0.008856)
        Y = Math.pow(Y, 3);
    else
        Y = (Y - 4.0 / 29.0) / 7.787;

    var ref_X = 95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var ref_U = (4 * ref_X) / (ref_X + (15 * ref_Y) + (3 * ref_Z));
    var ref_V = (9 * ref_Y) / (ref_X + (15 * ref_Y) + (3 * ref_Z));

    var U = res_U / (13 * res_L) + ref_U;
    var V = res_V / (13 * res_L) + ref_V;

    Y = Y * ref_Y;
    var X =  - (9 * Y * U) / (( U - 4) * V  - U * V);
    var Z = (9 * Y - (15 * V * Y) - (V * X)) / (3 * V);

    X = X / 100;
    Y = Y / 100;
    Z = Z / 100;

    R = X *  3.2406 + Y * (-1.5372) + Z * (-0.4986);
    G = X * (-0.9689) + Y *  1.8758 + Z *  0.0415;
    B = X *  0.0557 + Y * (-0.2040) + Z *  1.0570;

    if (R > 0.0031308)
        R = 1.055 * (Math.pow(R , (1 / 2.4))) - 0.055;
    else
        R = 12.92 * R;
    if (G > 0.0031308)
        G = 1.055 * (Math.pow(G, (1 / 2.4))) - 0.055;
    else
        G = 12.92 * G;
    if (B > 0.0031308)
        B = 1.055 * (Math.pow(B, (1 / 2.4))) - 0.055;
    else
        B = 12.92 * B;

    return [R, G, B];
}
