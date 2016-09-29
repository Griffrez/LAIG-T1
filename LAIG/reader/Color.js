/* Color structure to store 4 float values 0.0-1.0*/

function Color(r, g, b, a)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.getRed = function()
{
	return this.r;
};

Color.getGreen = function()
{
	return this.g;
};

Color.getBlue = function()
{
	return this.b;
};

Color.getAlpha = function()
{
	return this.a;
};

