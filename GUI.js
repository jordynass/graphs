function vertexCodeKey(e) {
        if (e.keyCode == 13) expandGraph();
}

function expandGraph() {
        var vc = document.getElementById("vertexCount").value;
        if (isNaN(vc)) return;
        for (var i = 0; i < vc; i++) addVertex();
        built = true;
	updateDisplay();
}

function clearGraph() {
	graph = [];
        built = false;
        vertexCoordinates = [];
        selectedVertex = null;
        updateDisplay();
	SphericalOperators = null;
}

function showDistance(distance) {
	if (distance >= visibleDistances.length) return;
	visibleDistances[distance] = !visibleDistances[distance];
	updateDisplay();
}

function toggleContinuousSelection() {
	continuousSelection = !continuousSelection;
}

function connectVertices(e) {
        var x = e.clientX;
        var y = e.clientY
        var xCenter = canvas.width / 2;
        var yCenter = canvas.height / 2;
        var boxSize = Math.min(xCenter, yCenter);

        if (x > xCenter + boxSize || x < xCenter - boxSize  || y > yCenter + boxSize || y < yCenter - boxSize || !built) return;

        var nearest = findNearestVertex(x - 10, y - 10);
        if (selectedVertex == null) {
                context.fillStyle = "#000000";
                context.fillRect(nearest[1], nearest[2], 10, 10);
                selectedVertex = nearest;
        }
        else {
                context.fillStyle = "#FF0000";
                context.fillRect(selectedVertex[1], selectedVertex[2], 10, 10);
                if (nearest[0] != selectedVertex[0] || !simple) {
			addEdge(selectedVertex[0], nearest[0]);
                        updateDisplay();
                }
                if (continuousSelection) {
			if (selectedVertex[0] == nearest[0]) {
				context.fillStyle = "#FF0000";
        		        context.fillRect(selectedVertex[1], selectedVertex[2], 10, 10);
				selectedVertex = null;
			}
			else {
				selectedVertex = nearest;
				context.fillStyle = "#000000";
                		context.fillRect(nearest[1], nearest[2], 10, 10);
			}
		}
		else selectedVertex = null;
        }
}

function findNearestVertex(a, b) {
        if (graph.length == 0) return;

        var x = canvas.width / 2;
        var y = canvas.height / 2;
	var r = Math.min(3 * x / 4, 3 * y / 4);

        var angle = 2 * Math.PI / graph.length;
        var minSquareDistance = canvas.width * canvas.width + canvas.height * canvas.height;
        var minVertex = 0, minX = 0, minY = 0;

        for (var i = 0; i < graph.length; i++) {
                var xDiff = x + r * Math.cos(i * angle) - a;
                var yDiff = y + r * Math.sin(i * angle) - b;
                squareDistance = xDiff * xDiff + yDiff * yDiff;
                if (squareDistance < minSquareDistance) {
                        minSquareDistance = squareDistance;
                        minVertex = i;
                        minX = a + xDiff;
                        minY = b + yDiff;
                }
        }
        return [minVertex, minX, minY];
}

