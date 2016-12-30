/**
 * Class to store linear animation information
 * @class
 * @this LinearAnimationData
 * @param {String} id Uniquely identifying string
 * @param {Number} time Time for the animation to complete
 * @param {vec3[]} controlPoints Starting point
 */
function LinearAnimationData(id, time, controlPoints)
{
	AnimationData.call(this, id, time);

	this.controlPoints = controlPoints;
}

LinearAnimationData.prototype = Object.create(AnimationData.prototype);

LinearAnimationData.prototype.constructor = LinearAnimationData;

LinearAnimationData.prototype.mechanicalObject = LinearAnimation;

/**
 * Returns the control points of the animation
 * @returns {vec3[]} Control points of the animation
 */
LinearAnimationData.prototype.getControlPoints = function()
{
	return this.controlPoints;
};