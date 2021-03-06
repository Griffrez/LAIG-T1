function MyChessboard(scene, prim)
{
	CGFobject.call(this, scene);

	let du = prim.getDU();
	let dv = prim.getDV();
	let su = prim.getSU();
	let sv = prim.getSV();
	let c1 = prim.getC1();
	let c2 = prim.getC2();
	let cs = prim.getCS();

	let sInit;
	let tInit;
	let sFinal;
	let tFinal;

	let sDivisionIncrement = 1/du;
	let tDivisionIncrement = 1/dv;

	if((-1 == su) || (-1 == sv))
	{
		sInit = tInit = sFinal = tFinal = -1;
	}
	else
	{
		sInit = su/du;
		tInit = sv/dv;

		sFinal = (su+1)/du;
		tFinal = (sv+1)/dv;
	}

	this.texref = prim.getTexRef();
	this.texref = scene.textures.get(this.texref.getID()).texture;

	let planePrim = new PlanePrimitive(null, 1, 1, du*4, dv*4);
	this.plane = new MyPlane(scene, planePrim);

	this.shader = new CGFshader(scene.gl, "Shaders/ChessboardVertex.glsl", "Shaders/ChessboardFragment.glsl");
	this.shader.setUniformsValues({uSelectedInitialTexCoord: [sInit, tInit],
		                           uSelectedFinalTexCoord: [sFinal, tFinal],
								   uDivisionIncrement: [sDivisionIncrement, tDivisionIncrement],
								   c1: [c1.getRed(), c1.getGreen(), c1.getBlue(), c1.getAlpha()],
								   c2: [c2.getRed(), c2.getGreen(), c2.getBlue(), c2.getAlpha()],
		                           cs: [cs.getRed(), cs.getGreen(), cs.getBlue(), cs.getAlpha()]});
}

MyChessboard.prototype = Object.create(CGFobject.prototype);

MyChessboard.prototype.constructor = MyChessboard;

MyChessboard.prototype.display = function()
{
	this.scene.setActiveShader(this.shader);
	this.texref.bind(0);
	this.plane.display();
	this.scene.setActiveShader(this.scene.defaultShader);
};