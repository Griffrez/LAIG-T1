function Component(id) {
    this.id = id;
	this.loadedOK = false;

	this.transformation = null;
	this.materials = null;
	this.texture = null;
	this.children = null;
}

Component.prototype.getID = function()
{
	return this.id;
};

Component.prototype.isLoadedOK = function()
{
	return this.loadedOK;
}

Component.prototype.getTransformation = function()
{
	return this.transformation;
};

Component.prototype.getMaterials = function()
{
	return this.materials;
};

Component.prototype.texture = function()
{
	return this.texture;
};

Component.prototype.children = function()
{
	return this.children;
};

Component.prototype.setData = function(transformation, materials, texture, children)
{
	this.loadedOK = true;

	this.transformation = transformation;
	this.materials = materials;
	this.texture = texture;
	this.children = children;
};