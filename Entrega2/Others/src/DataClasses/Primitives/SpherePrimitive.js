/**
 * SpherePrimitive
 * Data structure to store information about a sphere
 *
 * @param {string} id Uniquely identifies this primitive
 * @param {number} radius Radius of the sphere (positive value)
 * @param {number} slices Number of divisions around the z axis (positive value)
 * @param {number} stacks Number of divisions along the z axis (positive value)
 */
function SpherePrimitive(id, radius, slices, stacks)
{
	Primitive.call(this, id);

	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;
}

SpherePrimitive.prototype = Object.create(Primitive.prototype);

SpherePrimitive.prototype.constructor = SpherePrimitive;

SpherePrimitive.prototype.graphicConstructor = MySphere;

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