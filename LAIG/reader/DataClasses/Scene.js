/**
 * Scene
 * Data structure to store basic information about the scene
 *
 * @param {string} id Uniquely identifies this perspective
 * @param {float} near Doesn't render closer than this
 * @param {float} far Doesn't render more far than this
 * @param {float} angle Field of View
 * @param {float} from Position
 * @param {float} to Target
 */
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