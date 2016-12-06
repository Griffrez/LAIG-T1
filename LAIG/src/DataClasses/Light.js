/**
 * Light
 * Data structure to store basic information about a light
 *
 * @param {string} id Uniquely identifies this light
 * @param {boolean} enabled Turned on/off by default
 * @param {Color} ambient Ambient light component
 * @param {Color} diffuse Diffuse light component
 * @param {Color} specular Specular light component
 */
function Light(id, enabled, ambient, diffuse, specular)
{
	this.id = id;
	this.enabled = enabled;

	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
}

Light.prototype.constructor = Light;

Light.prototype.getID = function()
{
	return this.id;
};

Light.prototype.isEnabled = function()
{
	return this.enabled;
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