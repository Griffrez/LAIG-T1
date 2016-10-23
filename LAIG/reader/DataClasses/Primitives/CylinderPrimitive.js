/**
 * CylinderPrimitive
 * Data structure to store basic information about a cylinder
 *
 * @param {string} id String that uniquely identifies this primitive
 * @param {number} base Float that indicates the radius of the base of the cylinder (positive value)
 * @param {number} top Float that indicates the radius of the top of the cylinder (positive value)
 * @param {number} height Float that indicates the distance between the base and the top of the cylinder (positive value)
 * @param {number} slices Integer that indicates the number of divisions around the axis of the cylinder (positive
 * value)
 * @param {number} stacks Integer that indicates the number of divisions along the axis of the cylinder (positive value)
 */
function CylinderPrimitive(id, base, top, height, slices, stacks)
{
	Primitive.call(this, id);

	this.base   = base;
	this.top    = top;
	this.height = height;
	this.slices = slices;
	this.stacks = stacks;
}

CylinderPrimitive.prototype = Object.create(Primitive.prototype);

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