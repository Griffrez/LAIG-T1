function Camera(fov, near, far, from, to, engineInterface)
{
	CGFcamera.call(this, fov, near, far, from, to);
	this.interface = engineInterface;
	this.animation = null;
}

Camera.prototype = Object.create(CGFcamera.prototype);

Camera.prototype.goTo = function(newPosition, newTarget)
{
	this.animation = new this.cameraAnimation(this.position, this.target, newPosition, newTarget);
	this.interface.setActiveCamera(null);
};

Camera.prototype.update = function(deltaT)
{
	if(this.animation !== null)
	{
		let newInfo = this.animation.getNewInfo(deltaT);
		this.setPosition(newInfo[0]);
		this.setTarget(newInfo[1]);
		if(this.animation.finished)
		{
			this.interface.setActiveCamera(this);
			this.animation = null;
		}
	}
};

Camera.prototype.cameraAnimation = function(oldPosition, oldTarget, newPosition, newTarget)
{
	this.oldPosition = vec3.create();
	vec3.copy(this.oldPosition, oldPosition);

	this.oldTarget = vec3.create();
	vec3.copy(this.oldTarget, oldTarget);

	this.newPosition = vec3.create();
	vec3.copy(this.newPosition, newPosition);

	this.newTarget = vec3.create();
	vec3.copy(this.newTarget, newTarget);

	this.time = 0;
	this.span = 1;

	let spanVector = vec3.fromValues(this.span, this.span, this.span);

	this.positionSpeed = vec3.create();
	let positionDifference = vec3.create();
	vec3.subtract(positionDifference, newPosition, oldPosition);
	vec3.divide(this.positionSpeed, positionDifference, spanVector);

	this.targetSpeed = vec3.create();
	let targetDifference = vec3.create();
	vec3.subtract(targetDifference, newTarget, oldTarget);
	vec3.divide(this.targetSpeed, targetDifference, spanVector);

	this.finished = false;
};

Camera.prototype.cameraAnimation.prototype.getNewInfo = function(deltaT)
{
	if(!this.finished)
	{
		this.time += deltaT;

		if(this.time >= this.span)
		{
			this.finished = true;
		}
	}

	if(this.finished)
	{
		return [this.newPosition, this.newTarget];
	}

	let timeVector = vec3.fromValues(this.time, this.time, this.time);

	let position = vec3.create();
	let deltaPosition = vec3.create();
	vec3.multiply(deltaPosition, this.positionSpeed, timeVector);
	vec3.add(position, this.oldPosition, deltaPosition);

	let target = vec3.create();
	let deltaTarget = vec3.create();
	vec3.multiply(deltaTarget, this.targetSpeed, timeVector);
	vec3.add(target, this.oldTarget, deltaTarget);

	return [position, target];
};