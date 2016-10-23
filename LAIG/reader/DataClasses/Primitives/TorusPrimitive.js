/**
 * TorusPrimitive
 * Data structure to store basic information about a torus
 *
 * @param {string} id String that uniquely identifies this primitive
 * @param {number} inner Float that indicates the radius of the inner ring of the torus (non-negative value)
 * @param {number} outer Float that indicates the radius of the outer ring of the torus (positive value)
 * @param {number} slices Integer that indicates the number of divisions around each radial ring (positive value, >= 3)
 * @param {number} loops Integer that indicates the number radial rings (positive value, >= 3)
 */
function TorusPrimitive(id, inner, outer, slices, loops)
{
	Primitive.call(this, id);

	this.inner  = inner;
	this.outer  = outer;
	this.slices = slices;
	this.loops  = loops;
}

TorusPrimitive.prototype = Object.create(Primitive.prototype);

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