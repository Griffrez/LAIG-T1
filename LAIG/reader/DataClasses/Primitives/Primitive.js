/**
 * Primitive
 * Data structure to store basic information about a primitive
 *
 * @param {string} id String that uniquely identifies this primitive
 */
function Primitive(id)
{
	this.id = id;
}

Primitive.prototype.getID = function()
{
	return this.id;
};