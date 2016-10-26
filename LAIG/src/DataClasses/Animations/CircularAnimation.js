function CircularAnimation(id, center, radius, initAng, rotAng, time)
{
    Animation.call(this, id);

    this.center = center;
    this.radius = radius;
    this.initAng = initAng;
    this.rotAng = rotAng;
    this.time = time;
}

CircularAnimation.prototype = Object.create(Animation.prototype);

CircularAnimation.prototype.getCenter = function()
{
    return this.center;
};

CircularAnimation.prototype.getRadius = function()
{
    return this.radius;
};

CircularAnimation.prototype.getInitAng = function()
{
    return this.initAng;
};

CircularAnimation.prototype.getRotAng = function()
{
    return this.rotAng;
};

CircularAnimation.prototype.getTime = function()
{
    return this.time;
};