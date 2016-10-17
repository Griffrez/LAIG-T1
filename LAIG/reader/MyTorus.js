/**
 * MyTorus
 * @constructor
 */
 function MyTorus(scene, torusPrim)
 {
 	CGFobject.call(this,scene);
	
	this.inner = torusPrim.getInner();
	this.outer = torusPrim.getOuter();
	this.slices = torusPrim.getSlices();
	this.loops = torusPrim.getLoops();
	
	if(this.outer < this.inner)
		console.log("Warning: outer < inner");

 	this.initBuffers();
 };
MyTorus.prototype = Object.create(CGFobject.prototype);
MyTorus.prototype.constructor=MyTorus;

MyTorus.prototype.initBuffers = function ()
{
    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];
	
	// Slice Angle
 	var angSlice = 0;
 	var angSliceIncrement = (2*Math.PI)/this.slices;
	
	// Loop Angle
	var angLoop = 0;
	var angLoopIncrement = (2*Math.PI)/this.loops;
	
	// Radius
	var radius = (this.outer - this.inner) / 2;
	
	// Texture Coordinate T
 	var t = 0;
 	var tIncrement = 1/(this.slices);
	
	// Texture Coordinate S
 	var s = 1;
 	var sIncrement = -1/(this.loops);
	
	for(var i = 0; i <= this.loops; i++)
	{
		for(var j = 0; j <= this.slices; j++)
		{	
			// Adds the vertices
			var distToCenter = this.inner + radius * (1 + Math.cos(angLoop));	
			var height = radius * Math.sin(angLoop);
			var vertex = vec3.fromValues(Math.cos(angSlice) * distToCenter, Math.sin(angSlice) * distToCenter, height);	
			this.vertices.push(vertex[0], vertex[1], vertex[2]);

			// Adds the normals
			var centerDist = this.inner + radius;
			var center = vec3.fromValues(Math.cos(angSlice) * centerDist, Math.sin(angSlice) * centerDist, 0);
			var normal = vec3.create();
			vec3.subtract(normal, vertex, center);
			this.normals.push(normal[0], normal[1], normal[2])
			
			// Adds the Indices
			if(i > 0 && j > 0)
			{
				let A = (this.slices+1)*(i)+(j);
				let B = (this.slices+1)*(i-1)+(j-1);
				let C = (this.slices+1)*(i)+(j-1);
				let D = (this.slices+1)*(i-1)+(j);

				this.indices.push(A, C, B);
				this.indices.push(A, B, D);
			}

			// Adds the texture coordinate
			this.texCoords.push(t, s);

			// Loop Increments
			t += tIncrement;
			angSlice += angSliceIncrement;
		}
		// Loop Resets
		t = 0;
		angSlice = 0;
		
		// Loop Increments
		s += sIncrement;
		angLoop += angLoopIncrement;
	}
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};