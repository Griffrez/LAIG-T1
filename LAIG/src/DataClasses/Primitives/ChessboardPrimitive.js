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

CylinderPrimitive.prototype = Object.create(Primitive.prototype);

CylinderPrimitive.prototype.constructor = ChessboardPrimitive;

CylinderPrimitive.prototype.getDU = function()
{
	return this.du;
};

CylinderPrimitive.prototype.getDV = function()
{
	return this.dv;
};

CylinderPrimitive.prototype.getSU = function()
{
	return this.su;
};

CylinderPrimitive.prototype.getSV = function()
{
	return this.sv;
};

CylinderPrimitive.prototype.getTexRef = function()
{
	return this.texref;
};

CylinderPrimitive.prototype.getC1 = function()
{
	return this.c1;
};

CylinderPrimitive.prototype.getC2 = function()
{
	return this.c2;
};

CylinderPrimitive.prototype.getCS = function()
{
	return this.cs;
};