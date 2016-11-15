function MyChessboard(scene, prim)
{
	CGFobject.call(this, scene);

	let du = prim.getDU();
	let dv = prim.getDV();
	let su = prim.getSU();
	let sv = prim.getSV();
	let texref = prim.getTexRef();
	let c1 = prim.getC1();
	let c2 = prim.getC2();
	let cs = prim.getCS();

	let planePrim = new PlanePrimitive(1, 1, du, dv);
	let plane = new MyPlane(scene, planePrim);

	let shader = new CGFshader(scene.gl, "Shaders/ChessboardFragment.glsl", "Shaders/ChessboardVertex.glsl");
}