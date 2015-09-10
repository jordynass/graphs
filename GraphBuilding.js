function addVertex() { graph.push({vertex:[]}); SphericalOperators = null; }

function addEdge(v1, v2) {
        if (v1 >= graph.length || v2 >= graph.length)  return; 
        if (simple && ((v1 == v2) || (neighbors(v1, v2))))  return;
	SphericalOperators = null;
        graph[v1].vertex.push(v2);
	edgeCount++;
        if (!directed) graph[v2].vertex.push(v1);
}


