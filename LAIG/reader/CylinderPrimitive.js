function CylinderPrimitive(id, base, top, height, slices, stacks)
{
	Primitive.call(this, id);

	this.base = base;
	this.top = top;
	this.height = height;
	this.slices = slices;
	this.stacks = stacks;
}

CylinderPrimitive.prototype = new Primitive();

CylinderPrimitive.prototype.getBase = function()
{
	return this.base;
};

CylinderPrimitive.prototype.getTop = function()
{
	return this.top;
};

CylinderPrimitive.prototype.getHeight = function()
{
	return this.height;
};

CylinderPrimitive.prototype.getSlices = function()
{
	return this.slices;
};

CylinderPrimitive.prototype.getStacks = function()
{
	return this.stacks;
};