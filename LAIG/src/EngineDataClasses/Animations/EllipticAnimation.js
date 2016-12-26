function EllipticAnimation(data)
{
	Animation.call(this, data);

	this.point1 = data.getPoint1();
	this.point2 = data.getPoint2();
	let difference = vec3.create();
	vec3.subtract(difference, this.point2, this.point1);
	this.zFactor = vec3.distance(this.point2, this.point1)/2;

	this.differenceSpeed = vec3.create();
	vec3.divide(this.differenceSpeed, difference, vec3.fromValues(this.span, this.span, this.span));
	this.zSpeed = this.zFactor/this.span*2;

	this.finished = false;
}

EllipticAnimation.prototype = Object.create(Animation.prototype);

EllipticAnimation.prototype.getPosition=function(deltaT)
{
	this.time += deltaT;

	if(this.time >= this.span)
	{
		this.finished = true;
	}

	if(this.finished)
	{
		return this.point2;
	}

	let start = this.point1;

	let stage1 = vec3.create();
	let tempp = vec3.create();
	vec3.multiply(tempp, this.differenceSpeed, vec3.fromValues(this.time, this.time, this.time));
	vec3.add(stage1, start, tempp);

	if(this.time > this.span/2)
	{
		let temp = this.time - this.span/2;
		let temp2 = this.zFactor - this.zSpeed*temp;
		let temp3 = vec3.fromValues(0, 0, temp2);
		vec3.add(stage1, stage1, temp3);
	}
	else
	{
		let temp = this.zSpeed*this.time;
		let temp2 = vec3.fromValues(0, 0, temp);
		vec3.add(stage1, stage1, temp2);
	}

	return stage1;
};