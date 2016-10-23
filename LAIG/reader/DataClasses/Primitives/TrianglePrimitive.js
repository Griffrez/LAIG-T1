/**
 * TrianglePrimitive
 * Data structure to store information about a triangle
 *
 * @param {string} id Uniquely identifies this primitive
 * @param {vec3} p1 Data about the first point
 * @param {vec3} p2 Data about the second point
 * @param {vec3} p3 Data about the third point
 */
function TrianglePrimitive(id, p1, p2, p3)
{
	Primitive.call(this, id);

	this.point1 = p1;
	this.point2 = p2;
	this.point3 = p3;
}

TrianglePrimitive.prototype = Object.create(Primitive.prototype);

TrianglePrimitive.prototype.getPoint1 = function()
{
	return this.point1;
};

TrianglePrimitive.prototype.getPoint2 = function()
{
	return this.point2;
};

TrianglePrimitive.prototype.getPoint3 = function()
{
	return this.point3;
};
