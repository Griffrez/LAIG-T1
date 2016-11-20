CircularAnimation.prototype = Object.create(Animation.prototype);

CircularAnimation.prototype.super = Animation;

function CircularAnimation(data)
{
	this.super.call(this, data);
	this.center = data.getCenter();
	this.radius = data.getRadius();
	this.varAng = data.getRotAng();
	this.initAng = data.getInitAng();
	this.finished = false;
}

CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function(deltaTime)
{
	if(this.finished)
	{
		return;
	}

	this.time += deltaTime;
	this.matrix = mat4.create();
	mat4.translate(this.matrix, this.matrix, this.center);

	if(this.time >= this.span)
	{
		mat4.rotateY(this.matrix, this.matrix, this.varAng);
		this.finished = true;
	}
	else
	{
		mat4.rotateY(this.matrix, this.matrix, this.varAng*this.time/this.span);
	}
	mat4.rotateY(this.matrix, this.matrix, this.initAng);
	mat4.translate(this.matrix, this.matrix, [this.radius, 0, 0]);
	if(this.varAng >= 0)
	{
		mat4.rotateY(this.matrix, this.matrix, Math.PI);
	}
};