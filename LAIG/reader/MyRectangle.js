/**
 * MyRectangle
 * @constructor
 */
function MyRectangle(scene, rectPrim, minS, maxS, minT, maxT)
{
	CGFobject.call(this,scene);

	// TextureData Values
	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	// Rectangle Primitive Data
	this.rectPrim = rectPrim;

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function()
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
			x1, y1, 0,
		];

	this.indices =
		[
			2, 1, 0,
			2, 3, 1,
		];

	this.normals =
		[
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];

	this.texCoords =
		[
			this.maxS, this.minT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.minS, this.maxT
		];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
