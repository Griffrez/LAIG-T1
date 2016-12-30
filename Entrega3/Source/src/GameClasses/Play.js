function Play(tile)
{
	this.tile = tile;
	this.piece = this.tile.piece;
}

Play.prototype.getTile = function()
{
	return this.tile;
};

Play.prototype.getPiece = function()
{
	return this.piece;
};