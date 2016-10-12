function Texture(scene, data)
{
	this.data = data;
	this.appearance = new CGFtexture(scene, data.file);
}

Texture.prototype.getData = function()
{
	return this.data;
};

Texture.prototype.getAppearance = function()
{
	return this.appearance;
};
