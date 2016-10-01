function CartesianValues3(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

CartesianValues3.prototype.getX = function()
{
	return this.x;
};

CartesianValues3.prototype.getY = function()
{
	return this.y;
};

CartesianValues3.prototype.getZ = function()
{
	return this.z;
};