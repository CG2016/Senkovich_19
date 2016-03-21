function recolorImage() {
    img.onload();
    $("#canvas").removeAttr("data-caman-id");
    Caman("#canvas", function () {
        this.brightness(parseInt(brightnessOutput.val()));
        this.contrast(parseInt(contrastOutput.val()));
        this.render();
    });
}
