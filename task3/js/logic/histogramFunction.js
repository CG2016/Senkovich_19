function getHistograms() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    var rArr = [];
    var gArr = [];
    var bArr = [];
    for (var i = 0; i < 256; i++) {
        rArr.push(0);
        gArr.push(0);
        bArr.push(0);
    }

    var averageColor = [0, 0, 0];

    for (var i = 0; i < data.length; i += 4) {
        red = data[i + 0];
        green = data[i + 1];
        blue = data[i + 2];

        rArr[parseInt(red)] += 1;
        gArr[parseInt(green)] += 1;
        bArr[parseInt(blue)] += 1;

        averageColor[0] += red;
        averageColor[1] += green;
        averageColor[2] += blue;
    }

    var total = 0;
    $.each(rArr, function() {
        total += this;
    });
    averageColor[0] /= total;

    total = 0;
    $.each(gArr, function() {
        total += this;
    });
    averageColor[1] /= total;

    total = 0;
    $.each(bArr, function() {
        total += this;
    });
    averageColor[2] /= total;

    $('.row').removeClass('hidden');
    $('#red-distribution-diagram').removeClass('hidden');
    $('#green-distribution-diagram').removeClass('hidden');
    $('#blue-distribution-diagram').removeClass('hidden');
    $('#average-color').removeClass('hidden');

    var rData = [
        {
            y: rArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('red-distribution-diagram', rData);

    var gData = [
        {
            y: gArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('green-distribution-diagram', gData);

    var bData = [
        {
            y: bArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('blue-distribution-diagram', bData);

    $('#average-color').text('Average color: (' + averageColor[0] + '; ' + averageColor[1] + '; ' + averageColor[2] + ')');
}
