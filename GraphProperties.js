function neighbors(v1, v2) {
        var n = false;
        for (var i = 0; i < graph[v1].vertex.length; i++)
                n = n || (graph[v1].vertex[i] == v2);
        return n;
}

function getNeighborArray(v) {
        var vert = graph[v].vertex;
        var array = [];
        for (var i = 0; i < graph.length; i++) array.push(0);
        for (var i = 0; i < vert.length; i++) array[vert[i]]++;
        return array;
}

function getAdjacency() {
        var rows = [];
        for (var i = 0; i < graph.length; i++) rows.push(getNeighborArray(i));
        return rows;
}

function getSphericalOperators() {
	if (SphericalOperators != null) return SphericalOperators;
	var n = graph.length;
	var I = [];
	for (var i = 0; i < n; i++) {
		I.push([]);
		for (var j = 0; j < n; j++) {
			if (i == j) I[i].push(1);
			else I[i].push(0);
		}
	}
	SphericalOperators = [I];
	if (edgeCount == 0) return SphericalOperators;
	var Ball = I;
	var distance = 0;

	var NextOperator = getAdjacency();
	var zero = false;
	while (!zero) {
		SphericalOperators.push(NextOperator);
		Ball = addSquareMatrices(Ball, NextOperator);
		distance++;

		NextOperator = multiplySquareMatrices(SphericalOperators[distance], SphericalOperators[1]);
		NextOperator = matrixMod(NextOperator, Ball);
		var zero = true;
		for (var i = 0; i < NextOperator.length; i++)
			for (var j = 0; j < NextOperator[i].length; j++)
				if (NextOperator[i][j] != 0) zero = false;
	}
	return SphericalOperators;
}
