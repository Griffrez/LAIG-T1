/**
 * SpherePrimitive
 * Data structure to store basic information about a sphere
 *
 * @param {string} id String that uniquely identifies this primitive
 * @param {number} radius Float that indicates the radius of the sphere (positive value)
 * @param {number} slices Integer that indicates the number of divisions around the z axis (positive value)
 * @param {number} stacks Integer that indicates the number of divisions along the z axis (positive value)
 */
function SpherePrimitive(id, radius, slices, stacks)
{
	Primitive.call(this, id);

	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;
}

SpherePrimitive.prototype = Object.create(Primitive.prototype);

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