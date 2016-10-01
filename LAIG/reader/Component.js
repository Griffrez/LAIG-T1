function Component(id, transformationref, materials, texture, children) {

    this.id = id;

    this.transformationref = transformationref;
    this.materials = materials;
    this.texture = texture;
	this.children = children;
}

Component.prototype.getID = function()
{
	return this.id;
};

Component.prototype.getTransformationRef = function()
{
	return this.transformationref;
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

Component.prototype.addTransformation = function(transformation)
{
	this.transformation = transformation;
};