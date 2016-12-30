/**
 * Class to store basic animation information
 * @class
 * @this AnimationData
 * @param {String} id Uniquely identifying string
 * @param {Number} time Time for the animation to complete
 */
function AnimationData(id, time)
{
	this.id = id;
	this.time = time;
}

AnimationData.prototype.constructor = AnimationData;

AnimationData.prototype.mechanicalObject = Animation;

/**
 * Returns the ID of the animation
 * @returns {String} ID of the animation
 */
AnimationData.prototype.getID = function()
{
	return this.id;
};

/**
 * Returns the time of the animation
 * @returns {Number} Time of the animation
 */
AnimationData.prototype.getTime = function()
{
	return this.time;
};