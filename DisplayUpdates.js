function updateDisplay() {
        context.clearRect(0, 0, canvas.width, canvas.height);
	displayEdges();
	displayVertices();
}

function displayVertices() {
        updateVertexCoordinates();
        context.fillStyle = colorArray[0];
        for (var i = 0; i < vertexCoordinates.length; i++) { context.fillRect(vertexCoordinates[i][0], vertexCoordinates[i][1], 10, 10); }
}

function displayEdges() {
        //DOESN'T DEAL WITH DIRECTED GRAPHS!!
	updateVertexCoordinates();
	getSphericalOperators();
	for (var distance = 1; distance < visibleDistances.length && distance < SphericalOperators.length; distance++) {
       		if (visibleDistances[distance]) {
			var Matrix = getSphericalOperators()[distance];
			context.strokeStyle = colorArray[distance];
			for (var i = 0; i < Matrix.length; i++) {
               			for (var j = i+1; j < Matrix.length; j++) {
					if (Matrix[i][j] > 0) {
						context.beginPath();
                	                	context.moveTo(vertexCoordinates[i][0]+5, vertexCoordinates[i][1]+5);
                	                	context.lineTo(vertexCoordinates[j][0]+5, vertexCoordinates[j][1]+5);
                	                	context.stroke();
                	                	context.closePath();
                	        	}
                		}
        		}
		}
	}
}

function updateVertexCoordinates() {
        vertexCoordinates = [];

        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var r = Math.min(3 * x / 4, 3 * y / 4);

        var angle = 2 * Math.PI / graph.length;
        for (var i = 0; i < graph.length; i++)
                vertexCoordinates.push([x + r * Math.cos(i * angle), y + r * Math.sin(i * angle), 10, 10]);
}
