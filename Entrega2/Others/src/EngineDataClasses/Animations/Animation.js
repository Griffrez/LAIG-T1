function Animation(data)
{
	this.span = data.getTime();
	this.time = 0;
	this.matrix = mat4.create();
	this.frontVector = vec3.fromValues(0, 0, 1);
}

Animation.prototype.constructor = Animation;

Animation.prototype.getSpan = function()
{
	return this.span;
};

Animation.prototype.getMatrix = function()
{
	return this.matrix;
};

Animation.prototype.update = function(deltaTime)
{
	this.time += deltaTime;
};