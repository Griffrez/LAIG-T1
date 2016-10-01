function Texture(id, file, length_s, length_t)
{
	this.id = id;
	this.file = file;
	this.length_s = length_s;
	this.length_t = length_t;
}

Texture.prototype.getID = function()
{
	return this.id;
};

Texture.prototype.getFile = function()
{
	return this.file;
};

Texture.prototype.getLengthS = function()
{
	return this.length_s;
};

Texture.prototype.getLengthT = function()
{
	return this.length_t;
};