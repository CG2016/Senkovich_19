var RADIX = 256;

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

function applyThresholding(thresholdFunction) {
    var leftCornerX = canvas.width > img.width ? canvas.width/2 - img.width/2 : 0;
    var leftCornerY = canvas.height > img.height ? canvas.height/2 - img.height/2 : 0;
    var imageWidth = canvas.width > img.width ? img.width : canvas.width;
    var imageHeight = canvas.height > img.height ? img.height : canvas.height;
    var imgData = ctx.getImageData(leftCornerX, leftCornerY, imageWidth, imageHeight);

    for(var y = 0; y < imgData.height; y++) {
        for(var x = 0; x < imgData.width; x++) {
            var i = (y * 4) * imgData.width + x * 4;
            var avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
            imgData.data[i] = avg;
            imgData.data[i + 1] = avg;
            imgData.data[i + 2] = avg;
        }
    }

    var threshold = thresholdFunction(imgData);

    for (var i = 0; i < imgData.data.length; i += 4) {
        if (imgData.data[i] < threshold) {
            imgData.data[i] = 255;
            imgData.data[i+1] = 255;
            imgData.data[i+2] = 255;
        }
        else {
            imgData.data[i] = 0;
            imgData.data[i+1] = 0;
            imgData.data[i+2] = 0;
        }
    }

    ctx.putImageData(imgData, leftCornerX, leftCornerY);
}

function otsu() {
    applyThresholding(otsuTreshold);
}

function maxEntropy() {
    applyThresholding(maxEntropyThreshold);
}

function otsuTreshold(imgData) {
      var n_t = histogram(imgData);
      console.log(n_t);

      var sum = sumIntensities(n_t);

      var otsuThreshold = calcOtsuThreshold(n_t, imgData.height * imgData.width, sum);

      return otsuThreshold;
}


function histogram(imgData) {
    var n_t = [];
    for(var i = 0; i < RADIX; i++) {
        n_t.push(0);
    }

    for (var i = 0; i < imgData.data.length; i += 4) {
        n_t[imgData.data[i]]++;
    }

    return n_t;
}

function sumIntensities(n_t) {
    var sum = 0;
    for (var i = 0; i < n_t.length; i++)
        sum += i * n_t[i];
    return sum;
}

function calcOtsuThreshold(n_t, N, sum) {
    var variance;
    var bestVariance = Number.NEGATIVE_INFINITY;

    var mean_bg = 0;
    var weight_bg = 0;

    var mean_fg = sum / N;
    var weight_fg = N;

    var diff_means;

    var t = 0;
    var otsuThreshold = 0;
    while (t < RADIX) {
        diff_means = mean_fg - mean_bg;
        variance = weight_bg * weight_fg * diff_means * diff_means;

        if (variance > bestVariance) {
            bestVariance = variance;
            otsuThreshold = t;
        }

        while (t < RADIX && n_t[t] == 0)
            t++;

        mean_bg = (mean_bg * weight_bg + n_t[t] * t) / (weight_bg + n_t[t]);
        mean_fg = (mean_fg * weight_fg - n_t[t] * t) / (weight_fg - n_t[t]);
        weight_bg += n_t[t];
        weight_fg -= n_t[t];
        t++;
    }

    return otsuThreshold;
}

function maxEntropyThreshold(imgData) {
    var hist = histogram(imgData);

    for (var i = 0; i < RADIX; i++)
        hist[i] /= (imgData.data.length / 4);

    var cumhist = new Array(RADIX);
    var sum = 0;
    for (var i = 0; i < RADIX; ++i) {
        sum += hist[i];
        cumhist[i] = sum;
    }

    var hl = [];
    var hh = [];
    for (var i = 0; i < RADIX; i++) {
        hl.push(0);
        hh.push(0);
    }

    for (var t = 0; t < RADIX; ++t)
    {
        // low range entropy
        var cl = cumhist[t];
        if (cl > 0)
        {
            for (var i = 0; i <= t; ++i)
            {
                if (hist[i] > 0)
                {
                    hl[t] = hl[t] - (hist[i] / cl) * Math.log(hist[i] / cl);
                }
            }
        }

        // high range entropy
        var ch = 1.0 - cl;  // constraint cl + ch = 1
        if (ch > 0)
        {
            for (var i = t+1; i < RADIX; ++i)
            {
                if (hist[i] > 0)
                {
                    hh[t] = hh[t] - (hist[i] / ch) * Math.log(hist[i] / ch);
                }
            }
        }
    }

    // choose best threshold
    var entropie = new Array(RADIX);
    var h_max = hl[0] + hh[0];
    var threshold = 0;
    entropie[0]= h_max;

    for (var t = 1; t < RADIX; ++t)
    {
        entropie[t] = hl[t] + hh[t];
        if (entropie[t] > h_max)
        {
            h_max = entropie[t];
            threshold = t;
        }
    }

    return threshold;
}

