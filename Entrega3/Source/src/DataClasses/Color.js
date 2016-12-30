/**
 * Color
 * Data structure to store information about a color
 * @constructor
 * @this Color
 * @param {number} r Red component
 * @param {number} g Green component
 * @param {number} b Blue component
 * @param {number} a Alpha component
 */
function Color(r, g, b, a)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.prototype.constructor = Color;

Color.prototype.getRed = function()
{
	return this.r;
};

Color.prototype.getGreen = function()
{
	return this.g;
};

Color.prototype.getBlue = function()
{
	return this.b;
};

Color.prototype.getAlpha = function()
{
	return this.a;
};

