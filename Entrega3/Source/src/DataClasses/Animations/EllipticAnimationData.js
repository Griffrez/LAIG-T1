/**
 * Class to store elliptic animation information
 * @class
 * @this EllipticAnimationData
 * @param {String} id Uniquely identifying string
 * @param {Number} time Time for the animation to complete
 * @param {vec3} point1 Starting point
 * @param {vec3} point2 End point
 */
function EllipticAnimationData(id, time, point1, point2)
{
    AnimationData.call(this, id, time);
    
    this.point1 = point1;
    this.point2 = point2;
}

EllipticAnimationData.prototype = Object.create(AnimationData.prototype);

EllipticAnimationData.prototype.constructor = EllipticAnimationData;

EllipticAnimationData.prototype.mechanicalObject = EllipticAnimation;

/**
 * Returns the starting point of the animation
 * @returns {vec3} Starting point of the animation
 */
EllipticAnimationData.prototype.getPoint1 = function()
{
    return this.point1;
};

/**
 * Returns the end point of the animation
 * @returns {vec3} End point of the animation
 */
EllipticAnimationData.prototype.getPoint2 = function()
{
    return this.point2;
};
