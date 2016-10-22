/*
	From: CartesianValues3
	To: CartesianValues3
 */
function Perspective(id, near, far, angle, from, to)
{
	this.id = id;
	this.near = near;
	this.far = far;
	this.angle = angle;
	this.from = from;
	this.to = to;
}

Perspective.prototype.getID = function()
{
	return this.id;
};

Perspective.prototype.getNear = function()
{
	return this.near;
};

Perspective.prototype.getFar = function()
{
	return this.far;
};

Perspective.prototype.getAngle = function()
{
	return this.angle;
};

Perspective.prototype.getFrom = function()
{
	return this.from;
};

Perspective.prototype.getTo = function()
{
	return this.to;
};