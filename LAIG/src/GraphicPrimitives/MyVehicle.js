function MyVehicle(scene, prim)
{
	CGFobject.call(this, scene);
	prim = null;
	this.init();
}

MyVehicle.prototype = Object.create(CGFobject.prototype);

MyVehicle.prototype.constructor = MyVehicle;

MyVehicle.prototype.init = function()
{
	let controlPoints1 = [
		[[0, -2, -2, 1], [1, -2, -1, 1], [1, -2, 1, 1], [0, -2, 2, 1]],
		[[0, -1, -2, 1], [1, -1, -1, 1], [1, -1, 1, 1], [0, -1, 2, 1]],
		[[0, 1, -2, 1], [1, 1, -1, 1], [1, 1, 1, 1], [0, 1, 2, 1]],
		[[0, 2, -2, 1], [1, 2, -1, 1], [1, 2, 1, 1], [0, 2, 2, 1]],
	];

	let controlPoints2 = [
		[[0, 2, -2, 1], [1, 2, -1, 1], [1, 2, 1, 1], [0, 2, 2, 1]],
		[[0, 2.33, -2, 1], [0.66, 2.33, -1, 1], [0.66, 2.33, 1, 1], [0, 2.33, 2, 1]],
		[[0, 2.66, -2, 1], [0.33, 2.66, -1, 1], [0.33, 2.66, 1, 1], [0, 2.66, 2, 1]],
		[[0, 3, -2, 1], [0, 3, -1, 1], [0, 3, 1, 1], [0, 3, 2, 1]],
	];

	let patchprim1 = new PatchPrimitive("", 3, 3, 10, 10, controlPoints1);
	this.patch1 = new MyPatch(this.scene, patchprim1);
	let patchprim2 = new PatchPrimitive("", 3, 3, 10, 10, controlPoints2);
	this.patch2 = new MyPatch(this.scene, patchprim2);

	let triangle1Point1 = vec3.fromValues(0, 0.5, 0);
	let triangle1Point2 = vec3.fromValues(0, 0, 0);
	let triangle1Point3 = vec3.fromValues(1, 0, 0);
	let triangle1Primitive = new TrianglePrimitive("", triangle1Point1, triangle1Point2, triangle1Point3);
	this.triangle1 = new MyTriangle(this.scene, triangle1Primitive, 1.0, 1.0);

	let triangle2Point1 = vec3.fromValues(0, 0.5, 0);
	let triangle2Point2 = vec3.fromValues(1, 0, 0);
	let triangle2Point3 = vec3.fromValues(0, 0, 0);
	let triangle2Primitive = new TrianglePrimitive("", triangle2Point1, triangle2Point2, triangle2Point3);
	this.triangle2 = new MyTriangle(this.scene, triangle2Primitive, 1.0, 1.0);
};

MyVehicle.prototype.display = function()
{
	this.scene.pushMatrix();
		this.scene.scale(0.5, 0.125, 0.25);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.pushMatrix();
			this.patch1.display();
			this.patch2.display();
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.patch2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.patch1.display();
			this.patch2.display();
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.patch2.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.triangle1.display();
		this.triangle2.display();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.triangle1.display();
		this.triangle2.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.4);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.triangle1.display();
		this.triangle2.display();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.triangle1.display();
		this.triangle2.display();
	this.scene.popMatrix();
};