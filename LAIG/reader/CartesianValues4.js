function CartesianValues4(x, y, z, w)
{
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

CartesianValues4.prototype.getX = function()
{
	return this.x;
};

CartesianValues4.prototype.getY = function()
{
	return this.y;
};

CartesianValues4.prototype.getZ = function()
{
	return this.z;
};

CartesianValues4.prototype.getW = function()
{
	return this.w;
};
