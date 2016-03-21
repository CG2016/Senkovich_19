var dropbox = document.getElementById('color-div');
dropbox.addEventListener('dragenter', noopHandler, false);
dropbox.addEventListener('dragexit', noopHandler, false);
dropbox.addEventListener('dragover', noopHandler, false);
dropbox.addEventListener('drop', drop, false);

function noopHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

function drop(evt) {
    imageLoading = true;
    evt.stopPropagation();
    evt.preventDefault();
    var image = evt.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = (function(image) {
        return function(e) {
            img.src = e.target.result;
        };
    })(image);
    reader.readAsDataURL(image);
}
