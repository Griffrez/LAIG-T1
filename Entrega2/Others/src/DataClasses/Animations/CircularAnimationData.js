function CircularAnimationData(id, time, center, radius, initAng, rotAng)
{
	AnimationData.call(this, id, time);

	this.center  = center;
	this.radius  = radius;
	this.initAng = initAng;
	this.rotAng  = rotAng;
}

CircularAnimationData.prototype = Object.create(AnimationData.prototype);

CircularAnimationData.prototype.constructor = CircularAnimationData;

CircularAnimationData.prototype.mechanicalObject = CircularAnimation;

CircularAnimationData.prototype.getCenter = function()
{
	return this.center;
};

CircularAnimationData.prototype.getRadius = function()
{
	return this.radius;
};

CircularAnimationData.prototype.getInitAng = function()
{
	return this.initAng;
};

CircularAnimationData.prototype.getRotAng = function()
{
	return this.rotAng;
};