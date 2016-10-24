/**
 * Perspective
 * Data structure to store information about a perspective/camera
 *
 * @param {string} id Uniquely identifies this perspective
 * @param {float} near Doesn't render closer than this
 * @param {float} far Doesn't render more far than this
 * @param {float} angle Field of View
 * @param {float} from Position
 * @param {float} to Target
 */
function Perspective(id, near, far, angle, from, to)
{
	this.id    = id;
	this.near  = near;
	this.far   = far;
	this.angle = angle;
	this.from  = from;
	this.to    = to;
}

Perspective.prototype.getID = function()
{
	return this.id;
};

Perspective.prototype.getNear = function()
{
	return this.near;
};

Perspective.prototype.getFar = function()
{
	return this.far;
};

Perspective.prototype.getAngle = function()
{
	return this.angle;
};

Perspective.prototype.getFrom = function()
{
	return this.from;
};

Perspective.prototype.getTo = function()
{
	return this.to;
};