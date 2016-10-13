function MySphere(scene, spherePrimitive) {
	CGFobject.call(this,scene);

	this.slices = spherePrimitive.getSlices();
	this.stacks = spherePrimitive.getStacks();
	this.radius = spherePrimitive.getRadius();


	this.initBuffers();
}

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor=MySphere;

MySphere.prototype.initBuffers = function () {
	this.vertices 	= [];
	this.indices	= [];
	this.normals	= [];
	this.texCoords	= [];

	var thetaInc 	= Math.PI*2/this.slices;
	var phiInc		= Math.PI/this.stacks;

	var theta;
	var phi;

	var stack;
	var slice;

	phi = -Math.PI/2;

	for(stack = 0; stack <= this.stacks; stack++) // Less or equal because the number of levels is equal to the number of stacks plus 1
	{
		var cosPh = Math.cos(phi);
		var sinPh = Math.sin(phi);

		var s = 0;
		var t = 1 - sinPh;
		theta = 0;

		for(slice = 0; slice <= this.slices; slice++) // Less or equal to overlap at the starting point for texturing
		{
			var cosTh = Math.cos(theta);
			var sinTh = Math.sin(theta);

			var x = cosTh*cosPh*this.radius;
			var y = sinPh*this.radius
			var z = -sinTh*cosPh*this.radius;

			this.vertices.push	(x, y, z);
			this.normals.push	(x, y, z);
			this.texCoords.push	(s, t);

			theta += thetaInc;
			s += 1/this.slices;
		}

		phi += phiInc;
	}

	for(stack = 0; stack < this.stacks; stack++)
	{
		for(slice = 0; slice < this.slices; slice++)
		{
			// Sl - slice
			// St - stack
			// C  - current
			// N  - next
			// example: SlCStC - Current Slice / Current Stack
			var SlCStC = (stack*(this.slices + 1)) + slice;
			var SlNStC = (stack*(this.slices + 1)) + (slice + 1);
			var SlCStN = ((stack + 1)*(this.slices + 1)) + slice;
			var SlNStN = ((stack + 1)*(this.slices + 1)) + (slice + 1);

			this.indices.push(SlCStC, SlNStC, SlCStN);
			this.indices.push(SlNStC, SlNStN, SlCStN);
		}
	}

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
