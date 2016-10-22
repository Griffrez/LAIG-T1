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
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];

	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	
	var xtc = deltaX/this.sLen;
	var xty = deltaY/this.tLen;
		
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
