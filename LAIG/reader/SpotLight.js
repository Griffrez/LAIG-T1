/* Target: CartesianValues3 */
function SpotLight(id, enabled, location, ambient, diffuse, specular, angle, exponent, target)
{
	Light.call(id, enabled, location, ambient, diffuse, specular);
	this.angle = angle;
	this.exponent = exponent;
	this.target = target;
}

SpotLight.prototype = new Light();

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