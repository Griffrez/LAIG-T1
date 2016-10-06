function Elements()
{
	this.perspectives = [];
	this.lights = [];
	this.textures = [];
	this.materials = [];
	this.transformations = [];
	this.primitives = [];
	this.components = [];
}

// Getters

Elements.prototype.getPerspective = function(id)
{
	return this.perspectives[id];
};

Elements.prototype.getLight = function(id)
{
	return this.lights[id];
};

Elements.prototype.getTexture = function(id)
{
	return this.textures[id];
};

Elements.prototype.getMaterial = function(id)
{
	return this.materials[id];
};

Elements.prototype.getTransformation = function(id)
{
	return this.transformations[id];
};

Elements.prototype.getPrimitive = function(id)
{
	return this.primitives[id];
};

Elements.prototype.getComponent = function(id)
{
	return this.components[id];
};

// Setters

Elements.prototype.checkValid = function(item, array, constructor, nameType)
{
	if(!(item instanceof constructor))
		return "item is not a " + nameType;

	var id = item.getID();

	var check = array[id];

	if(check !== undefined)
		return nameType + " id " + id + " already exists.";
	else
		return null;
};

Elements.prototype.addPerspective = function (item)
{
	var error = this.checkValid(item, this.perspectives, Perspective, "perspective");

	if(error)
	{
		return error;
	}

	this.perspectives[item.getID()] = item;
	this.perspectives.length++;
	return null;
};

Elements.prototype.addLight = function (item)
{
	var error = this.checkValid(item, this.lights, Light, "light");

	if(error)
	{
		return error;
	}

	this.lights[item.getID()] = item;
	this.lights.length++;
	return null;
};

Elements.prototype.addTexture = function (item)
{
	var error = this.checkValid(item, this.textures, Texture, "texture");

	if(error)
	{
		return error;
	}

	this.textures[item.getID()] = item;
	this.textures.length++;
	return null;
};

Elements.prototype.addMaterial = function (item)
{
	var error = this.checkValid(item, this.materials, Material, "material");

	if(error)
	{
		return error;
	}

	this.materials[item.getID()] = item;
	this.materials.length++;
	return null;
};

Elements.prototype.addTransformation = function(item)
{
	var error = this.checkValid(item, this.transformations, Transformation, "transformation");

	if(error)
	{
		return error;
	}

	this.transformations[item.getID()] = item;
	this.transformations.length++;
	return null;
};

Elements.prototype.addPrimitive = function(item)
{
	var error = this.checkValid(item, this.primitives, Primitive, "primitive");

	if(error)
	{
		return error;
	}

	this.primitives[item.getID()] = item;
	this.primitives.length++;
	return null;
};

Elements.prototype.addComponent = function (item)
{
	var error = this.checkValid(item, this.components, Component, "component");

	if(error)
	{
		return error;
	}

	this.components[item.getID()] = item;
	this.components.length++;
	return null;
};

