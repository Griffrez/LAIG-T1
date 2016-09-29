function Material(id, emi_r, emi_g, emi_b, emi_a, amb_r, amb_g, amb_b, amb_a, dif_r, dif_g, dif_b, dif_a, spc_r, spc_g, spc_b, spc_a, shininess)
{
	this.id = id;
	this.emission = new Color(emi_r, emi_g, emi_b, emi_a);
	this.ambient = new Color(amb_r, amb_g, amb_b, amb_a);
	this.diffuse = new Color(dif_r, dif_g, dif_b, dif_a);
	this.specular = new Color(spc_r, spc_g, spc_b, spc_a);
	this.shininess = shininess;
}

Material.getID = function()
{
	return this.id;
};

Material.getEmission = function()
{
	return this.emission;
};

Material.getAmbient = function()
{
	return this.ambient;
};

Material.getDiffuse = function()
{
	return this.diffuse;
};

Material.getSpecular = function()
{
	return this.specular;
};

Material.getShininess = function()
{
	return this.shininess;
};