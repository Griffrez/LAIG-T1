function deg2rad(degree)
{
	return Math.PI / 180 * degree;
}

function Parser(filename, scene)
{
	this.scene  = scene;
	scene.graph = this;

	this.reader = new CGFXMLreader();

	this.reader.open('scenes/' + filename, this);
}

Parser.prototype.constructor = Parser;

/*
 * Callback to be executed after successful reading
 */
Parser.prototype.onXMLReady = function()
{
	console.log("XML Loading finished.");
	let rootElement = this.reader.xmlDoc.documentElement;

	this.elements = new Elements();

	let error = this.parseDSX(rootElement);

	if (error != null)
	{
		this.onXMLError(error);
		return;
	}

	this.scene.onGraphLoaded();
};

/* -------------------- PARSE DSX -------------------- */

Parser.prototype.parseDSX = function(rootElement)
{
	let result;

	if (rootElement.nodeName !== "dsx")
	{
		return "Main element isn't named dsx.";
	}

	if (rootElement.children.length !== 9)
	{
		if ("parsererror" === rootElement.children[0].nodeName)
		{
			return "There is an error in the dsx/xml format. Please review your file.";
		}
		return "dsx doesn't have exactly 9 children.";
	}

	// Parse View TO TEST
	result = this.parseView(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Illumination TO TEST
	result = this.parseIllumination(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Lights TO TEST
	result = this.parseLights(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Textures TO TEST
	result = this.parseTextures(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Materials TO TEST
	result = this.parseMaterials(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Transformations
	result = this.parseTransformations(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Primitives
	result = this.parsePrimitives(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Components
	result = this.parseComponents(rootElement);
	if (result != null)
	{
		return result;
	}

	result = this.parseScene(rootElement);
	if (result != null)
	{
		return result;
	}

	// All is good
	return null;
};

/* -------------------- PARSE FUNCTIONS -------------------- */

/* -------------------- SCENE -------------------- */
Parser.prototype.parseScene = function(rootElement)
{
	let elems = rootElement.children[0];
	if (elems.nodeName !== "scene")
	{
		return "Error Parsing First Child, Doesn't Exist or Not Scene";
	}

	let root = this.reader.getString(elems, 'root');
	if (null === root)
	{
		return "Error Parsing Scene, root doesn't exist.";
	}

	let axisLength = this.reader.getFloat(elems, 'axis_length');
	if (null === axisLength)
	{
		return "Error Parsing Scene, axis length doesn't exist or not a float.";
	}
	if (axisLength < 0)
	{
		return "Error Parsing Scene, axis length must be non-negative.";
	}

	if (0 !== elems.children.length)
	{
		console.error("Warning: Scene shouldn't have any children, doesn't affect final result.");
	}

	let rootComponent = this.elements.getComponent(root);

	if (null === rootComponent)
	{
		return "Root id refers a non-existing component.";
	}

	if (rootComponent.getMaterials().includes("inherit"))
	{
		return "Root cannot inherit a material.";
	}

	if (rootComponent.getTexture() === "inherit")
	{
		return "Root cannot inherit a texture.";
	}

	this.elements.setScene(new Scene(root, axisLength));

	return null;
};

/* -------------------- VIEW -------------------- */
Parser.prototype.parseView = function(rootElement)
{
	let elems = rootElement.children[1];
	if (elems.nodeName !== "views")
	{
		return "Error Parsing Second Child, Not Views";
	}

	let defaultViewID = this.reader.getString(elems, 'default');
	if (defaultViewID === null)
	{
		return "Error Parsing Views, default view doesn't exist.";
	}

	let perspectiveCount = elems.children.length;
	if (perspectiveCount < 1)
	{
		return "Error Parsing Views, no Perspectives";
	}

	// Parse Perspectives
	for (let i = 0; i < perspectiveCount; i++)
	{
		let currentPerspective = elems.children[i];

		if (currentPerspective.nodeName != 'perspective')
		{
			return "Error Parsing Views Child, not a Perspective";
		}

		let id = this.reader.getString(currentPerspective, 'id');
		if (id === null)
		{
			return "Error Parsing perspective, id doesn't exist.";
		}

		let near = this.reader.getFloat(currentPerspective, 'near');
		if (near === null)
		{
			return "Error Parsing perspective, near doesn't exist or not a float."
		}
		if (near < 0)
		{
			return "Error Parsing perspective, near must be non-negative.";
		}

		let far = this.reader.getFloat(currentPerspective, 'far');
		if (far === null)
		{
			return "Error Parsing perspective, far doesn't exist or not a float."
		}
		if (far < 0)
		{
			return "Error Parsing perspective, far must be non-negative.";
		}
		if (!(far > near))
		{
			return "Error Parsing perspective, far must be greater than near.";
		}

		let angle = this.reader.getFloat(currentPerspective, 'angle');
		if (angle === null)
		{
			return "Error Parsing perspective, far doesn't exist or not a float."
		}
		if (angle < 0)
		{
			return "Error Parsing perspective, far must be non-negative.";
		}

		// To and From

		if (currentPerspective.children.length != 2)
		{
			return "Error Parsing Views, Perspective Child not size 2 (to, from)";
		}

		let fromElems = currentPerspective.getElementsByTagName('from');
		let toElems   = currentPerspective.getElementsByTagName('to');

		// Uniqueness Test
		if (fromElems.length != 1)
		{
			return "Error Parsing Views, from not Unique";
		}

		if (toElems.length != 1)
		{
			return "Error Parsing Views, to not Unique";
		}

		if (id === defaultViewID)
		{
			this.elements.setDefaultPerspective(i);
		}

		let from = vec3.fromValues((this.reader.getFloat(fromElems[0], 'x'))
			, (this.reader.getFloat(fromElems[0], 'y'))
			, (this.reader.getFloat(fromElems[0], 'z')));

		let to = vec3.fromValues((this.reader.getFloat(toElems[0], 'x'))
			, (this.reader.getFloat(toElems[0], 'y'))
			, (this.reader.getFloat(toElems[0], 'z')));

		// Add perspective

		let perspective = new Perspective(id, near, far, deg2rad(angle), from, to);
		let error       = this.elements.addPerspective(perspective);
		if (error != null)
		{
			return error;
		}
	}

	if (this.elements.getDefaultPerspective() === null)
	{
		return "Error Parsing Views, no default perspective";
	}

	return null;
};

/* -------------------- ILLUMINATION -------------------- */
Parser.prototype.parseIllumination = function(rootElement)
{
	let elems = rootElement.children[2];

	if (elems.nodeName !== "illumination")
	{
		return "Error Parsing Third Child, not Illumination";
	}

	let illuminationCount = elems.children.length;
	if (illuminationCount != 2)
	{
		return "Error Parsing Illumination, Illumination child not size 2 (ambient,background)";
	}

	let doublesided = this.reader.getBoolean(elems, 'doublesided');
	let local       = this.reader.getBoolean(elems, 'local');

	let ambientElems    = elems.getElementsByTagName('ambient');
	let backgroundElems = elems.getElementsByTagName('background');

	// Uniqueness Test
	if (ambientElems.length != 1)
	{
		return "Error Parsing Illumination, ambient not Unique";
	}

	if (backgroundElems.length != 1)
	{
		return "Error Parsing Illumination, background not Unique";
	}

	let ambientColor = new Color((this.reader.getFloat(ambientElems[0], 'r'))
		, (this.reader.getFloat(ambientElems[0], 'g'))
		, (this.reader.getFloat(ambientElems[0], 'b'))
		, (this.reader.getFloat(ambientElems[0], 'a')));

	let backgroundColor = new Color((this.reader.getFloat(backgroundElems[0], 'r'))
		, (this.reader.getFloat(backgroundElems[0], 'g'))
		, (this.reader.getFloat(backgroundElems[0], 'b'))
		, (this.reader.getFloat(backgroundElems[0], 'a')));

	this.elements.setIllumination(new Illumination(doublesided, local, ambientColor, backgroundColor));

	return null;
};

/* -------------------- LIGHTS -------------------- */
Parser.prototype.parseLights = function(rootElement)
{
	let elems = rootElement.children[3];

	if (elems.nodeName !== "lights")
	{
		return "Error Parsing Fourth Child, not Lights";
	}

	let lightCount = elems.children.length;
	if (lightCount < 1)
	{
		return "Error Parsing Lights, no Lights";
	}

	for (let i = 0; i < lightCount; i++)
	{
		let currentLight = elems.children[i];

		let isSpot = (currentLight.nodeName == 'spot');

		// Control
		let id      = this.reader.getString(currentLight, 'id');
		let enabled = this.reader.getBoolean(currentLight, 'enabled');

		// Variables
		let locationElems = currentLight.getElementsByTagName('location');
		let ambientElems  = currentLight.getElementsByTagName('ambient');
		let diffuseElems  = currentLight.getElementsByTagName('diffuse');
		let specularElems = currentLight.getElementsByTagName('specular');

		let location = null;
		let ambient  = null;
		let diffuse  = null;
		let specular = null;

		if (isSpot)
		{
			// Control
			let angle    = this.reader.getFloat(currentLight, 'angle');
			let exponent = this.reader.getFloat(currentLight, 'exponent');

			if (currentLight.children.length != 5)
			{
				return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
			}

			// Elems
			let targetElems = currentLight.getElementsByTagName('target');

			// Uniqueness Test
			if (locationElems.length != 1)
			{
				return "Error Parsing Lights, location not Unique";
			}

			if (targetElems.length != 1)
			{
				return "Error Parsing Lights, target not Unique";
			}

			if (ambientElems.length != 1)
			{
				return "Error Parsing Lights, ambient not Unique";
			}

			if (diffuseElems.length != 1)
			{
				return "Error Parsing Lights, diffuse not Unique";
			}

			if (specularElems.length != 1)
			{
				return "Error Parsing Lights, specular not Unique";
			}

			location = vec3.fromValues((this.reader.getFloat(locationElems[0], 'x'))
				, (this.reader.getFloat(locationElems[0], 'y'))
				, (this.reader.getFloat(locationElems[0], 'z')));

			let target = vec3.fromValues((this.reader.getFloat(targetElems[0], 'x'))
				, (this.reader.getFloat(targetElems[0], 'y'))
				, (this.reader.getFloat(targetElems[0], 'z')));

			// Colors
			ambient = new Color((this.reader.getFloat(ambientElems[0], 'r'))
				, (this.reader.getFloat(ambientElems[0], 'g'))
				, (this.reader.getFloat(ambientElems[0], 'b'))
				, (this.reader.getFloat(ambientElems[0], 'a')));

			diffuse = new Color((this.reader.getFloat(diffuseElems[0], 'r'))
				, (this.reader.getFloat(diffuseElems[0], 'g'))
				, (this.reader.getFloat(diffuseElems[0], 'b'))
				, (this.reader.getFloat(diffuseElems[0], 'a')));

			specular = new Color((this.reader.getFloat(specularElems[0], 'r'))
				, (this.reader.getFloat(specularElems[0], 'g'))
				, (this.reader.getFloat(specularElems[0], 'b'))
				, (this.reader.getFloat(specularElems[0], 'a')));

			let spotLight = new SpotLight(id, enabled, location, ambient, diffuse, specular, deg2rad(
				angle), exponent, target);

			let error = this.elements.addLight(spotLight);
			if (error != null)
			{
				return error;
			}
		}
		else
		{
			if (currentLight.children.length != 4)
			{
				return "Error Parsing Lights, Omni Child not size 4 (location, ambient, diffuse, specular)";
			}

			// Uniqueness Test
			if (locationElems.length != 1)
			{
				return "Error Parsing Lights, location not Unique";
			}

			if (ambientElems.length != 1)
			{
				return "Error Parsing Lights, ambient not Unique";
			}

			if (diffuseElems.length != 1)
			{
				return "Error Parsing Lights, diffuse not Unique";
			}

			if (specularElems.length != 1)
			{
				return "Error Parsing Lights, specular not Unique";
			}

			location = vec4.fromValues((this.reader.getFloat(locationElems[0], 'x'))
				, (this.reader.getFloat(locationElems[0], 'y'))
				, (this.reader.getFloat(locationElems[0], 'z'))
				, (this.reader.getFloat(locationElems[0], 'w')));

			// Colors
			ambient = new Color((this.reader.getFloat(ambientElems[0], 'r'))
				, (this.reader.getFloat(ambientElems[0], 'g'))
				, (this.reader.getFloat(ambientElems[0], 'b'))
				, (this.reader.getFloat(ambientElems[0], 'a')));

			diffuse = new Color((this.reader.getFloat(diffuseElems[0], 'r'))
				, (this.reader.getFloat(diffuseElems[0], 'g'))
				, (this.reader.getFloat(diffuseElems[0], 'b'))
				, (this.reader.getFloat(diffuseElems[0], 'a')));

			specular = new Color((this.reader.getFloat(specularElems[0], 'r'))
				, (this.reader.getFloat(specularElems[0], 'g'))
				, (this.reader.getFloat(specularElems[0], 'b'))
				, (this.reader.getFloat(specularElems[0], 'a')));

			let omniLight = new OmniLight(id, enabled, location, ambient, diffuse, specular);

			let error = this.elements.addLight(omniLight);
			if (error != null)
			{
				return error;
			}
		}
	}
	return null;
};

/* -------------------- TEXTURES -------------------- */
Parser.prototype.parseTextures = function(rootElement)
{
	let elems = rootElement.children[4];

	if (elems.nodeName !== "textures")
	{
		return "Error Parsing Fifth Child, not Textures";
	}

	let textureCount = elems.children.length;
	if (textureCount < 1)
	{
		return "Error Parsing Textures, no Textures";
	}

	for (let i = 0; i < textureCount; i++)
	{
		let currentTexture = elems.children[i];

		let id       = this.reader.getString(currentTexture, 'id');
		let file     = this.reader.getString(currentTexture, 'file');
		let length_s = this.reader.getFloat(currentTexture, 'length_s');
		let length_t = this.reader.getFloat(currentTexture, 'length_t');

		let texture = new TextureData(id, file, length_s, length_t);
		let error   = this.elements.addTexture(texture);
		if (error != null)
		{
			return error;
		}
	}
	return null;
};

/* -------------------- MATERIALS -------------------- */
Parser.prototype.parseMaterials = function(rootElement)
{
	let elems = rootElement.children[5];

	if (elems.nodeName !== "materials")
	{
		return "Error Parsing Sixth Child, not Materials";
	}

	let materialCount = elems.children.length;
	if (materialCount < 1)
	{
		return "Error Parsing Materials, no Materials";
	}

	for (let i = 0; i < materialCount; i++)
	{
		let currentMaterial = elems.children[i];

		let id = this.reader.getString(currentMaterial, 'id');

		if (currentMaterial.children.length != 5)
		{
			return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
		}

		// Elems
		let emissionElems  = currentMaterial.getElementsByTagName('emission');
		let ambientElems   = currentMaterial.getElementsByTagName('ambient');
		let diffuseElems   = currentMaterial.getElementsByTagName('diffuse');
		let specularElems  = currentMaterial.getElementsByTagName('specular');
		let shininessElems = currentMaterial.getElementsByTagName('shininess');

		// Uniqueness Test
		if (emissionElems.length != 1)
		{
			return "Error Parsing Materials, emission not Unique";
		}

		if (ambientElems.length != 1)
		{
			return "Error Parsing Materials, ambient not Unique";
		}

		if (diffuseElems.length != 1)
		{
			return "Error Parsing Materials, diffuse not Unique";
		}

		if (specularElems.length != 1)
		{
			return "Error Parsing Materials, specular not Unique";
		}

		if (shininessElems.length != 1)
		{
			return "Error Parsing Materials, shininess not Unique";
		}

		// Colors
		let emission = new Color((this.reader.getFloat(emissionElems[0], 'r'))
			, (this.reader.getFloat(emissionElems[0], 'g'))
			, (this.reader.getFloat(emissionElems[0], 'b'))
			, (this.reader.getFloat(emissionElems[0], 'a')));

		let ambient = new Color((this.reader.getFloat(ambientElems[0], 'r'))
			, (this.reader.getFloat(ambientElems[0], 'g'))
			, (this.reader.getFloat(ambientElems[0], 'b'))
			, (this.reader.getFloat(ambientElems[0], 'a')));

		let diffuse = new Color((this.reader.getFloat(diffuseElems[0], 'r'))
			, (this.reader.getFloat(diffuseElems[0], 'g'))
			, (this.reader.getFloat(diffuseElems[0], 'b'))
			, (this.reader.getFloat(diffuseElems[0], 'a')));

		let specular = new Color((this.reader.getFloat(specularElems[0], 'r'))
			, (this.reader.getFloat(specularElems[0], 'g'))
			, (this.reader.getFloat(specularElems[0], 'b'))
			, (this.reader.getFloat(specularElems[0], 'a')));

		let shininess = this.reader.getFloat(shininessElems[0], 'value');

		let material = new Material(id, emission, ambient, diffuse, specular, shininess);

		let error = this.elements.addMaterial(material);
		if (error != null)
		{
			return error;
		}
	}
	return null;
};

Parser.prototype.parseTransformations = function(rootElement)
{
	let elems = rootElement.children[6];

	if (elems.nodeName !== "transformations")
	{
		return "Error Parsing Seventh Child, not Transformations";
	}

	let transformationCount = elems.children.length;
	if (transformationCount < 1)
	{
		return "Error Parsing Transformations, no Transformations";
	}

	for (let i = 0; i < transformationCount; i++)
	{
		let currentTransformation = elems.children[i];

		let id = this.reader.getString(currentTransformation, 'id');

		if (currentTransformation.children.length < 1)
		{
			return "Error Parsing Transformations, Child not size greater than 0.";
		}

		let transformation = new Transformation(id);

		let inner_transformationCount = currentTransformation.children.length;

		for (let j = 0; j < inner_transformationCount; j++)
		{
			let inner_currentTransformation = currentTransformation.children[j];

			let nodeName = inner_currentTransformation.nodeName;

			if ((nodeName === "translate") || (nodeName === "scale"))
			{
				let x = this.reader.getFloat(inner_currentTransformation, 'x');
				let y = this.reader.getFloat(inner_currentTransformation, 'y');
				let z = this.reader.getFloat(inner_currentTransformation, 'z');

				if (nodeName === "translate")
				{
					transformation.addTranslation(x, y, z);
				}
				else
				{
					transformation.addScaling(x, y, z);
				}
			}
			else if (nodeName === "rotate")
			{
				let axis  = this.reader.getString(inner_currentTransformation, 'axis');
				let angle = this.reader.getFloat(inner_currentTransformation, 'angle');
				let error;
				if (null !== (error = transformation.addRotation(axis, deg2rad(angle))))
				{
					return error;
				}
			}
			else
			{
				return "Error Parsing Transformation, unknown transformation type" + nodeName;
			}
		}

		let error = this.elements.addTransformation(transformation);
		if (error != null)
		{
			return error;
		}
	}
};

Parser.prototype.parsePrimitives = function(rootElement)
{
	let elems = rootElement.children[7];

	if (elems.nodeName !== "primitives")
	{
		return "Error Parsing Eighth Child, not Primitives";
	}

	let primitiveCount = elems.children.length;
	if (primitiveCount < 1)
	{
		return "Error Parsing Primitives, no Primitives";
	}

	for (let i = 0; i < primitiveCount; i++)
	{
		let currentPrimitive = elems.children[i];

		let id = this.reader.getString(currentPrimitive, 'id');

		if (currentPrimitive.children.length !== 1)
		{
			return "Error Parsing Primitive, amount of tags found is different from 1";
		}

		let primitive = currentPrimitive.children[0];

		let result;

		if (primitive.nodeName === "rectangle")
		{
			let x1 = this.reader.getFloat(primitive, 'x1');
			let y1 = this.reader.getFloat(primitive, 'y1');

			let x2 = this.reader.getFloat(primitive, 'x2');
			let y2 = this.reader.getFloat(primitive, 'y2');

			let p1 = vec2.fromValues(x1, y1);

			let p2 = vec2.fromValues(x2, y2);

			result = new RectanglePrimitive(id, p1, p2);
		}
		else if (primitive.nodeName === "triangle")
		{
			let x1 = this.reader.getFloat(primitive, 'x1');
			let y1 = this.reader.getFloat(primitive, 'y1');
			let z1 = this.reader.getFloat(primitive, 'z1');

			let x2 = this.reader.getFloat(primitive, 'x2');
			let y2 = this.reader.getFloat(primitive, 'y2');
			let z2 = this.reader.getFloat(primitive, 'z2');

			let x3 = this.reader.getFloat(primitive, 'x3');
			let y3 = this.reader.getFloat(primitive, 'y3');
			let z3 = this.reader.getFloat(primitive, 'z3');

			let p1 = vec3.fromValues(x1, y1, z1);

			let p2 = vec3.fromValues(x2, y2, z2);

			let p3 = vec3.fromValues(x3, y3, z3);

			result = new TrianglePrimitive(id, p1, p2, p3);
		}
		else if (primitive.nodeName === "cylinder")
		{
			let base   = this.reader.getFloat(primitive, 'base');
			let top    = this.reader.getFloat(primitive, 'top');
			let height = this.reader.getFloat(primitive, 'height');

			let slices = this.reader.getInteger(primitive, 'slices');
			let stacks = this.reader.getInteger(primitive, 'stacks');

			result = new CylinderPrimitive(id, base, top, height, slices, stacks);
		}
		else if (primitive.nodeName === "sphere")
		{
			let radius = this.reader.getFloat(primitive, 'radius');

			let slices = this.reader.getInteger(primitive, 'slices');
			let stacks = this.reader.getInteger(primitive, 'stacks');

			result = new SpherePrimitive(id, radius, slices, stacks);
		}
		else if (primitive.nodeName === "torus")
		{
			let inner = this.reader.getFloat(primitive, 'inner');
			let outer = this.reader.getFloat(primitive, 'outer');

			let slices = this.reader.getInteger(primitive, 'slices');
			let loops  = this.reader.getInteger(primitive, 'loops');

			result = new TorusPrimitive(id, inner, outer, slices, loops);
		}
		else if (primitive.nodeName === "plane")
		{
			let dimX = this.reader.getFloat(primitive, 'dimX');
			let dimY = this.reader.getFloat(primitive, 'dimY');

			let partsX = this.reader.getInteger(primitive, 'partsX');
			let partsY = this.reader.getInteger(primitive, 'partsY');

			result = new PlanePrimitive(id, dimX, dimY, partsX, partsY);
		}
		else if (primitive.nodeName === "patch")
		{
			let orderU = this.reader.getInteger(primitive, 'orderU');
			let orderV = this.reader.getInteger(primitive, 'orderV');

			let partsU = this.reader.getInteger(primitive, 'partsU');
			let partsV = this.reader.getInteger(primitive, 'partsV');

			let controlPoints = [];

			let controlPointsNumber = (orderU + 1) * (orderV + 1);
			let controlPointsCount  = primitive.children.length;

			if (controlPointsNumber !== controlPointsCount)
			{
				return "Error Parsing Primitives, patch should have (orderU + 1) * (orderV + 1) control points";
			}

			for (let j = 0; j < (orderU + 1); j++)
			{
				let temp = [];
				for (let k = 0; k < (orderV + 1); k++)
				{
					let currentControlPoint = primitive.children[j * (orderV + 1) + k];

					let controlPoint = vec4.fromValues((this.reader.getFloat(currentControlPoint, 'x'))
						, (this.reader.getFloat(currentControlPoint, 'y'))
						, (this.reader.getFloat(currentControlPoint, 'z')), 1);

					temp.push(controlPoint);
				}
				controlPoints.push(temp);
			}

			result = new PatchPrimitive(id, orderU, orderV, partsU, partsV, controlPoints);
		}
		else if (primitive.nodeName === "chessboard")
		{
			let du     = this.reader.getInteger(primitive, 'du');
			let dv     = this.reader.getInteger(primitive, 'dv');
			let texref = this.reader.getString(primitive, 'textureref');
			texref = this.elements.getTexture(texref);
			if(texref === null)
			{
				return "Error Parsing Primitives, chessboard texture reference doesn't match any existing texture.";
			}
			let su = this.reader.getInteger(primitive, 'su');
			if(su === null)
			{
				su = -1;
			}
			else if((su < -1) || (su >= du))
			{
				return "Error Parsing Primitives, chessboard su has to be in the range -1 .. (du-1).";
			}
			let sv = this.reader.getInteger(primitive, 'sv');
			if(sv === null)
			{
				sv = -1;
			}
			else if((sv < -1) || (sv >= dv))
			{
				return "Error Parsing Primitives, chessboard sv has to be in the range -1 .. (dv-1).";
			}
			let children = primitive.children;
			if(children.length != 3)
			{
				return "Error Parsing Primitives, chessboard must have 3 children.";
			}
			let c1Found = false;
			let c2Found = false;
			let csFound = false;
			let c1 = null;
			let c2 = null;
			let cs = null;
			for(let i = 0; i < 3; i++)
			{
				let child = children[i];

				if(child.nodeName === "c1")
				{
					if(c1Found)
					{
						return "Error Parsing Primitives, chessboard can only have one c1 child";
					}
					c1Found = true;

					let red = this.reader.getFloat(child, 'r');
					let green = this.reader.getFloat(child, 'g');
					let blue = this.reader.getFloat(child, 'b');
					let alpha = this.reader.getFloat(child, 'a');

					c1 = new Color(red, green, blue, alpha);
				}
				else if(child.nodeName === "c2")
				{
					if(c2Found)
					{
						return "Error Parsing Primitives, chessboard can only have one c2 child";
					}
					c2Found = true;

					let red = this.reader.getFloat(child, 'r');
					let green = this.reader.getFloat(child, 'g');
					let blue = this.reader.getFloat(child, 'b');
					let alpha = this.reader.getFloat(child, 'a');

					c2 = new Color(red, green, blue, alpha);
				}
				else if(child.nodeName === "cs")
				{
					if(csFound)
					{
						return "Error Parsing Primitives, chessboard can only have one cs child";
					}
					csFound = true;

					let red = this.reader.getFloat(child, 'r');
					let green = this.reader.getFloat(child, 'g');
					let blue = this.reader.getFloat(child, 'b');
					let alpha = this.reader.getFloat(child, 'a');

					cs = new Color(red, green, blue, alpha);
				}
				else
				{
					return "Error Parsing Primitives, chessboard: unknown color type found."
				}
			}

			result = new ChessboardPrimitive(id, du, dv, su, sv, texref, c1, c2, cs);
		}
		else if (primitive.nodeName === "vehicle")
		{

		}
		else
		{
			return "Error Parsing Primitive, unknown primitive found."
		}

		let error = this.elements.addPrimitive(result);
		if (error != null)
		{
			return error;
		}
	}
};

Parser.prototype.parseComponents = function(rootElement)
{
	let elems = rootElement.children[8];

	if (elems.nodeName !== "components")
	{
		return "Error Parsing Ninth Child, not Components";
	}

	let componentCount = elems.children.length;
	if (componentCount < 1)
	{
		return "Error Parsing Components, no ComponentData";
	}

	for (let i = 0; i < componentCount; i++)
	{
		let currentComponent = elems.children[i];

		let id = this.reader.getString(currentComponent, 'id');

		if (currentComponent.children.length !== 4)
		{
			return "Error Parsing ComponentData, tag amount different than 4 (transformation, materials, texture, children)";
		}

		let transformationElements = currentComponent.getElementsByTagName('transformation');

		if (transformationElements.length !== 1)
		{
			return "Error Parsing ComponentData, should have one and just one transformation element";
		}

		let materialsElements = currentComponent.getElementsByTagName('materials');

		if (materialsElements.length !== 1)
		{
			return "Error Parsing ComponentData, should have one and just one materials element";
		}

		let textureElements = currentComponent.getElementsByTagName('texture');

		if (textureElements.length !== 1)
		{
			return "Error Parsing ComponentData, should have one and just one texture element";
		}

		let childrenElements = currentComponent.getElementsByTagName('children');

		if (childrenElements.length !== 1)
		{
			return "Error Parsing ComponentData, should have one and just one children element";
		}

		let transformationElement = transformationElements[0];
		let materialsElement      = materialsElements[0];
		let textureElement        = textureElements[0];
		let childrenElement       = childrenElements[0];

		let transformation;

		if ((transformationElement.children.length === 1) && (transformationElement.children[0].nodeName === "transformationref"))
		{
			let transformationRef = transformationElement.children[0];

			let transformationID = this.reader.getString(transformationRef, 'id');

			transformation = this.elements.getTransformation(transformationID);

			if (transformation === undefined)
			{
				return "Error Parsing Transformation in ComponentData, transformation referred doesn't exist";
			}
		}
		else
		{
			transformation = new Transformation(id);

			let transformationCount = transformationElement.children.length;

			for (let j = 0; j < transformationCount; j++)
			{
				let currentTransformation = transformationElement.children[j];

				let nodeName = currentTransformation.nodeName;

				if ((nodeName === "translate") || (nodeName === "scale"))
				{
					let x = this.reader.getFloat(currentTransformation, 'x');
					let y = this.reader.getFloat(currentTransformation, 'y');
					let z = this.reader.getFloat(currentTransformation, 'z');

					if (nodeName === "translate")
					{
						transformation.addTranslation(x, y, z);
					}
					else
					{
						transformation.addScaling(x, y, z);
					}
				}
				else if (nodeName === "rotate")
				{
					let axis  = this.reader.getString(currentTransformation, 'axis');
					let angle = this.reader.getFloat(currentTransformation, 'angle');
					transformation.addRotation(axis, deg2rad(angle));
				}
				else
				{
					return "Error Parsing Transformation in ComponentData, unknown transformation type" + nodeName;
				}
			}
		}

		let materials = [];

		if (materialsElement.children.length < 1)
		{
			return "Error Parsing Materials in ComponentData, there must be at least one";
		}

		let materialElements = materialsElement.children;

		let materialCount = materialElements.length;

		for (let i = 0; i < materialCount; i++)
		{
			let materialElement = materialElements[i];

			let materialID = this.reader.getString(materialElement, 'id');

			if (materialID === "inherit")
			{
				materials.push(materialID);
			}
			else
			{

				let material = this.elements.getMaterial(materialID);

				if (material === undefined)
				{
					return "Error Parsing Material in ComponentData, id referred doesn't match any material."
				}

				materials.push(material);
			}
		}

		let texture;

		let textureID = this.reader.getString(textureElement, 'id');

		if ((textureID === "inherit") || (textureID === "none"))
		{
			texture = textureID;
		}
		else
		{
			let textureItem = this.elements.getTexture(textureID);

			if (textureItem === undefined)
			{
				return "Error Parsing TextureData in ComponentData, id referred doesn't match any texture";
			}

			texture = textureItem;
		}

		let childrenPrimitives = [];
		let childrenComponents = [];

		let children      = childrenElement.children;
		let childrenCount = children.length;

		for (let i = 0; i < childrenCount; i++)
		{
			let child = children[i];

			if (child.nodeName === "componentref")
			{
				let componentID = this.reader.getString(child, 'id');

				let component = this.elements.getComponent(componentID);

				childrenComponents.push(component);
			}
			else if (child.nodeName === "primitiveref")
			{
				let primitiveID = this.reader.getString(child, 'id');

				let primitive = this.elements.getPrimitive(primitiveID);

				if (primitive === undefined)
				{
					return "Error Parsing Child Primitive in ComponentData, id referred doesn't match any primitive";
				}

				childrenPrimitives.push(primitive);
			}
			else
			{
				return "Error Parsing Child in ComponentData, unknown child type" + child.nodeName;
			}
		}

		let error = this.elements.setComponentData(id, transformation, materials, texture, childrenComponents,
		                                           childrenPrimitives);
		if (error != null)
		{
			return error;
		}
	}
};

/*
 * Callback to be executed on any read error
 */

Parser.prototype.onXMLError = function(message)
{
	console.error("XML Loading Error: " + message);
};