function Perspective(id, near, far, angle, from_x, from_y, from_z, to_x, to_y, to_z)
{
	this.id = id;
	this.near = near;
	this.far = far;
	this.angle = angle;
	this.from = new CartesianValues3(from_x, from_y, from_z);
	this.to = new CartesianValues3(from_x, from_y, from_z);
}

Perspective.getID = function()
{
	return this.id;
};

Perspective.getNear = function()
{
	return this.near;
};

Perspective.getFar = function()
{
	return this.far;
};

Perspective.getAngle = function()
{
	return this.angle;
};

Perspective.getFrom = function()
{
	return this.from;
};

Perspective.getTo = function()
{
	return this.to;
};