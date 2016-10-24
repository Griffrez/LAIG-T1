/**
 * Material
 * Data structure to store information about a material
 *
 * @param {string} id Uniquely identifies this material
 * @param {Color} emission Emission material component
 * @param {Color} ambient Ambient material component
 * @param {Color} diffuse Diffuse material component
 * @param {Color} specular Specular material component
 * @param {float} shininess Shininess coeficient for specular light
 */
function Material(id, emission, ambient, diffuse, specular, shininess)
{
	this.id = id;
	this.emission = emission;
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
	this.shininess = shininess;
}

Material.prototype.getID = function()
{
	return this.id;
};

Material.prototype.getEmission = function()
{
	return this.emission;
};

Material.prototype.getAmbient = function()
{
	return this.ambient;
};

Material.prototype.getDiffuse = function()
{
	return this.diffuse;
};

Material.prototype.getSpecular = function()
{
	return this.specular;
};

Material.prototype.getShininess = function()
{
	return this.shininess;
};