/**
 * TextureData
 * Data structure to store information about a texture
 *
 * @param {string} id Uniquely identifies this texture
 * @param {string} file Location of the texture image file
 * @param {float} length_s How much physical space before tiling s-axis
 * @param {float} length_t How much physical space before tiling t-axis
 */
function TextureData(id, file, length_s, length_t)
{
	this.id = id;
	this.file = file;
	this.length_s = length_s;
	this.length_t = length_t;
}

TextureData.prototype.constructor = TextureData;

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