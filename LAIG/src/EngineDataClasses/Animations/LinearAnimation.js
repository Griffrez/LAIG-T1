LinearAnimation.prototype = Object.create(Animation.prototype);

LinearAnimation.prototype.super = Animation;

function LinearAnimation(data)
{
	this.super.call(this, data);
	this.controlPoints = data.getControlPoints();
	let distance = 0;

	for(let i = 1; i < this.controlPoints.length; i++)
	{
		distance += vec3.distance(this.controlPoints[i-1], this.controlPoints[i]);
	}

	this.speed = distance/this.span;

	let time = 0;
	this.times = [0];
	for(let i = 1; i < this.controlPoints.length; i++)
	{
		let distance = vec3.distance(this.controlPoints[i-1], this.controlPoints[i]);
		time += distance/this.speed;
		this.times[i] = time;
	}

	this.index = 0;
	this.finished = false;
}

LinearAnimation.prototype.update = function(deltaTime)
{
	if(this.finished)
	{
		return;
	}

	this.time += deltaTime;
	console.log(this.time);
	this.matrix = mat4.create();
	let i = 0;
	for(i = 0; i < this.controlPoints.length - 1; i++)
	{
		if(this.time < this.times[i+1])
		{
			break;
		}
	}
	if(i !== this.controlPoints.length - 1)
	{
		let timeDifference = this.time - this.times[i];
		let movementVector = vec3.create();
		vec3.subtract(movementVector, this.controlPoints[i+1], this.controlPoints[i]);
		vec3.normalize(movementVector, movementVector);
		let timeMultiplier = timeDifference*this.speed;
		let timeMultiplierVector = vec3.fromValues(timeMultiplier, timeMultiplier, timeMultiplier);
		let newMovement = vec3.create();
		vec3.multiply(newMovement, movementVector, timeMultiplierVector);
		mat4.translate(this.matrix, this.matrix, newMovement);
	}

	mat4.translate(this.matrix, this.matrix, this.controlPoints[i]);

	let movementVector = vec3.create();
	if(i === this.controlPoints.length-1)
	{
		vec3.subtract(movementVector, this.controlPoints[i], this.controlPoints[i-1]);
	}
	else
	{
		vec3.subtract(movementVector, this.controlPoints[i + 1], this.controlPoints[i]);
	}
	vec3.normalize(movementVector, movementVector);
	let dotProduct = vec3.dot(movementVector, this.frontVector);
	let angle = Math.atan2(this.frontVector[2], this.frontVector[0]) - Math.atan2(movementVector[2], movementVector[0]);
	mat4.rotateY(this.matrix, this.matrix, angle);

	if(i === this.controlPoints.length - 1)
	{
		this.finished = true;
	}
};