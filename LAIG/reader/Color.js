/* Color structure to store 4 float values 0.0-1.0*/

function Color(r, g, b, a)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

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

