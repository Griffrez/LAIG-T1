function AnimationCluster(animations)
{
	this.times = [0];
	this.time = 0;
	this.index = 0;
	this.animations = [];
	let time = 0;
	for(let animationData of animations)
	{
		let animation = new animationData.mechanicalObject(animationData);
		this.animations.push(animation);
		time += animationData.getTime();
		this.times.push(time);
	}
	this.finished = (0 == animations.length);
	this.matrix = mat4.create();
}

AnimationCluster.prototype.constructor = AnimationCluster;

AnimationCluster.prototype.update = function(deltaTime)
{
	if(!this.finished)
	{
		let tempCurrTime = this.time + deltaTime;

		while (this.index != this.animations.length && tempCurrTime >= this.times[this.index + 1])
		{
			if (this.index == this.animations.length - 1)
			{
				this.animations[this.index].update(this.times[this.index + 1] - this.time);
				this.finished = true;
				this.matrix   = this.animations[this.index].getMatrix();
			}
			this.index++;
			this.time = this.times[this.index];
		}

		if (this.index != this.animations.length)
		{
			this.animations[this.index].update(tempCurrTime - this.time);
			this.time += tempCurrTime - this.time;
		}
	}
};

AnimationCluster.prototype.getMatrix = function()
{
	if(this.finished)
	{
		return this.matrix;
	}
	else
	{
		return this.animations[this.index].getMatrix();
	}
};