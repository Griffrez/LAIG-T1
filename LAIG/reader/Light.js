/*
	Location: CartesianValues4
	Ambient: Color
	Diffuse: Color
	Specular: Color
 */
function Light(id, enabled, location, ambient, diffuse, specular)
{
	this.id = id;
	this.enabled = enabled;

	this.location = location;
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
}

Light.prototype.getID = function()
{
	return this.id;
};

Light.prototype.isEnabled = function()
{
	return this.enabled;
};

Light.prototype.getLocation = function()
{
	return this.location;
};

Light.prototype.getAmbient = function()
{
	return this.ambient;
};

Light.prototype.getDiffuse = function()
{
	return this.diffuse;
};

Light.prototype.getSpecular = function()
{
	return this.specular;
};