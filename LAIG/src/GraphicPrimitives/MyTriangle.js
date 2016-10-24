/**
 * MyTriangle
 * Class to represent a graphical representation of a triangle.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {TrianglePrimitive} prim Reference to the primitive data
 * @param {float} sLength Physical space before texture tiling s-axis
 * @param {float} tLength Physical space before texture tiling t-axis
 */
 function MyTriangle(scene, prim, sLength, tLength)
 {
 	CGFobject.call(this,scene);
	
	// Texture Values
	this.sLen = sLength;
	this.tLen = tLength;
 	
	// Triangle Primitive Data
	this.trianglePrim = prim;
	
 	this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function()
 {
	let p1 = this.trianglePrim.getPoint1();
	let p2 = this.trianglePrim.getPoint2();
	let p3 = this.trianglePrim.getPoint3();
	
	let x1 = p1[0];
	let y1 = p1[1];
	let z1 = p1[2];
	
	let x2 = p2[0];
	let y2 = p2[1];
	let z2 = p2[2];
	
	let x3 = p3[0];
	let y3 = p3[1];
	let z3 = p3[2];
	 
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
	
	let vecA = vec3.create();
	vec3.subtract(vecA, p1, p2);
	
	let vecB = vec3.create();
	vec3.subtract(vecB, p1, p3);
	
	let vecNormal = vec3.create();
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
	
	let vecC = vec3.create();
	vec3.subtract(vecC, p2, p3);
	
	let a = vec3.length(vecB);
	let b = vec3.length(vecA);
	let c = vec3.length(vecC);
	
	let cosBeta = (a*a - b*b + c*c) / (2 * a * c);
	let sinBeta = Math.sqrt(1 - cosBeta*cosBeta);
	
	this.texCoords =
	[
		(c - a*cosBeta)/ this.sLen, 0,
		0, (a * sinBeta) / this.tLen,
		c / this.sLen, (a * sinBeta) / this.tLen
	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };