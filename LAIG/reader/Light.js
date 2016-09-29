function Light(id, type, enabled, loc_x, loc_y, loc_z, loc_w, amb_r, amb_g, amb_b, amb_a, dif_r, dif_g, dif_b, dif_a, spc_r, spc_g, spc_b, spc_a, angle, exponent, trg_x, trg_y, trg_z)
{
	this.id = id;
	this.type = type;
	this.enabled = enabled;

	this.location = new CartesianValues4(loc_x, loc_y, loc_z, loc_w);
	this.ambient = new Color(amb_r, amb_g, amb_b, amb_a);
	this.diffuse = new Color(dif_r, dif_g, dif_b, dif_a);
	this.specular = new Color(spc_r, spc_g, spc_b, spc_a);

	if(type === "omni")
	{
		this.angle = angle;
		this.exponent = exponent;
		this.target = new CartesianValues3(trg_x, trg_y, trg_z);
	}
}