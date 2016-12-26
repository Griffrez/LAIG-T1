function Play(tile)
{
	this.tile = tile;
	this.piece = this.tile.piece;
}

Play.prototype.play = function()
{
	this.piece.move(this.tile.offset);
};

Play.prototype.undo = function()
{
	let originalOffset = this.piece.originalOffset;
	this.piece.move(originalOffset);
};