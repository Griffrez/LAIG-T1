function Transformation(id, tr_x, tr_y, tr_z, rt_ax, rt_ang, sc_x, sc_y, sc_z)
{
	this.id = id;
	this.translate = new CartesianValues3(tr_x, tr_y, tr_z);
	this.scale = new CartesianValues3(sc_x, sc_y, sc_z);
	this.rotate_axis = rt_ax;
	this.rotate_angle = rt_ang;
}

Transformation.getTranslate = function()
{
	return this.translate;
};

Transformation.getScale = function()
{
	return this.scale;
};

Transformation.getRotate = function()
{
	return [this.rotate_axis, this.rotate_angle]
};
