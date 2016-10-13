	/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene, trianglePrim, sLenght, tLenght)
 {
 	CGFobject.call(this,scene);
	
	// Texture Values
	this.sLen = sLenght || 1;
	this.tLen = tLenght || 1;
 	
	// Triangle Primitive Data
	this.trianglePrim = trianglePrim;
	
 	this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function()
 {
	var p1 = this.trianglePrim.getPoint1();
	var p2 = this.trianglePrim.getPoint2();
	var p3 = this.trianglePrim.getPoint3();
	
	var x1 = p1.getX();
	var y1 = p1.getY();
	var z1 = p1.getZ();
	
	var x2 = p2.getX();
	var y2 = p2.getY();
	var z2 = p2.getZ();
	
	var x3 = p3.getX();
	var y3 = p3.getY();
	var z3 = p3.getZ();
	 
	this.vertices =
	[
		x1, y1, z1,
		x2, y2, z2,
		x3, y3, z3
	];

	this.indices =
	[
		0,1,2
	 ];
	
	var vec1 = new CartesianValues3(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
	var vec2 = new CartesianValues3(Math.abs(x1 - x3), Math.abs(y1 - y3), Math.abs(z1 - z3));
	
	var i = vec1.getY() * vec2.getZ() - vec1.getZ() * vec2.getY();
	var j = vec1.getZ() * vec2.getX() - vec1.getX() * vec2.getZ();
	var k = vec1.getX() * vec2.getY() - vec1.getY() * vec2.getX();
	
	var magnitude = Math.sqrt(i*i + j*j + k*k);
	
 	this.normals =
 	[
		i/magnitude,
		j/magnitude,
		k/magnitude,
		i/magnitude,
		j/magnitude,
		k/magnitude,
		i/magnitude,
		j/magnitude,
		k/magnitude
	];

	var a = Math.sqrt( (x1 - x3)*(x1 - x3) + (y1 - y3)*(y1 - y3) + (z1 - z3)*(z1 - z3) );
	var b = Math.sqrt( (x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1) + (z2 - z1)*(z2 - z1) );
	var c = Math.sqrt( (x3 - x2)*(x3 - x2) + (y3 - y2)*(y3 - y2) + (z3 - z2)*(z3 - z2) );
	
	var cosBeta = (a*a - b*b + c*c) / (2 * a * c);
	var sinBeta = Math.sqrt(1 - cosBeta^2);
	
	this.texCoords =
	[
		(c - a * cosBeta) / this.sLen, 0,
		0, (a * sinBeta) / this.tLen,
		c/ this.sLen, (a * sinBeta) / this.tLen
	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };