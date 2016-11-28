function LinearAnimationData(id, time, controlPoints)
{
	AnimationData.call(this, id, time);

	this.controlPoints = controlPoints;
}

LinearAnimationData.prototype = Object.create(AnimationData.prototype);

LinearAnimationData.prototype.constructor = LinearAnimationData;

LinearAnimationData.prototype.mechanicalObject = LinearAnimation;

LinearAnimationData.prototype.getControlPoints = function()
{
	return this.controlPoints;
};