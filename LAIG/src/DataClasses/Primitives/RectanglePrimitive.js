/**
 * RectanglePrimitive
 * Data structure to store information about a rectangle
 *
 * @param {string} id Uniquely identifies this primitive
 * @param {vec2} p1 Point number one of the rectangle
 * @param {vec2} p2 Point number two of the rectangle
 */
function RectanglePrimitive(id, p1, p2)
{
	Primitive.call(this, id);

	this.point1 = p1;
	this.point2 = p2;
}

RectanglePrimitive.prototype = Object.create(Primitive.prototype);

RectanglePrimitive.prototype.constructor = RectanglePrimitive;

RectanglePrimitive.prototype.graphicConstructor = MyRectangle;

RectanglePrimitive.prototype.getPoint1 = function()
{
	return this.point1;
};

RectanglePrimitive.prototype.getPoint2 = function()
{
	return this.point2;
};