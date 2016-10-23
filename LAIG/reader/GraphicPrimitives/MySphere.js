/**
 * MySphere
 * Class to represent a graphical representation of a sphere.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {SpherePrimitive} prim Reference to the primitive data
 */
function MySphere(scene, prim)
{
	CGFobject.call(this, scene);

	this.slices = prim.getSlices();
	this.stacks = prim.getStacks();
	this.radius = prim.getRadius();

	this.initBuffers();
}

MySphere.prototype             = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function()
{
	this.vertices  = [];
	this.indices   = [];
	this.normals   = [];
	this.texCoords = [];

	let thetaInc = Math.PI * 2 / this.slices;
	let phiInc   = Math.PI / this.stacks;

	let theta;
	let phi;

	let stack;
	let slice;

	phi = -Math.PI / 2;

	for (stack = 0; stack <= this.stacks; stack++) // Less or equal because the number of levels is equal to the number of stacks plus 1
	{
		let cosPh = Math.cos(phi);
		let sinPh = Math.sin(phi);

		let s = 0;
		let t = 0.5 - sinPh / 2;
		theta = 0;

		for (slice = 0; slice <= this.slices; slice++) // Less or equal to overlap at the starting point for texturing
		{
			let cosTh = Math.cos(theta);
			let sinTh = Math.sin(theta);

			let x = cosTh * cosPh * this.radius;
			let y = sinTh * cosPh * this.radius;
			let z = sinPh * this.radius;

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			this.texCoords.push(s, t);

			theta += thetaInc;
			s += 1 / this.slices;
		}

		phi += phiInc;
	}

	for (stack = 0; stack < this.stacks; stack++)
	{
		for (slice = 0; slice < this.slices; slice++)
		{
			// Sl - slice
			// St - stack
			// C  - current
			// N  - next
			// example: SlCStC - Current Slice / Current Stack
			let SlCStC = (stack * (this.slices + 1)) + slice;
			let SlNStC = (stack * (this.slices + 1)) + (slice + 1);
			let SlCStN = ((stack + 1) * (this.slices + 1)) + slice;
			let SlNStN = ((stack + 1) * (this.slices + 1)) + (slice + 1);

			this.indices.push(SlCStC, SlNStC, SlCStN);
			this.indices.push(SlNStC, SlNStN, SlCStN);
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
