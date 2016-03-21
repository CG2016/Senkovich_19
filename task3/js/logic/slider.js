brightnessInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        brightnessOutput[0].textContent = Math.round(this.value);
    },

    onSlideEnd: function() {
        recolorImage();
    }

})
.on('input', function() {
    brightnessOutput[0].textContent = Math.round(this.value);
});

contrastInput.rangeslider({

    polyfill: false,

    // Callback function
    onInit: function() {
        contrastOutput[0].textContent = Math.round(this.value);
    },

    onSlideEnd: function() {
        recolorImage();
    }

})
.on('input', function() {
    contrastOutput[0].textContent = Math.round(this.value);
});
