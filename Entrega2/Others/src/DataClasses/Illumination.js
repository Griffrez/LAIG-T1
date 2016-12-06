/**
 * Illumination
 * Data structure to store information about general lighting
 *
 * @param {boolean} doublesided NOT USED
 * @param {boolean} local NOT USED
 * @param {Color} ambient Ambient light
 * @param {Color} background Background color
 */
function Illumination(doublesided, local, ambient, background)
{
	this.doublesided = doublesided;
	this.local       = local;
	this.ambient     = ambient;
	this.background  = background;
}

Illumination.prototype.constructor = Illumination;

Illumination.prototype.isDoubleSided = function()
{
	return this.doublesided;
};

Illumination.prototype.isLocal = function()
{
	return this.local;
};

Illumination.prototype.getAmbient = function()
{
	return this.ambient;
};

Illumination.prototype.getBackground = function()
{
	return this.background;
};