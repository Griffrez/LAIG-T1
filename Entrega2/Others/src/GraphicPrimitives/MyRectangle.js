/**
 * MyRectangle
 * Class to represent a graphical representation of a rectangle.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {RectanglePrimitive} prim Reference to the primitive data
 * @param {float} sLength Physical space before texture tiling s-axis
 * @param {float} tLength Physical space before texture tiling t-axis
 */
function MyRectangle(scene, prim, sLength, tLength)
{
	CGFobject.call(this, scene);

	// Texture Values
	this.sLen = sLength;
	this.tLen = tLength;

	// Rectangle Primitive Data
	this.rectPrim = prim;

	this.initBuffers();
}

MyRectangle.prototype = Object.create(CGFobject.prototype);

MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function()
{
	var p1 = this.rectPrim.getPoint1();
	var p2 = this.rectPrim.getPoint2();

	var x1 = p1[0];
	var y1 = p1[1];
	var x2 = p2[0];
	var y2 = p2[1];

	this.vertices =
		[
			x2, y2, 0,
			x2, y1, 0,
			x1, y2, 0,
			x1, y1, 0
		];

	this.indices =
		[
			2, 1, 0,
			2, 3, 1
		];

	this.normals =
		[
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

	var deltaX = x2 - x1;
	var deltaY = y2 - y1;

	var xtc = deltaX / this.sLen;
	var xty = deltaY / this.tLen;

	this.texCoords =
		[
			xtc, 0,
			xtc, xty,
			0, 0,
			0, xty
		];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
