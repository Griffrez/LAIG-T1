/**
 * Elements
 * Data structure to index all the information required for the Engine
 */
function Elements()
{
	this.scene              = null;         // Reference to the Scene element of the dsx
	this.illumination       = null;         // Reference to the Illumination element of the dsx
	this.perspectives       = new Map();    // Map of ID to Perspectives. [id, Perspective]
	this.defaultPerspective = null;         // Default perspective used, reference to Perspective element
	this.lights             = new Map();    // Map of ID to Lights. [id, Light]
	this.textures           = new Map();    // Map of ID to TextureData. [id, TextureData]
	this.materials          = new Map();    // Map of ID to Materials. [id, Material]
	this.transformations    = new Map();    // Map of ID to Transformations. [id, Transformation]
	this.primitives         = new Map();    // Map of ID to Primitives. [id, Primitive]
	this.components         = new Map();    // Map of ID to Components. [id, Component]
}

Elements.prototype.constructor = Elements;

// Getters

Elements.prototype.getScene = function()
{
	return this.scene;
};

Elements.prototype.getIllumination = function()
{
	return this.illumination;
};

Elements.prototype.getPerspective = function(id)
{
	return this.perspectives.get(id);
};

Elements.prototype.getPerspectives = function()
{
	return this.perspectives.values();
};

Elements.prototype.getDefaultPerspective = function()
{
	return this.defaultPerspective;
};

Elements.prototype.getLight = function(id)
{
	return this.lights.get(id);
};

Elements.prototype.getLights = function()
{
	return this.lights.values();
};

Elements.prototype.getTexture = function(id)
{
	return this.textures.get(id);
};

Elements.prototype.getTextures = function()
{
	return this.textures.values();
};

Elements.prototype.getMaterial = function(id)
{
	return this.materials.get(id);
};

Elements.prototype.getMaterials = function()
{
	return this.materials.values();
};

Elements.prototype.getTransformation = function(id)
{
	return this.transformations.get(id);
};

Elements.prototype.getTransformations = function()
{
	return this.transformations.values();
};

Elements.prototype.getPrimitive = function(id)
{
	return this.primitives.get(id);
};

Elements.prototype.getPrimitives = function()
{
	return this.primitives.values();
};

Elements.prototype.getComponent = function(id)
{
	let element = this.components.get(id);

	if (element === undefined)
	{
		this.components.set(id, new ComponentData(id));
	}

	return this.components.get(id);
};

Elements.prototype.getComponents = function()
{
	return this.components.values();
};

// Setters

Elements.prototype.setScene = function(item)
{
	if (!(item instanceof Scene))
	{
		return "item is not a Scene";
	}

	this.scene = item;
	return null;
};

Elements.prototype.setIllumination = function(item)
{
	if (!(item instanceof Illumination))
	{
		return "item is not a Illumination";
	}

	this.illumination = item;
	return null;
};

Elements.prototype.checkValid = function(item, map, constructor, nameType)
{
	if (!(item instanceof constructor))
	{
		return "item is not a " + nameType;
	}

	let id = item.getID();

	let check = map.get(id);

	if (check !== undefined)
	{
		return nameType + " id " + id + " already exists.";
	}
	else
	{
		return null;
	}
};

Elements.prototype.addPerspective = function(item)
{
	let error = this.checkValid(item, this.perspectives, Perspective, "perspective");

	if (error)
	{
		return error;
	}

	this.perspectives.set(item.getID(), item);
	return null;
};

Elements.prototype.setDefaultPerspective = function(item)
{
	this.defaultPerspective = item;
	return null;
};

Elements.prototype.addLight = function(item)
{
	let error = this.checkValid(item, this.lights, Light, "light");

	if (error)
	{
		return error;
	}

	this.lights.set(item.getID(), item);
	return null;
};

Elements.prototype.addTexture = function(item)
{
	let error = this.checkValid(item, this.textures, TextureData, "texture");

	if (error)
	{
		return error;
	}

	this.textures.set(item.getID(), item);
	return null;
};

Elements.prototype.addMaterial = function(item)
{
	let error = this.checkValid(item, this.materials, Material, "material");

	if (error)
	{
		return error;
	}

	this.materials.set(item.getID(), item);
	return null;
};

Elements.prototype.addTransformation = function(item)
{
	let error = this.checkValid(item, this.transformations, Transformation, "transformation");

	if (error)
	{
		return error;
	}

	this.transformations.set(item.getID(), item);
	return null;
};

Elements.prototype.addPrimitive = function(item)
{
	let error = this.checkValid(item, this.primitives, Primitive, "primitive");

	if (error)
	{
		return error;
	}

	this.primitives.set(item.getID(), item);
	return null;
};

Elements.prototype.addComponent = function(id)
{
	let check = this.components[id];

	if (check !== undefined)
	{
		return "ComponentData id " + id + " already exists.";
	}

	this.components.set(item.getID(), item);
	return null;
};

Elements.prototype.setComponentData = function(id, transformation, materials, texture, childComponents, childPrimitives)
{
	let check = this.getComponent(id);

	if (check.isLoadedOK())
	{
		return "ComponentData id " + id + " is already loaded";
	}

	check.setData(transformation, materials, texture, childComponents, childPrimitives);
	return null;
};

