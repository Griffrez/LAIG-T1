function Texture(id, file, length_s, length_t)
{
	this.id = id;
	this.file = file;
	this.length_s = length_s;
	this.length_t = length_t;
}

Texture.getID = function()
{
	return this.id;
};

Texture.getFile = function()
{
	return this.file;
};

Texture.getLengthS = function()
{
	return this.length_s;
};

Texture.getLengthT = function()
{
	return this.length_t;
};