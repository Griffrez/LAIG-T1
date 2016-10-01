function View(_default)
{
	this.perspectives = [];
	this.default = _default;
}

View.prototype.getDefault = function()
{
	return this.default;
};

View.prototype.addPerspective = function(perspective)
{
	this.perspectives.push(perspective);
};

View.prototype.getPerspectives = function()
{
	return this.perspectives;
};