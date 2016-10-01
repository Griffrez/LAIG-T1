/*
	Point1: CartesianValues3
	Point2: CartesianValues3
	Point3: CartesianValues3
 */
function TrianglePrimitive(id, p1, p2, p3)
{
	Primitive.call(id);

	this.point1 = p1;
	this.point2 = p2;
	this.point3 = p3;
}

TrianglePrimitive.prototype = new Primitive();

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
