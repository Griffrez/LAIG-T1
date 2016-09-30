function Illumination(doublesided, local, amb_r, amb_g, amb_b, amb_a, bgd_r, bgd_g, bgd_b, bgd_a) {
	this.doublesided = doublesided;
	this.local = local;
	this.ambient = new Color(amb_r, amb_b, amb_b, amb_a);
	this.background = new Color(bgd_r, bgd_g, bgd_b, bgd_a);
}

Illumination.isDoubleSided = function()
{
	return this.doublesided;
};

Illumination.isLocal = function()
{
	return this.local;
};

Illumination.getAmbient = function()
{
	return this.ambient;
};

Illumination.getBackground = function()
{
	return this.background;
};