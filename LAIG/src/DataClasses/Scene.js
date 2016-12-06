/**
 * Scene
 * Data structure to store basic information about the scene
 *
 * @param {string} root String that identifies the starting component
 * @param {float} axisLength Length of the axis element
 */
function Scene(root, axisLength)
{
	this.root = root;
	this.axisLength = axisLength;
}

Scene.prototype.constructor = Scene;

// Gets
Scene.prototype.getRoot = function()
{
	return this.root;
};

Scene.prototype.getAxisLength = function()
{
	return this.axisLength;
};