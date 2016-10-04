function View()
{
	this.perspectives = [];
	this.defaultView = null;
}

View.prototype.getDefault = function()
{
	return this.defaultView;
};

View.prototype.addPerspective = function(perspective)
{
	this.perspectives.push(perspective);
};

View.prototype.getPerspectives = function()
{
	return this.perspectives;
};