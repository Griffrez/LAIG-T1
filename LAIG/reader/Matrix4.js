function Matrix4(data)
{
	this.data = data;
}

/* matrixB * this */
Matrix4.prototype.multiply = function(matrixB)
{
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			var value1 = matrixB[i][j] * this.data[0][j];
			var value2 = matrixB[i][j] * this.data[1][j];
			var value3 = matrixB[i][j] * this.data[2][j];
			var value4 = matrixB[i][j] * this.data[3][j];
			this.data[i][j] = value1 + value2 + value3 + value4;
		}
	}
};