/**
 * Texture
 * Data structure to store information about a texture. Used directly by the Engine.
 *
 * @param {Engine} scene Reference to the scene/engine being used
 * @param {TextureData} data Reference to the TextureData of the texture
 */
function Texture(scene, data)
{
	this.data = data;
	this.texture = new CGFtexture(scene, data.file);
}

Texture.prototype.constructor = Texture;

Texture.prototype.getData = function()
{
	return this.data;
};

Texture.prototype.getTexture = function()
{
	return this.texture;
};
