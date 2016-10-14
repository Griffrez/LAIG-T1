function Texture(scene, data)
{
	this.data = data;
	this.texture = new CGFtexture(scene, data.file);
}

Texture.prototype.getData = function()
{
	return this.data;
};

Texture.prototype.getTexture = function()
{
	return this.texture;
};
