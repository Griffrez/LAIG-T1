/**
 * OmniLight
 * Data structure to store information about an omnilight (all-directions light)
 *
 * @param {string} id Uniquely identifies this light
 * @param {boolean} enabled Turned on/off by default
 * @param {vec4} location Location of the light
 * @param {Color} ambient Ambient light component
 * @param {Color} diffuse Diffuse light component
 * @param {Color} specular Specular light component
 */
function OmniLight(id, enabled, location, ambient, diffuse, specular)
{
	Light.call(this, id, enabled, ambient, diffuse, specular);

	this.location = location;
}

OmniLight.prototype = Object.create(Light.prototype);

OmniLight.prototype.constructor = OmniLight;

OmniLight.prototype.getLocation = function()
{
	return this.location;
};
