LRadiusInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        LRadiusOutput[0].textContent = Math.round(this.value);
    },

    onSlideEnd: function() {
        recolorImage();
    }

})
.on('input', function() {
    LRadiusOutput[0].textContent = Math.round(this.value);
});

UVRadiusInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        UVRadiusOutput[0].textContent = Math.round(this.value);
    },

    onSlideEnd: function() {
        recolorImage();
    }

})
.on('input', function() {
    UVRadiusOutput[0].textContent = Math.round(this.value);
});

LOldInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        LOldOutput[0].textContent = Math.round(this.value);
    }

})
.on('input', function() {
    LOldOutput[0].textContent = Math.round(this.value);
});

UOldInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        UOldOutput[0].textContent = Math.round(this.value);
    }

})
.on('input', function() {
    UOldOutput[0].textContent = Math.round(this.value);
});

VOldInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        VOldOutput[0].textContent = Math.round(this.value);
    }

})
.on('input', function() {
    VOldOutput[0].textContent = Math.round(this.value);
});

UNewInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        UNewOutput[0].textContent = Math.round(this.value);
    }

})
.on('input', function() {
    UNewOutput[0].textContent = Math.round(this.value);
});

VNewInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        VNewOutput[0].textContent = Math.round(this.value);
    }

})
.on('input', function() {
    VNewOutput[0].textContent = Math.round(this.value);
});
