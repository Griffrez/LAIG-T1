function ElipticAnimationData(id, time, point1, point2)
{
    AnimationData.call(id, time);
    
    this.point1 = point1;
    this.point2 = point2;
    
    let difference = null;
    vec3.subtract(difference, point2, point1);
    let horizontalDistance = vec3.fromValues(difference[0], 0, difference[2]);
    let distance = null;
    vec3.distance(distance, horizontalDistance);
    let verticalDistance = distance;
    this.unit = null;
    vec3.normalize(this.unit, horizontalDistance);
}

ElipticAnimationData.prototype = Object.create(AnimationData.prototype);

ElipticAnimationData.prototype.constructor = ElipticAnimationData;

ElipticAnimationData.prototype.mechanicalObject = ElipticAnimation;

ElipticAnimationData.prototype.getPoint1 = function()
{
    return this.point1;
};

ElipticAnimationData.prototype.getPoint2 = function()
{
    return this.point2;
};
