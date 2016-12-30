function Scoreboard(game, scene)
{
	CGFobject.call(this, scene);
	this.game = game;
	let scorePrim = new RectanglePrimitive("", vec2.fromValues(-1, -1), vec2.fromValues(1, 1));
	this.scorePlate = new MyRectangle(scene, scorePrim, 2, 2);
	let backPrim = new RectanglePrimitive("", vec2.fromValues(-3.5, -1.5), vec2.fromValues(3.5, 1.5));
	this.backPlate = new MyRectangle(scene, backPrim, 1, 1);
	if(Scoreboard.prototype.numberAppearances === undefined)
	{
		Scoreboard.prototype.numberAppearances = [];
		for(let i = 0; i < 10; i++)
		{
			let appearance = new CGFappearance(scene);
			appearance.loadTexture("../resources/" + i + ".png");
			Scoreboard.prototype.numberAppearances.push(appearance);
		}
	}

	if(Scoreboard.prototype.clockPointerAppearance === undefined)
	{
		let appearance = new CGFappearance(scene);
		appearance.loadTexture("../resources/clock_pointer.jpg");
		Scoreboard.prototype.clockPointerAppearance = appearance;
	}

	if(Scoreboard.prototype.clockAppearance === undefined)
	{
		let appearance = new CGFappearance(scene);
		appearance.loadTexture("../resources/clock.jpg");
		Scoreboard.prototype.clockAppearance = appearance;
	}

	let backClockPrim = new CylinderPrimitive("", 1, 0.8, 0.2, 8, 8);
	this.backClockPlate = new MyCylinder(scene, backClockPrim);

	let clockPtrPrim = new CylinderPrimitive("", 0.05, 0, 0.7, 4, 4);
	this.clockPointer = new MyCylinder(scene, clockPtrPrim);
}

Scoreboard.prototype = Object.create(CGFobject.prototype);

Scoreboard.prototype.display = function()
{
	let score1 = this.game.player1Score;
	let score2 = this.game.player2Score;

	this.backPlate.display();
	this.scene.pushMatrix();
	this.scene.translate(0, 0.5, 0);
	this.scene.scale(0.5, 0.5, 0.5);
	Scoreboard.prototype.clockAppearance.apply();
	this.backClockPlate.display();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.25);
		this.scene.rotate(Math.PI*2*(this.game.timeDone/this.game.timeToPlay), 0, 0, 1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		Scoreboard.prototype.clockPointerAppearance.apply();
		this.clockPointer.display();
	this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		Scoreboard.prototype.numberAppearances[score1].apply();
		this.scene.translate(-2, 0, 0.01);
		this.scorePlate.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		Scoreboard.prototype.numberAppearances[score2].apply();
		this.scene.translate(2, 0, 0.01);
		this.scorePlate.display();
	this.scene.popMatrix();
};