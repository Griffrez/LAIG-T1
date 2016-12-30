PieceHolder.prototype = Object.create(CGFobject.prototype);

function PieceHolder(scene, isWhite, offset)
{
	CGFobject.call(this, scene);
	this.isWhite = isWhite;
	this.offset = offset;
	this.pieces = [];
	this.pieceCount = null;
	if(isWhite)
	{
		this.pieceCount = 31;
	}
	else
	{
		this.pieceCount = 30;
	}
	for(let i = 0; i < this.pieceCount; i++)
	{
		let translate = [];

		if(i === 30)
		{
			translate[0] = 0;
			translate[1] = 0;
			translate[2] = 0.6;
		}
		else
		{
			translate[0] = (Math.floor(i / 5) % 2) - 0.5;
			translate[1] = (i % 5) - 2;
			translate[2] = Math.floor(i / 10) * 0.2;
		}
		translate[0] += this.offset;

		this.pieces.push(new Piece(scene, isWhite, translate));
	}
}

PieceHolder.prototype.display = function()
{
	for(let piece of this.pieces)
	{
		piece.display();
	}
};

PieceHolder.prototype.reset = function()
{
	for(let piece of this.pieces)
	{
		if(piece.tile !== null)
		{
			piece.tile.setPiece(null);
			piece.tile = null;
		}
		piece.offset = piece.originalOffset;
	}
};