/**
 * Primitive
 * Data structure to store basic information about a primitive
 *
 * @param {string} id Uniquely identifies this primitive
 */
function Primitive(id)
{
	this.id = id;
}

Primitive.prototype.getID = function()
{
	return this.id;
};