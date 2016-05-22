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
}
