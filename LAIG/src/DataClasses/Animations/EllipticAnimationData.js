function EllipticAnimationData(id, time, point1, point2)
{
    AnimationData.call(this, id, time);
    
    this.point1 = point1;
    this.point2 = point2;
}

EllipticAnimationData.prototype = Object.create(AnimationData.prototype);

EllipticAnimationData.prototype.constructor = EllipticAnimationData;

EllipticAnimationData.prototype.mechanicalObject = EllipticAnimation;

EllipticAnimationData.prototype.getPoint1 = function()
{
    return this.point1;
};

EllipticAnimationData.prototype.getPoint2 = function()
{
    return this.point2;
};
