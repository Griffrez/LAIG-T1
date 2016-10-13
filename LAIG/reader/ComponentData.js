function ComponentData(id) {
    this.id = id;
	this.loadedOK = false;

	this.transformation = null;
	this.materials = null;
	this.texture = null;
	this.children = {'components': [], 'primitives': []};
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
	this.loadedOK = true;

	this.transformation = transformation;
	this.materials = materials;
	this.texture = texture;
	this.children.components = childComponents;
	this.children.primitives = childPrimitives;
};