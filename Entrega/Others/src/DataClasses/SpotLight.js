/**
 * SpotLight
 * Data structure to store information about a spotlight (directional light)
 *
 * @param {string} id Uniquely identifies this light
 * @param {boolean} enabled Turned on/off by default
 * @param {vec3} location Location of the light
 * @param {Color} ambient Ambient light component
 * @param {Color} diffuse Diffuse light component
 * @param {Color} specular Specular light component
 * @param {float} angle Angle of the cone of light
 * @param {float} exponent Changes the loss of light outside of the cone (0 -> instant dark)
 * @param {vec3} target Target of the spotlight
 */
function SpotLight(id, enabled, location, ambient, diffuse, specular, angle, exponent, target)
{
	Light.call(this, id, enabled, ambient, diffuse, specular);

	this.location = location;
	this.angle = angle;
	this.exponent = exponent;
	this.target = target;
}

SpotLight.prototype = Object.create(Light.prototype);

SpotLight.prototype.getLocation = function()
{
	return this.location;
};

SpotLight.prototype.getAngle = function()
{
	return this.angle;
};

SpotLight.prototype.getExponent = function()
{
	return this.exponent;
};

SpotLight.prototype.getTarget = function()
{
	return this.target;
};