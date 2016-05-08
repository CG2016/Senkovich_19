var GRID_DIMENSTION = 15;
var centerX = (GRID_DIMENSTION - 1)/2;
var centerY = centerX;
var radius = 3;

var lastClicked = [];
var calculated = false;
var points = [];

var grid = clickableGrid(GRID_DIMENSTION, GRID_DIMENSTION, function(el, row, col, i) {
    if (calculated) {
        calculated = false;
        lastClicked = [];
        for (var i = 0; i < points.length; i++) {
            var currPoint = points[i];
            document.getElementById(currPoint.x + '_' + currPoint.y).className='';
        }
        points = [];

    }


    if (lastClicked.length == 2 && lastClicked.indexOf(el) == -1)
        return;

    if (lastClicked.indexOf(el) != -1) {
        el.className='';
        lastClicked.remove(el);
    }
    else {
        el.className='clicked';
        lastClicked.push(el);
    }
});

document.getElementById('grid').appendChild(grid);

function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.setAttribute("id", r.toString() +  '_' + c.toString());
            cell.addEventListener('click',(function(el, r, c, i){
                return function(){
                    callback(el, r, c, i);
                }
            })(cell, r, c, i),false);
        }
    }
    return grid;
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) != -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
};

function stepByStep() {
        if (lastClicked.length != 2)
            return;

        var cellAId = lastClicked[0].id;
        var cellBId = lastClicked[1].id;
        var cellAXY = cellAId.split('_');
        var cellBXY = cellBId.split('_');
        var pointA = new Point(parseInt(cellAXY[0]), parseInt(cellAXY[1]));
        var pointB = new Point(parseInt(cellBXY[0]), parseInt(cellBXY[1]));

        if (pointA.x > pointB.x) {
            var buffPoint = pointA;
            pointA = pointB;
            pointB = buffPoint;
        }

        var deltaX = pointB.x - pointA.x;
        var deltaY = pointB.y - pointA.y;
        var m = deltaY/deltaX;
        var y = pointA.y;

        for(var x = pointA.x; x <= pointB.x; x++) {
            points.push(new Point(x, Math.floor(y)));
            y += m;
        }

        for (var i = 0; i < points.length; i++) {
            var currPoint = points[i];
            document.getElementById(currPoint.x + '_' + currPoint.y).className='clicked';
        }

        calculated = true;
}

function dda() {
        if (lastClicked.length != 2)
            return;

        var cellAId = lastClicked[0].id;
        var cellBId = lastClicked[1].id;
        var cellAXY = cellAId.split('_');
        var cellBXY = cellBId.split('_');
        var pointA = new Point(parseInt(cellAXY[0]), parseInt(cellAXY[1]));
        var pointB = new Point(parseInt(cellBXY[0]), parseInt(cellBXY[1]));

        if (pointA.x > pointB.x) {
            var buffPoint = pointA;
            pointA = pointB;
            pointB = buffPoint;
        }

        var deltaX = pointB.x - pointA.x;
        var deltaY = pointB.y - pointA.y;

        var stepsCount = Math.round(Math.max(Math.abs(deltaX), Math.abs(deltaY)));

        var xInc = deltaX / stepsCount;
        var yInc = deltaY / stepsCount;

        var x = pointA.x;
        var y = pointA.y;
        for(var i = 0; i < stepsCount; i++) {
            points.push(new Point(Math.round(x), Math.round(y)));
            x += xInc;
            y += yInc;
        }
        points.push(pointB);

        for (var i = 0; i < points.length; i++) {
            var currPoint = points[i];
            document.getElementById(currPoint.x + '_' + currPoint.y).className='clicked';
        }

        calculated = true;
}

function bresenham() {
        if (lastClicked.length != 2)
            return;

        var cellAId = lastClicked[0].id;
        var cellBId = lastClicked[1].id;
        var cellAXY = cellAId.split('_');
        var cellBXY = cellBId.split('_');
        var pointA = new Point(parseInt(cellAXY[0]), parseInt(cellAXY[1]));
        var pointB = new Point(parseInt(cellBXY[0]), parseInt(cellBXY[1]));

        if (pointA.x > pointB.x) {
            var buffPoint = pointA;
            pointA = pointB;
            pointB = buffPoint;
        }

        var x = pointA.x;
        var y = pointA.y;
        var deltaX = Math.abs(pointB.x - x), signX = x < pointB.x ? 1 : -1;
        var deltaY = Math.abs(pointB.y - y), signY = y < pointB.y ? 1 : -1;
        var error = (deltaX > deltaY ? deltaX : -deltaY)/2;

        while (true) {
            points.push(new Point(Math.round(x), Math.round(y)));
            if (x == pointB.x && y == pointB.y)
                break;
            var e2 = error;
            if (e2 > -deltaX) {
                error -= deltaY;
                x += signX;
            }
            if (e2 < deltaY) {
                error += deltaX;
                y += signY;
            }
        }
        points.push(pointB);

        for (var i = 0; i < points.length; i++) {
            var currPoint = points[i];
            document.getElementById(currPoint.x + '_' + currPoint.y).className='clicked';
        }

        calculated = true;
}

function bresenhamCircle() {
    for (var i = 0; i < lastClicked.length; i++) {
        var currPointId = lastClicked[i].id;
        document.getElementById(currPointId).className='';
    }
    for (var i = 0; i < points.length; i++) {
        var currPoint = points[i];
        document.getElementById(currPoint.x + '_' + currPoint.y).className='';
    }
    points = [];

    var x = radius;
    var y = 0;
    var decisionOver2 = 1 - x;

    while(y <= x)
    {
        points.push(new Point( x + centerX,  y + centerY));
        points.push(new Point( y + centerX,  x + centerY));
        points.push(new Point(-x + centerX,  y + centerY));
        points.push(new Point(-y + centerX,  x + centerY));
        points.push(new Point(-x + centerX, -y + centerY));
        points.push(new Point(-y + centerX, -x + centerY));
        points.push(new Point( x + centerX, -y + centerY));
        points.push(new Point( y + centerX, -x + centerY));
        y++;
        if (decisionOver2<=0)
        {
            decisionOver2 += 2 * y + 1;
        }
        else
        {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }

    for (var i = 0; i < points.length; i++) {
        var currPoint = points[i];
        document.getElementById(currPoint.x + '_' + currPoint.y).className='clicked';
    }

    calculated = true;
}
