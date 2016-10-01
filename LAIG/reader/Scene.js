// Constructor
function Scene(root, axisLength)
{
	this.root = root;
	this.axisLength = axisLength;
}

// Gets
Scene.prototype.getRoot = function()
{
	return this.root;
};

Scene.prototype.getAxisLength = function()
{
	return this.axisLength;
};