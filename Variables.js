//VARIABLES

var graph = [];
var directed = false;
var simple = true;
var weighted = false;
var built = false;
var edgeCount = 0;
var SphericalOperators = null;
var visibleDistances = [false, true, false, false, false, false, false, false, false];
var continuousSelection = false;

//GRAPHICAL VARIABLES

var vertexCoordinates = [];
var selectedVertex = null;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var colorArray = ["#FF0000", "#000000", "#009900", "#0066FF", "#FFFF00", "#990099", "#000066", "#993300", "#666633"];
context.fillStyle = colorArray[0];

function getColor(distance) {
	if (distance >= visibleDistances.length) return;
	return colorArray[distance];
}
