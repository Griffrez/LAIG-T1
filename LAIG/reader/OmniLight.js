/*
	Location: CartesianValues4
 */
function OmniLight(id, enabled, location, ambient, diffuse, specular)
{
	Light.call(id, enabled, ambient, diffuse, specular);

	this.location = location;
}

OmniLight.prototype = new Light();

OmniLight.prototype.getLocation = function()
{
	return this.location;
};
