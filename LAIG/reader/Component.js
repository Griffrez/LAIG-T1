function Component(id) {
	this.id = id;

	this.transformation = null;
	this.materials = null;
	this.texture = null;
	this.children = {'components': [], 'primitives': []};
}

Component.prototype.getID = function()
{
	return this.id;
};

Component.prototype.getTransformation = function()
{
	return this.transformation;
};

Component.prototype.getMaterials = function()
{
	return this.materials;
};

Component.prototype.getTexture = function()
{
	return this.texture;
};

Component.prototype.getChildren = function()
{
	return this.children;
};

Component.prototype.setData = function(transformation, materials, texture, childComponents, childPrimitives)
{
	this.transformation = transformation;
	this.materials = materials;
	this.texture = texture;
	this.children.components = childComponents;
	this.children.primitives = childPrimitives;
};
