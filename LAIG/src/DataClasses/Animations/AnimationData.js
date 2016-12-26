function AnimationData(id, time)
{
	this.id = id;
	this.time = time;
}

AnimationData.prototype = Object.create(Object.prototype);

AnimationData.prototype.constructor = AnimationData;

AnimationData.prototype.mechanicalObject = Animation;

AnimationData.prototype.getID = function()
{
	return this.id;
};

AnimationData.prototype.getTime = function()
{
	return this.time;
};