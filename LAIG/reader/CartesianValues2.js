function CartesianValues2(/*number*/x, /*number*/y)
{
	this.x = x;
	this.y = y;
}

CartesianValues2.prototype.getX = function()
{
	return this.x;
};

CartesianValues2.prototype.getY = function()
{
	return this.y;
};
