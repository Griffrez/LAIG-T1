function Matrix4(data)
{
	this.data = data;
}

/* matrixB * this */
Matrix4.prototype.multiply = function(matrixB)
{
	var temp = new Array(4);
	for(var k = 0; k < 4; k++)
	{
		temp[k] = new Array(4);
	}

	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			var value1 = matrixB[i][0] * this.data[0][j];
			var value2 = matrixB[i][1] * this.data[1][j];
			var value3 = matrixB[i][2] * this.data[2][j];
			var value4 = matrixB[i][3] * this.data[3][j];
			temp[i][j] = value1 + value2 + value3 + value4;
		}
	}

	this.data = temp;
};