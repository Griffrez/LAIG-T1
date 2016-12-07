ElipticAnimation.prototype = Object.create(Animation.prototype);

ElipticAnimation.prototype.super = Animation;

function ElipticAnimation(data)
{
    this.super.call(this, data);

    this.point1 = data.point1;
    this.point2 = data.point2;

    this.finished = false;

    let difference = null;
    vec3.subtract(difference, this.point2, this.point1);
    let horizontalDistance = vec3.fromValues(difference[0], 0, difference[2]);
    let distance = null;
    vec3.distance(distance, horizontalDistance);
    let verticalDistance = distance;
    this.unit = null;
    vec3.normalize(this.unit, horizontalDistance);
}

ElipticAnimation.prototype.constructor = ElipticAnimation;

ElipticAnimation.prototype.update = function(deltaTime)
{
    if(this.finished)
    {
        return;
    }

    this.time += deltaTime;
    this.matrix = mat4.create();

    let timeFactor;

    mat4.translate(this.matrix, this.matrix, this.point1);
};