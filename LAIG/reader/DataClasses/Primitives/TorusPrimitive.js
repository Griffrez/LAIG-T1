function TorusPrimitive(id, inner, outer, slices, loops)
{
	Primitive.call(this, id);

	this.inner = inner;
	this.outer = outer;
	this.slices = slices;
	this.loops = loops;
}

TorusPrimitive.prototype = new Primitive();

TorusPrimitive.prototype.getInner = function()
{
	return this.inner;
};

TorusPrimitive.prototype.getOuter = function()
{
	return this.outer;
};

TorusPrimitive.prototype.getSlices = function()
{
	return this.slices;
};

TorusPrimitive.prototype.getLoops = function()
{
	return this.loops;
};