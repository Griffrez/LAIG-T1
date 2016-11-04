function Animation(id)
{
	this.id = id;
}

Animation.prototype = Object.create(Object.prototype);

Animation.prototype.constructor = Animation;

Animation.prototype.getID = function()
{
	return this.id;
};