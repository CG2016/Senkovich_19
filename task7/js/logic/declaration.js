var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
};

var option = '';
var beginPoint = null;
var lines = [];
var rectangle = [];
var convex = [];
var clickingDisabled = false;

var xmin;
var ymin;
var xmax;
var ymax;

$('body').on('mousedown', 'canvas', function(event) {
    if (clickingDisabled)
        return;

    if (event.which != 1)
        return;

    var coordinates = canvasCoordinates(this, event);
    if (beginPoint != null) {
        var endPoint = new Point(coordinates.x, coordinates.y);
        ctx.beginPath();
        ctx.moveTo(beginPoint.x, beginPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        var beginPointSaved = beginPoint;
        lines.push([beginPointSaved, endPoint]);
        beginPoint = null;
    }
    else {
        beginPoint = new Point(coordinates.x, coordinates.y);
    }
});

$(document).on("contextmenu", "canvas", function(event) {
    if (clickingDisabled)
        return false;

    var coordinates = canvasCoordinates(this, event);
    if (option != 'cyrus') {
        if (beginPoint != null) {
            var endPoint = new Point(coordinates.x, coordinates.y);
            drawRect(beginPoint, endPoint);
            var beginPointSaved = beginPoint;
            rectangle = [beginPointSaved, endPoint];
            beginPoint = null;
            clickingDisabled = true;
        }
        else {
            beginPoint = new Point(coordinates.x, coordinates.y);
        }
    }
    else {
        var point = new Point(coordinates.x, coordinates.y);
        convex.push(point);
        if (convex.length != 1) {
            var previousPoint = convex[convex.length - 2];
            ctx.strokeStyle = '#ff0000';

            ctx.beginPath();
            ctx.moveTo(previousPoint.x, previousPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
    }
    return false;
});

function drawRect(beginPoint, endPoint) {
    ctx.strokeStyle = '#ff0000';

    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.lineTo(beginPoint.x, endPoint.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.lineTo(endPoint.x, beginPoint.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(endPoint.x, beginPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(beginPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
}

function canvasCoordinates(currentElement, event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    return { x : canvasX, y : canvasY }
}

function prepareCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    beginPoint = null;
    lines = [];
    rectangle = [];
    convex = [];
    ctx.strokeStyle = '#000000';
}

function cohen() {
    clickingDisabled = false;
    if (option == '' || option != 'cohen') {
        option = 'cohen';
        prepareCanvas();
        return;
    }

    xmin = rectangle[0].x;
    ymin = rectangle[0].y;
    xmax = rectangle[1].x;
    ymax = rectangle[1].y;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var start = line[0];
        var end = line[1];
        var o1 = set_outcode(start);
        var o2 = set_outcode(end);
        console.log('Opcodes are: ' + o1 + ' and ' + o2);
        var o1Int = parseInt(o1, 2);
        var o2Int = parseInt(o2, 2);
        if(o1 == '0000' && o2 == '0000') {
            console.log('1');
            continue;
        }
        else if ( (o1Int & o2Int) != 0) {
            console.log('2');
            delete_line(start, end);
        }
        else if ( (o1Int & o2Int) == 0 && o1 == '0000' || o2 == '0000') {
            console.log('3');
            var intersections = [];
            if(o1Int != 0) {
                intersections = find_intersection(o1, line);
            }
            else if(o2Int != 0) {
                intersections = find_intersection(o2, line);
            }

            if(o1Int != 0) {
                delete_line(start, intersections[0]);
            }
            else if(o2Int != 0) {
                delete_line(end, intersections[0]);
            }
        }
        else if ( (o1Int & o2Int) == 0) {
            console.log('4');
            intersections = find_intersection(o1, line);
            console.log("Intersections of start point : " + intersections[0]);
            delete_line(start, intersections[0]);

            intersections = find_intersection(o2, line);
            console.log("Intersections of end point : " + intersections[0]);
            delete_line(end, intersections[0]);
        }
    }
}

function set_outcode(point) {
    var outcode = '';

    var x = point.x;
    var y = point.y;

    if (y > ymax)
        outcode = outcode + '1';
    else
        outcode = outcode + '0';

    if (y < ymin)
        outcode = outcode + '1';
    else
        outcode = outcode + '0';

    if (x > xmax)
        outcode = outcode + '1';
    else
        outcode = outcode + '0';

    if (x < xmin)
        outcode = outcode + '1';
    else
        outcode = outcode + '0';

    return outcode;
}


function find_intersection(outcode, line) {
    start = line[0];
    end = line[1];

    x1 = start.x;
    x2 = end.x;
    y1 = start.y;
    y2 = end.y;

    intersections_list = [];
    intersect = new Point();

    m = (y2-y1)/(x2-x1);
    console.log('m: ' + m);

    c = y1 - m*x1;
    console.log('c: ' + c);

    if(outcode.charAt(0) == '1') {
        intersect.x = (ymax - c)/m;
        intersect.y = ymax;
        console.log('intersect: ' + intersect.x + ', ' + intersect.y);

        intersections_list.push(intersect);
    }

    if(outcode.charAt(1) == '1') {
        intersect.x = (ymin - c)/m;
        intersect.y = ymin;
        console.log('intersect: ' + intersect.x + ', ' + intersect.y);

        intersections_list.push(intersect)
    }

    if (outcode.charAt(2) == '1') {
        intersect.x = xmax;
        intersect.y = (m * xmax + c);
        console.log('intersect: ' + intersect.x + ', ' + intersect.y);

        intersections_list.push(intersect);
    }

    if (outcode.charAt(3) == '1') {
        intersect.x = xmin;
        intersect.y = (m * xmin + c);
        console.log('intersect: ' + intersect.x + ', ' + intersect.y);

        intersections_list.push(intersect);
    }

    return intersections_list;
}


function delete_line(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 2;
    ctx.stroke();
}


function render_line(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
}


function midpoint() {
    clickingDisabled = false;
    if (option == '' || option != 'midpoint') {
        option = 'midpoint';
        prepareCanvas();
        return;
    }

    xmin = rectangle[0].x;
    ymin = rectangle[0].y;
    xmax = rectangle[1].x;
    ymax = rectangle[1].y;

    var linesToDelete = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        checkLine(linesToDelete, line);
    }

    for (var i = 0; i < linesToDelete.length; i++) {
        var line = linesToDelete[i];
        delete_line(line[0], line[1]);
    }
}


function checkLine(linesToDelete, line) {
    console.log(segmentLength(line));
    if (segmentLength(line) < 2)
        return;

    var start = line[0];
    var end = line[1];
    var o1 = set_outcode(start);
    var o2 = set_outcode(end);

    var o1Int = parseInt(o1, 2);
    var o2Int = parseInt(o2, 2);
    if(o1 == '0000' && o2 == '0000') {
        console.log('1');
    }
    else if ( (o1Int & o2Int) != 0) {
        console.log('2');
        linesToDelete.push(line);
    }
    else {
        console.log('3');
        var midpoint = new Point((start.x + end.x)/2, (start.y + end.y)/2);
        var line1 = [start, midpoint];
        var line2 = [end, midpoint];
        checkLine(linesToDelete, line1);
        checkLine(linesToDelete, line2);
    }
}


function segmentLength(line) {
    var start = line[0];
    var end = line[1];
    var dx = start.x - end.x;
    var dy = start.y - end.y;
    return Math.sqrt(dx*dx + dy*dy);
}


function cyrus() {
    clickingDisabled = false;
    if (option == '' || option != 'cyrus') {
        option = 'cyrus';
        prepareCanvas();
        return;
    }

    if (convex.length < 3)
        return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ff0000';

    for (var i = 0; i < convex.length; i++) {
        var beginPoint = convex[i];
        var lastPoint = convex[(i+1)%convex.length];

        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(beginPoint.x, beginPoint.y);
        ctx.stroke();
    }

    var linesToRender = [];

    var TinByLine = {};
    var ToutByLine = {};

    var inEdgeByLine = {};
    var outEdgeByLine = {};

    for (var i = 0; i < convex.length; i++) {
        var start = convex[i];
        var end = convex[(i+1)%convex.length];
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var normal1 = [-dy, dx];
        var normal2 = [dy, -dx];
        var nextPoint = convex[(i+2)%convex.length];
        var nextVector = [nextPoint.x - end.x, nextPoint.y - end.y];
        var crossProduct1 = nextVector[0]*normal1[0] + nextVector[1]*normal1[1];
        var innerNormal = normal1;
        if (crossProduct1 < 0)
            innerNormal = normal2;
        for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            var A1 = line[0].x - start.x;
            var A2 = line[0].y - start.y;
            var B1 = line[1].x - line[0].x;
            var B2 = line[1].y - line[0].y;
            var C1 = end.x - start.x;
            var C2 = end.y - start.y;
            var t = (A1*B2-A2*B1)/(B2*C1-C2*B1);
            var t1 = (A2*C1-A1*C2)/(B1*C2-C1*B2);
            var ololo = A1+t1*B1-t*C1;
            var ololo1 = A2+t1*B2-t*C2;
            console.log('t');
            console.log(t);
            console.log('t1');
            console.log(t1);
            console.log('ololo');
            console.log(ololo.toFixed(2));
            console.log('ololo1');
            console.log(ololo1.toFixed(2));
            var dx = line[0].x - line[1].x;
            var dy = line[0].y - line[1].y;
            var P1P2 = [dx, dy];
            var S = P1P2[0]*innerNormal[0] + P1P2[1]*innerNormal[1];
            var Tin = [];
            var Tout = [];
            var hash = (line[0].x.toString() + line[0].y.toString() + ' ' + line[1].x.toString() + line[1].y.toString());
            if (t <= 1 && t >= 0 && S > 0 && t1 >= 0 && t1 <= 1) {
                if (!(hash in TinByLine)) {
                    TinByLine[hash] = [];
                    inEdgeByLine[hash] = [];
                }
                TinByLine[hash].push(t);
                inEdgeByLine[hash].push([start, end]);
            }
            else if (t <= 1 && t >= 0 && S < 0 && t1 >= 0 && t1 <= 1) {
                if (!(hash in ToutByLine)) {
                    ToutByLine[hash] = [];
                    outEdgeByLine[hash] = [];
                }
                ToutByLine[hash].push(t);
                outEdgeByLine[hash].push([start, end]);
            }
        }
    }
    console.log('ToutByLine[i]');
    for (var line in ToutByLine) {
        console.log('line');
        console.log(line);
        console.log('Ts');
        console.log(ToutByLine[line]);
    }
    console.log();
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        console.log('line');
        console.log(line[0]);
        console.log(line[1]);
        var hash = (line[0].x.toString() + line[0].y.toString() + ' ' + line[1].x.toString() + line[1].y.toString());
        var Tin = TinByLine[hash];
        var Tout = ToutByLine[hash];
        console.log('Tin');
        console.log(Tin);
        console.log('Tout');
        console.log(Tout);
        if (!Tin && !Tout) {
            console.log('1');
            continue;
        }
        else if (Tin && Tout) {
            console.log('2');
            var maxTin = Math.max.apply(Math, Tin);
            console.log('maxTin');
            console.log(maxTin);
            var maxTinIndex = Tin.indexOf(maxTin);
            console.log('maxTinIndex');
            console.log(maxTinIndex);
            var minTout = Math.min.apply(Math, Tout);
            console.log('minTout');
            console.log(minTout);
            var minToutIndex = Tout.indexOf(minTout);
            console.log('minToutIndex');
            console.log(minToutIndex);
            console.log(maxTin);
            console.log(minTout);
            var edgeForMaxIn = inEdgeByLine[hash][maxTinIndex];
            var edgeForMinOut = outEdgeByLine[hash][minToutIndex];
            console.log('edgeForMaxIn');
            console.log(edgeForMaxIn[0]);
            console.log(edgeForMaxIn[1]);
            console.log('edgeForMinOut');
            console.log(edgeForMinOut[0]);
            console.log(edgeForMinOut[1]);
            var maxInStartX = edgeForMaxIn[0].x + maxTin*(edgeForMaxIn[1].x - edgeForMaxIn[0].x);
            var maxInStartY = edgeForMaxIn[0].y + maxTin*(edgeForMaxIn[1].y - edgeForMaxIn[0].y);
            var firstPoint = new Point(maxInStartX, maxInStartY);
            var minOutStartX = edgeForMinOut[0].x + minTout*(edgeForMinOut[1].x - edgeForMinOut[0].x);
            var minOutStartY = edgeForMinOut[0].y + minTout*(edgeForMinOut[1].y - edgeForMinOut[0].y);
            var secondPoint = new Point(minOutStartX, minOutStartY);
            console.log('Segment');
            console.log(firstPoint);
            console.log(secondPoint);
            linesToRender.push([firstPoint, secondPoint]);
        }
        else if (Tout) {
            console.log('3');
            var minTout = Math.min.apply(Math, Tout);
            var minToutIndex = Tout.indexOf(minTout);
            var edgeForMinOut = outEdgeByLine[hash][minToutIndex];
            var minOutStartX = edgeForMinOut[0].x + minTout*(edgeForMinOut[1].x - edgeForMinOut[0].x);
            var minOutStartY = edgeForMinOut[0].y + minTout*(edgeForMinOut[1].y - edgeForMinOut[0].y);
            var secondPoint = new Point(minOutStartX, minOutStartY);
            linesToRender.push([line[1], secondPoint]);
        }
        else if (Tin) {
            console.log('4');
            var maxTin = Math.max.apply(Math, Tin);
            var maxTinIndex = Tin.indexOf(maxTin);
            var edgeForMaxIn = inEdgeByLine[hash][maxTinIndex];
            var maxInStartX = edgeForMaxIn[0].x + maxTin*(edgeForMaxIn[1].x - edgeForMaxIn[0].x);
            var maxInStartY = edgeForMaxIn[0].y + maxTin*(edgeForMaxIn[1].y - edgeForMaxIn[0].y);
            var firstPoint = new Point(maxInStartX, maxInStartY);
            linesToRender.push([firstPoint, line[0]]);
        }
    }

    console.log('linesToRender.length');
    console.log(linesToRender.length);
    for (var i = 0; i < linesToRender.length; i++) {
        var line = linesToRender[i];
        render_line(line[0], line[1]);
    }
}
