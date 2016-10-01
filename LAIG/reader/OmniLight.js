function OmniLight(id, enabled, location, ambient, diffuse, specular)
{
	Light.call(id, enabled, location, ambient, diffuse, specular);
}

OmniLight.prototype = new Light();
