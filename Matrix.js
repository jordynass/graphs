function multiplySquareMatrices(A, B) {
        var ar = A.length, ac = A[0].length, br = B.length, bc = B[0].length;
        if (ar != ac || ac != br || br != bc) return;
        var n = ar;
        var C = [];

        for (var i = 0; i < n; i++) {
                C.push([]);
                for (var j = 0; j < n; j++) {
                        var entry = 0;
                        for (var k = 0; k < n; k++) {
                                entry += A[i][k] * B[k][j];
                        }
                        C[i].push(entry);
                }
        }
        return C;
}

function addSquareMatrices(A, B) {
        var ar = A.length, ac = A[0].length, br = B.length, bc = B[0].length;
        if (ar != ac || ac != br || br != bc) return;
        var n = ar;
        var C = [];

        for (var i = 0; i < n; i++) {
                C.push([]);
                for (var j = 0; j < n; j++) {
                        C[i].push(A[i][j] + B[i][j]);
                }
        }
        return C;
}

function matrixMod(M, Base) {
	var mr = M.length, mc = M[0].length, br = Base.length, bc = Base[0].length;
	if (mr != mc || mc != br || br != bc) return;
	var n = mr;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (M[i][j] != 0 && Base[i][j] == 0) M[i][j] = 1;
			else M[i][j] = 0;
		}
	}
	return M;
}
