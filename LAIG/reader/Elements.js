function Elements()
{
	this.scene = null;
	this.illumination = null;
	this.perspectives = [];
	this.defaultPerspective = null;
	this.lights = [];
	this.textures = [];
	this.materials = [];
	this.transformations = [];
	this.primitives = [];
	this.components = [];
}

// Getters

Elements.prototype.getScene = function ()
{
	return this.scene;
};

Elements.prototype.getIllumination = function ()
{
	return this.illumination;
};

Elements.prototype.getPerspective = function (id)
{
	return this.perspectives[id];
};

Elements.prototype.getDefaultPerspective = function ()
{
	return this.defaultPerspective;
};

Elements.prototype.getLight = function (id)
{
	return this.lights[id];
};

Elements.prototype.getTexture = function (id)
{
	return this.textures[id];
};

Elements.prototype.getMaterial = function (id)
{
	return this.materials[id];
};

Elements.prototype.getTransformation = function (id)
{
	return this.transformations[id];
};

Elements.prototype.getPrimitive = function (id)
{
	return this.primitives[id];
};

Elements.prototype.getComponent = function (id)
{
	var element = this.components[id];

	if (element === undefined)
	{
		this.components[id] = new Component(id);
		this.components.length++;
	}

	return this.components[id];
};

// Setters

Elements.prototype.setScene = function (item)
{
	if (!(item instanceof Scene))
	{
		return "item is not a Scene";
	}

	this.scene = item;
	return null;
};

Elements.prototype.setIllumination = function (item)
{
	if (!(item instanceof Illumination))
	{
		return "item is not a Illumination";
	}

	this.illumination = item;
	return null;
};

Elements.prototype.checkValid = function (item, array, constructor, nameType)
{
	if (!(item instanceof constructor))
	{
		return "item is not a " + nameType;
	}

	var id = item.getID();

	var check = array[id];

	if (check !== undefined)
	{
		return nameType + " id " + id + " already exists.";
	}
	else
	{
		return null;
	}
};

Elements.prototype.addPerspective = function (item)
{
	var error = this.checkValid(item, this.perspectives, Perspective, "perspective");

	if (error)
	{
		return error;
	}

	this.perspectives[item.getID()] = item;
	this.perspectives.length++;
	return null;
};

Elements.prototype.setDefaultPerspective = function (item)
{
	if (!(item instanceof Perspective))
	{
		return "item is not a Perspective";
	}

	this.defaultPerspective = item;
	return null;
};

Elements.prototype.addLight = function (item)
{
	var error = this.checkValid(item, this.lights, Light, "light");

	if (error)
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

	if (error)
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

	if (error)
	{
		return error;
	}

	this.materials[item.getID()] = item;
	this.materials.length++;
	return null;
};

Elements.prototype.addTransformation = function (item)
{
	var error = this.checkValid(item, this.transformations, Transformation, "transformation");

	if (error)
	{
		return error;
	}

	this.transformations[item.getID()] = item;
	this.transformations.length++;
	return null;
};

Elements.prototype.addPrimitive = function (item)
{
	var error = this.checkValid(item, this.primitives, Primitive, "primitive");

	if (error)
	{
		return error;
	}

	this.primitives[item.getID()] = item;
	this.primitives.length++;
	return null;
};

Elements.prototype.addComponent = function (id)
{
	var check = this.components[id];

	if (check !== undefined)
	{
		return "Component id " + id + " already exists.";
	}

	this.components[id] = new Component(id);
	this.components.length++;
	return null;
};

Elements.prototype.setComponentData = function (id, transformation, materials, texture, childComponents, childPrimitives)
{
	var check = this.getComponent(id);

	if (check.isLoadedOK())
	{
		return "Component id " + id + " is already loaded";
	}

	check.setData(transformation, materials, texture, childComponents, childPrimitives);
	return null;
};

