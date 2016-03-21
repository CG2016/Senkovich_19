function getHistograms() {
    var leftCornerX = canvas.width > img.width ? canvas.width/2 - img.width/2 : 0;
    var leftCornerY = canvas.height > img.height ? canvas.height/2 - img.height/2 : 0;
    var imageWidth = canvas.width > img.width ? img.width : canvas.width;
    var imageHeight = canvas.height > img.height ? img.height : canvas.height;
    var imgData = ctx.getImageData(leftCornerX, leftCornerY, imageWidth, imageHeight);
    var data = imgData.data;

    console.log(data.slice(4, 8));

    var rArr = [];
    var gArr = [];
    var bArr = [];

    var rArrStat = [];
    var gArrStat = [];
    var bArrStat = [];
    for (var i = 0; i < 256; i++) {
        rArrStat.push(0);
        gArrStat.push(0);
        bArrStat.push(0);
    }

    var averageColor = [0, 0, 0];

    for (var i = 0; i < data.length; i += 4) {
        red = data[i + 0];
        green = data[i + 1];
        blue = data[i + 2];

        rArr.push(red);
        gArr.push(green);
        bArr.push(blue);

        rArrStat[parseInt(red)] += 1;
        gArrStat[parseInt(green)] += 1;
        bArrStat[parseInt(blue)] += 1;

        averageColor[0] += red;
        averageColor[1] += green;
        averageColor[2] += blue;
    }

    var total = 0;
    $.each(rArrStat, function() {
        total += this;
    });
    averageColor[0] /= total;

    total = 0;
    $.each(gArrStat, function() {
        total += this;
    });
    averageColor[1] /= total;

    total = 0;
    $.each(bArrStat, function() {
        total += this;
    });
    averageColor[2] /= total;

    $('.row').removeClass('hidden');
    $('#average-color').removeClass('hidden');
    $('#red-distribution-diagram').removeClass('js-plotly-plot');
    $('#red-distribution-diagram').empty();
    $('#red-distribution-diagram').removeClass('hidden');
    $('#green-distribution-diagram').removeClass('js-plotly-plot');
    $('#green-distribution-diagram').empty();
    $('#green-distribution-diagram').removeClass('hidden');
    $('#blue-distribution-diagram').removeClass('hidden');
    $('#blue-distribution-diagram').removeClass('js-plotly-plot');
    $('#blue-distribution-diagram').empty();

    var rData = [
        {
            x: rArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('red-distribution-diagram', rData);

    var gData = [
        {
            x: gArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('green-distribution-diagram', gData);

    var bData = [
        {
            x: bArr,
            type: 'histogram'
        }
    ];
    Plotly.newPlot('blue-distribution-diagram', bData);

    $('#average-color').text('Average color: (' + averageColor[0] + '; ' + averageColor[1] + '; ' + averageColor[2] + ')');
}
