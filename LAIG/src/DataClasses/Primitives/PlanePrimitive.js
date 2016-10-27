function PlanePrimitive(id, dimX, dimY, partsX, partsY)
{
	Primitive.call(this, id);

	this.dimX   = dimX;
	this.dimY   = dimY;
	this.partsX = partsX;
	this.partsY = partsY;
}

PlanePrimitive.prototype = Object.create(Primitive.prototype);

PlanePrimitive.prototype.getDimX = function()
{
	return this.dimX;
};

PlanePrimitive.prototype.getDimY = function()
{
	return this.dimY;
};

PlanePrimitive.prototype.getPartsX = function()
{
	return this.partsX;
};

PlanePrimitive.prototype.getPartsY = function()
{
	return this.partsY;
};