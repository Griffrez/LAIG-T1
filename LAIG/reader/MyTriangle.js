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
	
	var x1 = p1[0];
	var y1 = p1[1];
	var z1 = p1[2];
	
	var x2 = p2[0];
	var y2 = p2[1];
	var z2 = p2[2];
	
	var x3 = p3[0];
	var y3 = p3[1];
	var z3 = p3[2];
	 
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
	
	/*
	var vec1 = new CartesianValues3(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2)); v1-v2
	var vec2 = new CartesianValues3(Math.abs(x1 - x3), Math.abs(y1 - y3), Math.abs(z1 - z3)); v1-v3
	
	var i = vec1[1] * vec2[2] - vec1[2] * vec2[1];
	var j = vec1[2] * vec2[0] - vec1[0] * vec2[2];
	var k = vec1[0] * vec2[1] - vec1[1] * vec2[0];
	
	var magnitude = Math.sqrt(i*i + j*j + k*k);
	*/
	
	var vecA = vec3.create();
	vec3.subtract(vecA, p1, p2);
	
	var vecB = vec3.create();
	vec3.subtract(vecB, p1, p3);
	
	var vecNormal = vec3.create();
	vec3.cross(vecNormal, vecA, vecB);
	vec3.normalize(vecNormal, vecNormal);
	
 	this.normals =
 	[
		vecNormal[0],
		vecNormal[1],
		vecNormal[2],
		vecNormal[0],
		vecNormal[1],
		vecNormal[2],
		vecNormal[0],
		vecNormal[1],
		vecNormal[2]
	];

	/*
	var a = Math.sqrt( (x1 - x3)*(x1 - x3) + (y1 - y3)*(y1 - y3) + (z1 - z3)*(z1 - z3) );
	var b = Math.sqrt( (x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1) + (z2 - z1)*(z2 - z1) );
	var c = Math.sqrt( (x3 - x2)*(x3 - x2) + (y3 - y2)*(y3 - y2) + (z3 - z2)*(z3 - z2) );
	*/
	
	var vecC = vec3.create();
	vec3.subtract(vecC, p2, p3);
	
	var a = vec3.length(vecB);
	var b = vec3.length(vecA);
	var c = vec3.length(vecC);
	
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