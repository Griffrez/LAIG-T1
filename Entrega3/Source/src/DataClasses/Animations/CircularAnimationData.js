/**
 * Class to store circular animation information
 * @class
 * @this CircularAnimationData
 * @param {String} id Uniquely identifying string
 * @param {Number} time Time for the animation to complete
 * @param {vec3} center Point as the center of rotation
 * @param {Number} radius Radius of rotation
 * @param {Number} initAng Initial angle (0º at xx axis)
 * @param {Number} rotAng Angle rotation
 */
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

/**
 * Returns the center of the animation
 * @returns {vec3} Center of the animation
 */
CircularAnimationData.prototype.getCenter = function()
{
	return this.center;
};

/**
 * Returns the radius of the animation
 * @returns {Number} Radius of the animation
 */
CircularAnimationData.prototype.getRadius = function()
{
	return this.radius;
};

/**
 * Returns the initial angle of the animation
 * @returns {Number} Initial angle of the animation
 */
CircularAnimationData.prototype.getInitAng = function()
{
	return this.initAng;
};

/**
 * Returns the angular distance of the animation
 * @returns {Number} Angular distance of the animation
 */
CircularAnimationData.prototype.getRotAng = function()
{
	return this.rotAng;
};