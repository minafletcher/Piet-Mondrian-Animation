var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var rectangles = [];
var currentRectangle = {
	x: 0,
	y: 0,
	h: 0, 
	w: 0,
	c: "white",
	a: 1
} 

var width = 230;
var height = 230;
var heightChange = 2;
var widthChange = 2; 
var xToPlace = myCanvas.width/2 - width/2 - 25;
var yToPlace = myCanvas.height/2 - height/2;
var lowestY;
var highestY;
var highestX;
var leftMostX;
var c = Math.floor(Math.random() * 3) + 1;
var color = randomColors();
var level = 0;

function randomColors() {
	if (c == 1) {
		return "red";
	}
	if (c == 2) {
		return "yellow";
	}
	if (c == 3) {
		return "blue";
	}
}

function rotateColors() {
	if (color == "yellow") {
		color = "blue";
		return color;
	}
	else if (color == "blue") {
		color = "black";
		return color;
	}
	else if (color == "black") {
		color = "red";
		return color;
	}
	else if (color == "red") {
		color = "white";
		return color;
	}
	else if (color == "white") {
		color = "yellow";
		return color;
	}
}
function changeAllColors() {
	rectangles.forEach(function(rectangle) {
		if (rectangle.c == "red") {
			rectangle.c = "yellow";
			color = "yellow";
		}
		else if (rectangle.c == "yellow") {
			rectangle.c = "blue";
			color = "blue";
		}
		else if (rectangle.c == "blue") {
			rectangle.c = "red";
			color = "red";
		}
	}, false);
}

// draw a rectangle with the given qualities
function drawRectangle(x, y, w, h, c, a) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = c;
	ctx.lineWidth = 4;
	ctx.globalAlpha = a;
	ctx.fill();
	ctx.stroke(); 
}

function makeRectangle(x, y, w, h, c, a) {
	rectangle = {
	        x: x,
	        y: y,
	        w: w,
	        h: h,
	        a: a,
	        c: c
	    }
	    rectangles.push(rectangle);
		drawRectangle(rectangle.x, rectangle.y, rectangle.w, rectangle.h, rectangle.c, rectangle.a);
}


// make and draw the rectangleCount number of rectangles
function draw() {
	level++;
	drawShapes();
}

// make and draw the rectangleCount number of rectangles
function drawShapes() {
	changeAllColors();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	clearRectangles();
	width = rectangles[0].w;
	height = rectangles[0].h;
	xToPlace = rectangles[0].x;
	yToPlace = rectangles[0].y;
	lowestY = yToPlace + height;
	highestY = yToPlace;
	highestX = xToPlace + width;
	leftMostX = xToPlace;

	// draws original square that everything gets built off of
	drawRectangle(rectangles[0].x, rectangles[0].y, rectangles[0].w, rectangles[0].h, rectangles[0].c, rectangles[0].a);

	for (i = 1; i < level + 1; i++) {
	if (i % 4 == 1) {
		makeRectangle(xToPlace - (width / 4), yToPlace, width / 4, height / 2, "white", 1);
		makeRectangle(xToPlace - (width / 4), yToPlace + (height / 2), width / 4, height / 4, rotateColors(), 1); 
		makeRectangle(xToPlace - (width / 4), yToPlace + (height/ 2) + (height/ 4), width / 4, height / 4, "white", 1); 
		xToPlace = (xToPlace - width/4);
		width = width + (width / 4);
		widthTotal = width;
		yToPlace = yToPlace + height;
		leftMostX = leftMostX - width/4;
		//rotateShapes(1);
	}
	if (i % 4 == 2) {
		makeRectangle(xToPlace, yToPlace, width * (3/4), height / 4, rotateColors(), 1); 
		makeRectangle(xToPlace + width * (3/4), yToPlace, width / 8, height / 4, "white", 1);
		makeRectangle(xToPlace + width * (3/4) + (width/8), yToPlace, width / 8, height / 4, rotateColors(), 1); 
		xToPlace = (xToPlace - (width / 4));
		yToPlace = yToPlace - height;
		lowestY = lowestY + height/4;
	}
	if (i % 4 == 3) {
		makeRectangle(xToPlace, yToPlace, width / 4, height / 2, rotateColors(), 1);
		makeRectangle(xToPlace - (width/4), yToPlace, width / 4, height / 2, "white", 1);
		makeRectangle(xToPlace - (width/2), yToPlace, width / 4, height / 2, rotateColors(), 1);
		makeRectangle(xToPlace - (width/2), yToPlace + (height / 2), width * (3/4), height* (3/4), "white", 1);
		leftMostX = leftMostX - width*(3/4);
	}
	if(i % 4 == 0) {
		xToPlace = xToPlace - width/2;
		width = width * (3/4) + width; 
		widthTotal = widthTotal * (3/4) + widthTotal;
		makeRectangle(xToPlace, yToPlace + height*(5/4), width / 8, height / 4, rotateColors(), 1);
		makeRectangle(xToPlace + width/8, yToPlace + height*(5/4), width*(7/8), height / 4, "white", 1);
		makeRectangle(xToPlace, yToPlace + height*(3/2), width/4, height / 4, rotateColors(), 1);
		makeRectangle(xToPlace, yToPlace + height*(3/2) + height/4, width/4, height / 4, "white", 1);
		makeRectangle(xToPlace + width/4, yToPlace + height*(3/2), width/2, height / 2, rotateColors(), 1);
		makeRectangle(xToPlace + width*(3/4), yToPlace + height*(3/2), width/8, height / 2, "white", 1);
		makeRectangle(xToPlace + width*(3/4) + width/8, yToPlace + height*(3/2), width/8, height / 2, rotateColors(), 1);
		xToPlace = xToPlace;
		lowestY = lowestY + height;
		height = 2*height;
		heightTotal = 2*height;
	}
	}
	adjust();
}
/*

function rotateShapes(num) {
	if (num == 1) {
		setInterval(rotateShapes1, 2000);
	}
}

function rotateShapes1() {

}
*/
function adjust() {
	// checks if painting goes too far below canvas, adjusts y position
	if (lowestY > myCanvas.height) {
		rectangles[0].y = rectangles[0].y - (lowestY - myCanvas.height);
		drawShapes();
	}
	// checks if painting goes too high above canvas, adjusts height
	else if (highestY < 0) {
		rectangles[0].y = 0;
		rectangles[0].h = rectangles[0].h*(7/8);
		console.log(heightChange);
		heightChange = heightChange + 2;
		//rectangles[0].h = rectangles[0].h - 1;
		//rectangles[0].y = rectangles[0].y + 1;
		drawShapes();
	}
	// checks if painting goes too left on canvas, adjusts x position
	else if (leftMostX < 0) {
		rectangles[0].x = rectangles[0].x + (0 - leftMostX/2);
		drawShapes();
	}
	// checks if painting goes too high above canvas, adjusts height
	else if (highestX > myCanvas.width) {
		rectangles[0].w = rectangles[0].w*(7/8);
		rectangles[0].x = myCanvas.width - rectangles[0].w;
		//rectangles[0].w = rectangles[0].w - 1;
		//rectangles[0].x = rectangles[0].x - 1;
		drawShapes();
	}
}


