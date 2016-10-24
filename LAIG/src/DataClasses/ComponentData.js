/**
 * ComponentData
 * Data structure to store information about a component
 *
 * @param {float} id Uniquely identifies this component
 */
function ComponentData(id)
{
	this.id             = id;
	this.loadedOK       = false;    // Becomes true when the other fields are filled in
	this.transformation = null;     // Reference to a Transformation
	this.materials      = null;     // Array of references to Materials
	this.texture        = null;     // Reference to TextureData
	this.children       = {'components': [], 'primitives': []}; // Array of two arrays of references to
	// ComponentData and Primitives, respectively
}

ComponentData.prototype.getID = function()
{
	return this.id;
};

ComponentData.prototype.isLoadedOK = function()
{
	return this.loadedOK;
};

ComponentData.prototype.getTransformation = function()
{
	return this.transformation;
};

ComponentData.prototype.getMaterials = function()
{
	return this.materials;
};

ComponentData.prototype.getTexture = function()
{
	return this.texture;
};

ComponentData.prototype.getChildren = function()
{
	return this.children;
};

ComponentData.prototype.setData = function(transformation, materials, texture, childComponents, childPrimitives)
{
	this.loadedOK            = true;
	this.transformation      = transformation;
	this.materials           = materials;
	this.texture             = texture;
	this.children.components = childComponents;
	this.children.primitives = childPrimitives;
};