/**
 * MyRectangle
 * @constructor
 */
function MyRectangle(scene, rectPrim, sLenght, tLenght)
{
	CGFobject.call(this,scene);

	// Texture Values
	this.sLen = sLenght || 1;
	this.tLen = tLenght || 1;

	// Rectangle Primitive Data
	this.rectPrim = rectPrim;

	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function()
{
	var p1 = this.rectPrim.getPoint1();
	var p2 = this.rectPrim.getPoint2();

	var x1 = p1.getX();
	var y1 = p1.getY();
	var x2 = p2.getX();
	var y2 = p2.getY();


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
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];

	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
		
	this.texCoords =
		[
			deltaX/this.sLen, 0,
			deltaX/this.sLen, deltaY/this.tLen,
			0, 0,
			0, deltaY/this.tLen
		];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