function clearRectangles() {
	var temp = rectangles[0];
	rectangles.length = 0;
	rectangles.push(temp);
}

function shift() {
	rectangles[0].x = rectangles[0].x + 20;
	rectangles[0].y = rectangles[0].y - 10;
	xToPlace = xToPlace + 20;
	yToPlace = yToPlace - 10;
}

function shrink2() {
	rectangles[0].w = rectangles[0].w - widthChange;
	rectangles[0].h = rectangles[0].h - heightChange;
	width = width - widthChange;
	height = height - heightChange;
}

function shrink() {
	rectangles[0].w = rectangles[0].w - 30;
	rectangles[0].h = rectangles[0].h - 30;
	width = width - 30;
	height = height - 30;
}

// enlarges the rectangle that is clicked on
function onClick(evt) {
	var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;

    // if the position clicked on is inside the rectangle
    rectangles.forEach(function(rectangle) {
    	if((x > rectangle.x) && (x < rectangle.x + rectangle.w) && (y > rectangle.y) && (y < rectangle.y + rectangle.h)) {
    		currentRectangle.x = rectangle.x;
    		currentRectangle.y = rectangle.y;
    		currentRectangle.h = rectangle.h;
    		currentRectangle.w = rectangle.w;
    		currentRectangle.c = rectangle.c;
    		currentRectangle.a = rectangle.a;
    		growRectangle();
    	}
    }, false);
}

// enlarge the rectangle
function growRectangle() {
	var rect = canvas.getBoundingClientRect();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for (i = 0; i < rectangles.length; i++) {
		if (rectangles[i].x == currentRectangle.x && rectangles[i].y == currentRectangle.y) {

		}
		else {
			drawRectangle(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h, rectangles[i].c, rectangles[i].a);
		}
	}
	drawRectangle(currentRectangle.x, currentRectangle.y, currentRectangle.w, currentRectangle.h, currentRectangle.c, currentRectangle.a);
	currentRectangle.h = currentRectangle.h + 10;
	currentRectangle.w = currentRectangle.w + 10;
	currentRectangle.x = currentRectangle.x - 5;
	currentRectangle.y = currentRectangle.y - 5;
	currentRectangle.a = currentRectangle.a - 0.005;
		if ((currentRectangle.x < 0 && currentRectangle.w > myCanvas.width) && (currentRectangle.h > myCanvas.height && currentRectangle.y < 0)) {
		draw();
		} 
		else {
		requestAnimationFrame(growRectangle);
		}	
}