function View(_default)
{
	this.perspectives = [];
	this.default = _default;
}

View.getDefault = function()
{
	return this.default;
};

View.addPerspective = function(perspective)
{
	this.perspectives.push(perspective);
};

View.getPerspectives = function()
{
	return this.perspectives;
};