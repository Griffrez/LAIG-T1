function Transformation(id)
{
	this.id = id;

	var data = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	];
	this.matrix = new Matrix4(data);
}

Transformation.prototype.addTranslation = function(x, y, z)
{
	var data = [
		[0, 0, 0, x],
		[0, 0, 0, y],
		[0, 0, 0, z],
		[0, 0, 0, 1]
	];

	this.matrix.multiply(data);
};

Transformation.prototype.addScaling = function(x, y, z)
{
	var data = [
		[x, 0, 0, 0],
		[0, y, 0, 0],
		[0, 0, z, 0],
		[0, 0, 0, 1]
	];

	this.matrix.multiply(data);
};

function deg2rad(angle)
{
	return (angle*Math.PI/180);
}

Transformation.prototype.addRotation = function(axis, angle)
{
	var radAngle = deg2rad(angle);

	var data;

	if(axis === "x")
	{
		data = [
			[1, 0, 0, 0],
			[0, Math.cos(radAngle), -(Math.sin(radAngle)), 0],
			[0, Math.sin(radAngle), Math.cos(radAngle), 0],
			[0, 0, 0, 1]
		];
	}
	else if(axis === "y")
	{
		data = [
			[Math.cos(radAngle), 0, Math.sin(radAngle), 0],
			[0, 1, 0, 0],
			[-(Math.sin(radAngle)), 0, Math.cos(radAngle), 0],
			[0, 0, 0, 1]
		];
	}
	else if(axis === "z")
	{
		data = [
			[Math.cos(radAngle), -(Math.sin(radAngle)), 0, 0],
			[Math.sin(radAngle), Math.cos(radAngle), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		];
	}

	this.matrix.multiply(data);
};
