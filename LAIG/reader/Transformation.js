function Transformation(id)
{
	this.id = id;

	this.matrix = mat4.create();
}

Transformation.prototype.getID = function()
{
	return this.id;
};

Transformation.prototype.getMatrix = function()
{
	return this.matrix;
};

Transformation.prototype.addTranslation = function(x, y, z)
{
	mat4.translate(this.matrix, this.matrix, [x, y, z]);
};

Transformation.prototype.addScaling = function(x, y, z)
{
	mat4.scale(this.matrix, this.matrix, [x, y, z]);
};

Transformation.prototype.addRotation = function(axis, angle)
{
	if(axis === "x")
	{
		mat4.rotateX(this.matrix, this.matrix, angle);
	}
	else if(axis === "y")
	{
		mat4.rotateY(this.matrix, this.matrix, angle);
	}
	else if(axis === "z")
	{
		mat4.rotateZ(this.matrix, this.matrix, angle);
	}
};
