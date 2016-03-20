Rinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateROutput(Routput[0], this.value);
    }

})
.on('input', function() {
    updateROutput(Routput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Cinput.val(255 - this.value);
        Cinput.trigger('change');
        updateCOutput(Coutput[0], 255 - this.value);
        var hsl = rgbToHsl(this.value, Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([this.value/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [this.value, Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});


Ginput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateGOutput(Goutput[0], this.value);
    }

})
.on('input', function() {
    updateGOutput(Goutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Minput.val(255 - this.value);
        Minput.trigger('change');
        updateMOutput(Moutput[0], 255 - this.value);
        var hsl = rgbToHsl(Rinput.val(), this.value, Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([Rinput.val()/255, this.value/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), this.value, Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});


Binput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateBOutput(Boutput[0], this.value);
    }

})
.on('input', function() {
    updateBOutput(Boutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Yinput.val(255 - this.value);
        Yinput.trigger('change');
        updateYOutput(Youtput[0], 255 - this.value);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), this.value);
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, this.value/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), this.value].join(',') + ')';
        triggerChange = true;
    }
});

Cinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateCOutput(Coutput[0], this.value);
    }

})
.on('input', function() {
    updateCOutput(Coutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Rinput.val(255 - this.value);
        Rinput.trigger('change');
        updateROutput(Routput[0], 255 - this.value);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

Minput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateMOutput(Moutput[0], this.value);
    }

})
.on('input', function() {
    updateMOutput(Moutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Ginput.val(255 - this.value);
        Ginput.trigger('change');
        updateGOutput(Goutput[0], 255 - this.value);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

Yinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateYOutput(Youtput[0], this.value);
    }

})
.on('input', function() {
    updateYOutput(Youtput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        Binput.val(255 - this.value);
        Binput.trigger('change');
        updateBOutput(Boutput[0], 255 - this.value);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

Hinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateHOutput(Houtput[0], this.value);
    }

})
.on('input', function() {
    updateHOutput(Houtput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        var rgb = hslToRgb(this.value/360, Sinput.val()/100, Linput.val()/100);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

Sinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateSOutput(Soutput[0], this.value);
    }

})
.on('input', function() {
    updateSOutput(Soutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        var rgb = hslToRgb(Hinput.val()/360, this.value/100, Linput.val()/100);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

Linput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateLOutput(Loutput[0], this.value);
    }

})
.on('input', function() {
    updateLOutput(Loutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        var rgb = hslToRgb(Hinput.val()/360, Sinput.val()/100, this.value/100);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var luv = fromRGBtoLUV([Rinput.val()/255, Ginput.val()/255, Binput.val()/255]);
        updateLUV(luv[0], luv[1], luv[2]);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

linput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updatelOutput(loutput[0], this.value);
    }

})
.on('input', function() {
    updatelOutput(loutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        var rgb = fromLUVtoRGB([parseInt(this.value), parseInt(uinput.val()), parseInt(vinput.val())]);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

uinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updateuOutput(uoutput[0], this.value);
    }

})
.on('input', function() {
    updateuOutput(uoutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        var rgb = fromLUVtoRGB([parseInt(linput.val()), parseInt(this.value), parseInt(vinput.val())]);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});

vinput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        updatevOutput(voutput[0], this.value);
    }

})
.on('input', function() {
    updatevOutput(voutput[0], this.value);
    if (triggerChange) {
        triggerChange = false;
        console.log([linput.val(), uinput.val(), this.value]);
        var rgb = fromLUVtoRGB([parseInt(linput.val()), parseInt(uinput.val()), parseInt(this.value)]);
        console.log(rgb);
        updateRGB(rgb[0], rgb[1], rgb[2]);
        updateCMY(rgb[0], rgb[1], rgb[2]);
        var hsl = rgbToHsl(Rinput.val(), Ginput.val(), Binput.val());
        updateHSL(hsl[0]*360, hsl[1]*100, hsl[2]*100);
        colorDiv.style.backgroundColor = 'rgb(' + [Rinput.val(), Ginput.val(), Binput.val()].join(',') + ')';
        triggerChange = true;
    }
});
