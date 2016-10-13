/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, cylinderPrim)
 {
 	CGFobject.call(this,scene);
	
	this.slices = cylinderPrim.getSlices();
	this.stacks = cylinderPrim.getStacks();
	
	this.base = cylinderPrim.getBase();
	this.top = cylinderPrim.getTop();
	this.height = cylinderPrim.getHeight();

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function()
 {
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];
 	
 	this.texCoords = [];
 	
 	// Horizontal Angles
 	var angHorizontal = 0;
 	var angHorizontalIncrement = (2*Math.PI)/this.slices;
 	
 	// Number of vertical divisions
 	var numberOfLevels = this.stacks + 1;
 	
 	// Height
 	var height = 0;
 	var heightIncrement = (this.height)/(this.stacks);
 	
 	// Texture Coordinate S
 	var s = 1;
 	var sIncrement = - 1/(this.stacks);
 	
 	// Texture Coordinate T
 	var t = 0;
 	var tIncrement = 1/(this.slices);
	
	// Delta Radius
	var deltaRadius = this.top - this.base;
	
	// Current Radius
	var currRadius = this.base;
	var currentRadiusIncrement = deltaRadius/(this.stacks);
 	
 	// Iterates through all the levels
 	for(var i = 0; i < numberOfLevels; i++)
 	{
 		// Iterates through all the slices of that level
 		for(var j = 0; j <= this.slices; j++)
 		{
 			// Adds the vertices
 			this.vertices.push(Math.cos(angHorizontal) * currRadius, Math.sin(angHorizontal) * currRadius, height);
 			
			
 			// Adds the normals
 			// this.normals.push(Math.cos(angHorizontal), Math.sin(angHorizontal), 0);
			
			//Generate the normals
			var vecA = vec3.create();
			var vecA = vec3.fromValues(-Math.sin(angHorizontal),Math.cos(angHorizontal),0);
			
			var vecB = vec3.create();
			var vecB = vec3.fromValues(this.top*Math.cos(angHorizontal) - this.base*Math.cos(angHorizontal), this.top*Math.sin(angHorizontal) - this.base*Math.sin(angHorizontal), this.height);
			
			var vecNormal = vec3.create();
			vec3.cross(vecNormal, vecA, vecB);
			vec3.normalize(vecNormal, vecNormal);
			
			this.normals.push(vecNormal[0],vecNormal[1],vecNormal[2]);
 			
 			// Adds the texture coordinate
 			this.texCoords.push(t, s);
 			
 			// Increments the angle
 			angHorizontal = angHorizontal + angHorizontalIncrement;
 			
 			// Increments the t coordinate
 			t = t + tIncrement;
 		}
 		
 		// Increments the height
 		height = height + heightIncrement;
		
		// Increments the radius
		currRadius = currRadius + currentRadiusIncrement;
 		
 		// Resets the t coordinate
 		t = 0;
 		
 		// Increments the s texture
 		s = s + sIncrement;
 		
 		// Resets the angle
 		angHorizontal = 0;
 	}
 	
 	// Value where the triangle starts
 	var start;
 	
 	// Value it takes to go up a level
 	var lvlJump = this.slices + 1;
 	
 	// Iterates through all the levels
 	for(var i = 0; i < this.stacks; i++)
 	{	
 		// Iterates through all the slices of that level
 		for(var j = 0; j < this.slices; j++)
 	 	{
 			// Calculates where the the triangles should start
 			start = j + i * lvlJump;
 			
 			// Upper Triangle
 			this.indices.push(start + lvlJump, start, start + lvlJump + 1);
 				
 			// Lower Triangle
 			this.indices.push(start, start + 1, start + lvlJump + 1);
 	 	}
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

