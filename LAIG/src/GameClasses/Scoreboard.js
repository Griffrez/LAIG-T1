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
}

Scoreboard.prototype = Object.create(CGFobject.prototype);

Scoreboard.prototype.display = function()
{
	let score1 = this.game.player1Score;
	let score2 = this.game.player2Score;

	this.backPlate.display();

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