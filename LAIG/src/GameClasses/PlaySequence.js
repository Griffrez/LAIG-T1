function PlaySequence(game)
{
	this.game = game;
	this.plays = [];
}

PlaySequence.prototype.addPlay = function(play)
{
	this.plays.push(play);
	play.play();
};

PlaySequence.prototype.undo = function()
{
	if(this.plays.length > 0)
	{
		this.plays[this.plays.length - 1].undo();
		this.plays.pop();
	}
};