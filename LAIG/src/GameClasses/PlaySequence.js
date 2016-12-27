function PlaySequence(game)
{
	this.game = game;
	this.plays = [];
	this.sequence = [];
}

PlaySequence.prototype.addPlay = function(play)
{
	this.plays.push(play);
};

PlaySequence.prototype.playGameSequence = function()
{
	this.sequence = this.plays.slice(0, this.plays.length);
};

PlaySequence.prototype.update = function()
{
	if(this.sequence.length > 0)
	{
		let play = this.sequence.shift();
		let tile  = play.getTile();
		let piece = play.getPiece();
		this.game.placePiece(piece, tile);
	}
};

PlaySequence.prototype.undo = function()
{
	if(this.plays.length > 0)
	{
		let play = this.plays.pop();
		let piece = play.getPiece();
		let tile = play.getTile();
		piece.tile = null;
		tile.piece = null;
		piece.offset = piece.originalOffset;
	}
};