function bradley() {
    var leftCornerX = canvas.width > img.width ? canvas.width/2 - img.width/2 : 0;
    var leftCornerY = canvas.height > img.height ? canvas.height/2 - img.height/2 : 0;
    var imageWidth = canvas.width > img.width ? img.width : canvas.width;
    var imageHeight = canvas.height > img.height ? img.height : canvas.height;
    var imgData = ctx.getImageData(leftCornerX, leftCornerY, imageWidth, imageHeight);

    for(var y = 0; y < imgData.height; y++) {
        for(var x = 0; x < imgData.width; x++) {
            var i = (y * 4) * imgData.width + x * 4;
            var avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
            imgData.data[i] = avg;
            imgData.data[i + 1] = avg;
            imgData.data[i + 2] = avg;
        }
    }

    var h = imgData.height;
    var w = imgData.width;
    var integralImg = [];
    for (var i = 0; i < w; i++)
        integralImg.push(new Array(h));
    var output = [];
    for (var i = 0; i < w; i++)
        output.push(new Array(h));

    var S = w/8;
    var s2 = S/2;
    var T = 15.0;

    for (var i = 0; i < imgData.width; i++) {
        var sum = 0;
        for (var j = 0; j < imgData.height; j++) {
            var index = (j * 4) * imgData.width + i * 4;

            sum += imgData.data[index];
            if (i == 0) {
                integralImg[i][j] = sum;
            }
            else {
                integralImg[i][j] = integralImg[i-1][j] + sum;
            }
        }
    }

    for (var i = 0; i < imgData.width; i++) {
        for (var j = 0; j < imgData.height; j++) {
            var x0 = Math.floor(Math.max(i-s2, 0));
            var x1 = Math.floor(Math.min(i+s2, w-1));
            var y0 = Math.floor(Math.max(j-s2, 0));
            var y1 = Math.floor(Math.min(j+s2, h-1));

            var count = (y1-y0)*(x1-x0);

            var sum_ = integralImg[x1][y1]-integralImg[x1][y0]-integralImg[x0][y1]+integralImg[x0][y0];

            var index = (j * 4) * imgData.width + i * 4;
            if (imgData.data[index]*count < sum_*(100.-T)/100.) {
                output[i][j] = 0;
            }
            else {
                output[i][j] = 255;
            }
        }
    }

    for (var i = 0; i < imgData.width; i++) {
        for (var j = 0; j < imgData.height; j++) {
            var index = (j * 4) * imgData.width + i * 4;
            imgData.data[index] = output[i][j];
            imgData.data[index + 1] = output[i][j];
            imgData.data[index + 2] = output[i][j];
        }
    }

    ctx.putImageData(imgData, leftCornerX, leftCornerY);
}

function median() {
    var leftCornerX = canvas.width > img.width ? canvas.width/2 - img.width/2 : 0;
    var leftCornerY = canvas.height > img.height ? canvas.height/2 - img.height/2 : 0;
    var imageWidth = canvas.width > img.width ? img.width : canvas.width;
    var imageHeight = canvas.height > img.height ? img.height : canvas.height;
    var imgData = ctx.getImageData(leftCornerX, leftCornerY, imageWidth, imageHeight);

    var medianFilter = new MedianFilter();
    var convertedImageData = medianFilter.convertImage(imgData, imgData.width, imgData.height);
    ctx.putImageData(convertedImageData, leftCornerX, leftCornerY);
}
