/**
 * CylinderPrimitive
 * Data structure to store information about a cylinder
 *
 * @param {string} id Uniquely identifies this primitive
 * @param {number} base Radius of the base of the cylinder (positive value)
 * @param {number} top Radius of the top of the cylinder (positive value)
 * @param {number} height Distance between the base and the top of the cylinder (positive value)
 * @param {number} slices Number of divisions around the axis of the cylinder (positive
 * value)
 * @param {number} stacks Number of divisions along the axis of the cylinder (positive value)
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