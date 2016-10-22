function TextureData(id, file, length_s, length_t)
{
	this.id = id;
	this.file = file;
	this.length_s = length_s;
	this.length_t = length_t;
}

TextureData.prototype.getID = function()
{
	return this.id;
};

TextureData.prototype.getFile = function()
{
	return this.file;
};

TextureData.prototype.getLengthS = function()
{
	return this.length_s;
};

TextureData.prototype.getLengthT = function()
{
	return this.length_t;
};