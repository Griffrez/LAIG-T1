function SpherePrimitive(id, radius, slices, stacks)
{
	Primitive.call(id);

	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;
}

SpherePrimitive.prototype = new Primitive();

SpherePrimitive.prototype.getRadius = function()
{
	return this.radius;
};

SpherePrimitive.prototype.getSlices = function()
{
	return this.slices;
};

SpherePrimitive.prototype.getStacks = function()
{
	return this.stacks;
};