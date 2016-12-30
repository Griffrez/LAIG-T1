/**
 * Class to store information about the chessboard primitive
 * @class
 * @this ChessboardPrimitive
 * @param {String} id Uniquely identifying string
 * @param {Number} du Number of divisions on the u axis
 * @param {Number} dv Number of divisions on the v axis
 * @param {Number} su Selected square's u coordinate
 * @param {Number} sv Selected square's v coordinate
 * @param {String} texref ID of the texture to be used on the chessboard
 * @param {Color} c1 Color 1 for the checkerboard pattern
 * @param {Color} c2 Color 2 for the checkerboard pattern
 * @param {Color} cs Color for the selected square
 */
function ChessboardPrimitive(id, du, dv, su, sv, texref, c1, c2, cs)
{
	Primitive.call(this, id);
	this.du     = du;
	this.dv     = dv;
	this.su     = su;
	this.sv     = sv;
	this.texref = texref;
	this.c1     = c1;
	this.c2     = c2;
	this.cs     = cs;
}

ChessboardPrimitive.prototype = Object.create(Primitive.prototype);

ChessboardPrimitive.prototype.constructor = ChessboardPrimitive;

ChessboardPrimitive.prototype.graphicConstructor = MyChessboard;

ChessboardPrimitive.prototype.getDU = function()
{
	return this.du;
};

ChessboardPrimitive.prototype.getDV = function()
{
	return this.dv;
};

ChessboardPrimitive.prototype.getSU = function()
{
	return this.su;
};

ChessboardPrimitive.prototype.getSV = function()
{
	return this.sv;
};

ChessboardPrimitive.prototype.getTexRef = function()
{
	return this.texref;
};

ChessboardPrimitive.prototype.getC1 = function()
{
	return this.c1;
};

ChessboardPrimitive.prototype.getC2 = function()
{
	return this.c2;
};

ChessboardPrimitive.prototype.getCS = function()
{
	return this.cs;
};