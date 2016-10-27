function LinearAnimation(id, controlPoints, time)
{
	Animation.call(this, id);

	this.controlPoints = controlPoints;
	this.time          = time;
}

LinearAnimation.prototype = Object.create(Animation.prototype);

LinearAnimation.prototype.getControlPoints = function()
{
	return this.controlPoints;
};

LinearAnimation.prototype.getTime = function()
{
	return this.time;
};