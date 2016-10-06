/*
	Point1: CartesianValues2
	Point2: CartesianValues2
 */
function RectanglePrimitive(id, p1, p2)
{
	Primitive.call(this, id);

	this.point1 = p1;
	this.point2 = p2;
}

RectanglePrimitive.prototype = new Primitive();

RectanglePrimitive.prototype.getPoint1 = function()
{
	return this.point1;
};

RectanglePrimitive.prototype.getPoint2 = function()
{
	return this.point2;
};