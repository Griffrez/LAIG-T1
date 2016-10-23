/**
 * MyTorus
 * Class to represent a graphical representation of a torus.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {TorusPrimitive} prim Reference to the primitive data
 */
function MyTorus(scene, prim)
{
	CGFobject.call(this, scene);

	this.inner  = prim.getInner();
	this.outer  = prim.getOuter();
	this.slices = prim.getSlices();
	this.loops  = prim.getLoops();

	this.initBuffers();
}
MyTorus.prototype             = Object.create(CGFobject.prototype);
MyTorus.prototype.constructor = MyTorus;

MyTorus.prototype.initBuffers = function()
{
	this.vertices  = [];
	this.indices   = [];
	this.normals   = [];
	this.texCoords = [];

	// Slice Angle
	let angSlice          = 0;
	let angSliceIncrement = (2 * Math.PI) / this.slices;

	// Loop Angle
	let angLoop          = 0;
	let angLoopIncrement = (2 * Math.PI) / this.loops;

	// Radius
	let radius = (this.outer - this.inner) / 2;

	// Texture Coordinate T
	let t          = 0;
	let tIncrement = 1 / (this.slices);

	// Texture Coordinate S
	let s          = 1;
	let sIncrement = -1 / (this.loops);

	for (let i = 0; i <= this.loops; i++)
	{
		for (let j = 0; j <= this.slices; j++)
		{
			// Adds the vertices
			let distToCenter = this.inner + radius * (1 + Math.cos(angLoop));
			let height       = radius * Math.sin(angLoop);
			let vertex       = vec3.fromValues(Math.cos(angSlice) * distToCenter, Math.sin(angSlice) * distToCenter,
			                                   height);
			this.vertices.push(vertex[0], vertex[1], vertex[2]);

			// Adds the normals
			let centerDist = this.inner + radius;
			let center     = vec3.fromValues(Math.cos(angSlice) * centerDist, Math.sin(angSlice) * centerDist, 0);
			let normal     = vec3.create();
			vec3.subtract(normal, vertex, center);
			this.normals.push(normal[0], normal[1], normal[2]);

			// Adds the Indices
			if (i > 0 && j > 0)
			{
				let A = (this.slices + 1) * (i) + (j);
				let B = (this.slices + 1) * (i - 1) + (j - 1);
				let C = (this.slices + 1) * (i) + (j - 1);
				let D = (this.slices + 1) * (i - 1) + (j);

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
		t        = 0;
		angSlice = 0;

		// Loop Increments
		s += sIncrement;
		angLoop += angLoopIncrement;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};