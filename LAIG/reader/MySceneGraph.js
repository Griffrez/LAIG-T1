function MySceneGraph(filename, scene)
{
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph = this;

	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/' + filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function ()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	this.elements = new Elements();

	// Here should go the calls for different functions to parse the various blocks
	// var error = this.parseScene(rootElement);
	var error = this.parseDSX(rootElement);

	if (error != null)
	{
		this.onXMLError(error);
		return;
	}

	this.loadedOk = true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take
	// place
	this.scene.onGraphLoaded();
};

/* -------------------- PARSE DSX -------------------- */

MySceneGraph.prototype.parseDSX = function (rootElement)
{
	var result;

	// Parse Scene TO TEST
	result = this.parseScene(rootElement);
	if (result != null)
	{
		return result;
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

	// Parse Transformations TODO
	result = this.parseTransformations(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Primitives TODO
	result = this.parsePrimitives(rootElement);
	if (result != null)
	{
		return result;
	}

	// Parse Components TODO
	result = this.parseComponents(rootElement);
	if (result != null)
	{
		return result;
	}

	// All is good
	return null;
};

/* -------------------- PARSE FUNCTIONS -------------------- */

/* -------------------- SCENE -------------------- */
MySceneGraph.prototype.parseScene = function (rootElement)
{
	var elems = rootElement.children[0];

	if (elems.nodeName !== "scene")
	{
		return "Error Parsing First Child, Not Scene";
	}

	var root = this.reader.getString(elems, 'root');
	var axisLength = this.reader.getFloat(elems, 'axis_length');

	if (axisLength < 0)
	{
		return "Error Parsing Scene, not positive axis";
	}

	this.elements.setScene(new Scene(root, axisLength));

	return null;
};

/* -------------------- VIEW -------------------- */
MySceneGraph.prototype.parseView = function (rootElement)
{
	var elems = rootElement.children[1];

	if (elems.nodeName !== "views")
	{
		return "Error Parsing Second Child, Not Views";
	}

	var viewElems = elems;

	var defaultViewID = this.reader.getString(viewElems, 'default');

	var perspectiveCount = viewElems.children.length;
	if (perspectiveCount < 1)
	{
		return "Error Parsing Views, no Perspectives";
	}

	// Parse Perspectives
	for (var i = 0; i < perspectiveCount; i++)
	{
		var currentPerspective = viewElems.children[i];

		if (currentPerspective.nodeName != 'perspective')
		{
			return "Error Parsing Views Child, not a Perspective";
		}

		var id = this.reader.getString(currentPerspective, 'id');
		var near = this.reader.getString(currentPerspective, 'near');
		var far = this.reader.getFloat(currentPerspective, 'far');
		var angle = this.reader.getFloat(currentPerspective, 'angle');

		// To and From

		if (currentPerspective.children.length != 2)
		{
			return "Error Parsing Views, Perspective Child not size 2 (to, from)";
		}

		var fromElems = currentPerspective.getElementsByTagName('from');
		var toElems = currentPerspective.getElementsByTagName('to');

		// Uniqueness Test
		if (fromElems.length != 1)
		{
			return "Error Parsing Views, from not Unique";
		}

		if (toElems.length != 1)
		{
			return "Error Parsing Views, to not Unique";
		}

		var from = new CartesianValues3((this.reader.getFloat(fromElems[0], 'x'))
			, (this.reader.getFloat(fromElems[0], 'y'))
			, (this.reader.getFloat(fromElems[0], 'z')));

		var to = new CartesianValues3((this.reader.getFloat(toElems[0], 'x'))
			, (this.reader.getFloat(toElems[0], 'y'))
			, (this.reader.getFloat(toElems[0], 'z')));

		// Add perspective

		var perspective = new Perspective(id, near, far, angle, from, to);
		var error = this.elements.addPerspective(perspective);
		if (error != null)
		{
			return error;
		}
	}

	// Test for default perspective goes here

	var defaultPerspectiveReference = this.elements.getPerspective(defaultViewID);

	if (defaultPerspectiveReference === undefined)
	{
		return "Error Parsing Views, no default perspective";
	}

	this.elements.setDefaultPerspective(defaultPerspectiveReference);

	return null;
};

/* -------------------- ILLUMINATION -------------------- */
MySceneGraph.prototype.parseIllumination = function (rootElement)
{
	var elems = rootElement.children[2];

	if (elems.nodeName !== "illumination")
	{
		return "Error Parsing Third Child, not Illumination";
	}

	var illuminationCount = elems.children.length;
	if (illuminationCount != 2)
	{
		return "Error Parsing Illumination, Illumination child not size 2 (ambient,background)";
	}

	var doublesided = this.reader.getBoolean(elems, 'doublesided');
	var local = this.reader.getBoolean(elems, 'local');

	var ambientElems = elems.getElementsByTagName('ambient');
	var backgroundElems = elems.getElementsByTagName('background');

	// Uniqueness Test
	if (ambientElems.length != 1)
	{
		return "Error Parsing Illumination, ambient not Unique";
	}

	if (backgroundElems.length != 1)
	{
		return "Error Parsing Illumination, background not Unique";
	}

	var ambientColor = new Color((this.reader.getFloat(ambientElems[0], 'r'))
		, (this.reader.getFloat(ambientElems[0], 'g'))
		, (this.reader.getFloat(ambientElems[0], 'b'))
		, (this.reader.getFloat(ambientElems[0], 'a')));

	var backgroundColor = new Color((this.reader.getFloat(backgroundElems[0], 'r'))
		, (this.reader.getFloat(backgroundElems[0], 'g'))
		, (this.reader.getFloat(backgroundElems[0], 'b'))
		, (this.reader.getFloat(backgroundElems[0], 'a')));

	this.elements.setIllumination(new Illumination(doublesided, local, ambientColor, backgroundColor));

	return null;
};

/* -------------------- LIGHTS -------------------- */
MySceneGraph.prototype.parseLights = function (rootElement)
{
	var elems = rootElement.children[3];

	if (elems.nodeName !== "lights")
	{
		return "Error Parsing Fourth Child, not Lights";
	}

	var lightCount = elems.children.length;
	if (lightCount < 1)
	{
		return "Error Parsing Lights, no Lights";
	}

	for (var i = 0; i < lightCount; i++)
	{
		var currentLight = elems.children[i];

		var isSpot = (currentLight.nodeName == 'spot');

		// Control
		var id = this.reader.getString(currentLight, 'id');
		var enabled = this.reader.getBoolean(currentLight, 'enabled');

		// Variables
		var locationElems = currentLight.getElementsByTagName('location');
		var ambientElems = currentLight.getElementsByTagName('ambient');
		var diffuseElems = currentLight.getElementsByTagName('diffuse');
		var specularElems = currentLight.getElementsByTagName('specular');

		var location = null;
		var ambient = null;
		var diffuse = null;
		var specular = null;

		if (isSpot)
		{
			// Control
			var angle = this.reader.getFloat(currentLight, 'angle');
			var exponent = this.reader.getFloat(currentLight, 'exponent');

			if (currentLight.children.length != 5)
			{
				return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
			}

			// Elems
			var targetElems = currentLight.getElementsByTagName('target');

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

			// Cartesian Value 3
			location = new CartesianValues3((this.reader.getFloat(locationElems[0], 'x'))
				, (this.reader.getFloat(locationElems[0], 'y'))
				, (this.reader.getFloat(locationElems[0], 'z')));

			var target = new CartesianValues3((this.reader.getFloat(targetElems[0], 'x'))
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

			var spotLight = new SpotLight(id, enabled, location, ambient, diffuse, specular, angle, exponent, target);

			var error = this.elements.addLight(spotLight);
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

			// Cartesian Value 4
			location = new CartesianValues4((this.reader.getFloat(locationElems[0], 'x'))
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

			var omniLight = new OmniLight(id, enabled, location, ambient, diffuse, specular);

			error = this.elements.addLight(omniLight);
			if (error != null)
			{
				return error;
			}
		}
	}
	return null;
};

/* -------------------- TEXTURES -------------------- */
MySceneGraph.prototype.parseTextures = function (rootElement)
{
	var elems = rootElement.children[4];

	if (elems.nodeName !== "textures")
	{
		return "Error Parsing Fifth Child, not Textures";
	}

	var textureCount = elems.children.length;
	if (textureCount < 1)
	{
		return "Error Parsing Textures, no Textures";
	}

	for (var i = 0; i < textureCount; i++)
	{
		var currentTexture = elems.children[i];

		var id = this.reader.getString(currentTexture, 'id');
		var file = this.reader.getString(currentTexture, 'file');
		var length_s = this.reader.getFloat(currentTexture, 'length_s');
		var length_t = this.reader.getFloat(currentTexture, 'length_t');

		var texture = new Texture(id, file, length_s, length_t);
		var error = this.elements.addTexture(texture);
		if (error != null)
		{
			return error;
		}
	}
	return null;
};

/* -------------------- MATERIALS -------------------- */
MySceneGraph.prototype.parseMaterials = function (rootElement)
{
	var elems = rootElement.children[5];

	if (elems.nodeName !== "materials")
	{
		return "Error Parsing Sixth Child, not Materials";
	}

	var materialCount = elems.children.length;
	if (materialCount < 1)
	{
		return "Error Parsing Materials, no Materials";
	}

	for (var i = 0; i < materialCount; i++)
	{
		var currentMaterial = elems.children[i];

		var id = this.reader.getString(currentMaterial, 'id');

		if (currentMaterial.children.length != 5)
		{
			return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
		}

		// Elems
		var emissionElems = currentMaterial.getElementsByTagName('emission');
		var ambientElems = currentMaterial.getElementsByTagName('ambient');
		var diffuseElems = currentMaterial.getElementsByTagName('diffuse');
		var specularElems = currentMaterial.getElementsByTagName('specular');
		var shininessElems = currentMaterial.getElementsByTagName('shininess');

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
		var emission = new Color((this.reader.getFloat(emissionElems[0], 'r'))
			, (this.reader.getFloat(emissionElems[0], 'g'))
			, (this.reader.getFloat(emissionElems[0], 'b'))
			, (this.reader.getFloat(emissionElems[0], 'a')));

		var ambient = new Color((this.reader.getFloat(ambientElems[0], 'r'))
			, (this.reader.getFloat(ambientElems[0], 'g'))
			, (this.reader.getFloat(ambientElems[0], 'b'))
			, (this.reader.getFloat(ambientElems[0], 'a')));

		var diffuse = new Color((this.reader.getFloat(diffuseElems[0], 'r'))
			, (this.reader.getFloat(diffuseElems[0], 'g'))
			, (this.reader.getFloat(diffuseElems[0], 'b'))
			, (this.reader.getFloat(diffuseElems[0], 'a')));

		var specular = new Color((this.reader.getFloat(specularElems[0], 'r'))
			, (this.reader.getFloat(specularElems[0], 'g'))
			, (this.reader.getFloat(specularElems[0], 'b'))
			, (this.reader.getFloat(specularElems[0], 'a')));

		var shininess = this.reader.getFloat(shininessElems[0], 'value');

		var material = new Material(id, emission, ambient, diffuse, specular, shininess);

		var error = this.elements.addMaterial(material);
		if (error != null)
		{
			return error;
		}
	}
	return null;
};

MySceneGraph.prototype.parseTransformations = function (rootElement)
{
	var elems = rootElement.children[6];

	if (elems.nodeName !== "transformations")
	{
		return "Error Parsing Seventh Child, not Transformations";
	}

	var transformationCount = elems.children.length;
	if (transformationCount < 1)
	{
		return "Error Parsing Transformations, no Transformations";
	}

	for (var i = 0; i < transformationCount; i++)
	{
		var currentTransformation = elems.children[i];

		var id = this.reader.getString(currentTransformation, 'id');

		if (currentTransformation.children.length < 1)
		{
			return "Error Parsing Transformations, Child not size greater than 0.";
		}

		var transformation = new Transformation(id);

		var inner_transformationCount = currentTransformation.children.length;

		for (var j = 0; j < inner_transformationCount; j++)
		{
			var inner_currentTransformation = currentTransformation.children[j];

			var nodeName = inner_currentTransformation.nodeName;

			if ((nodeName === "translate") || (nodeName === "scale"))
			{
				var x = this.reader.getFloat(inner_currentTransformation, 'x');
				var y = this.reader.getFloat(inner_currentTransformation, 'y');
				var z = this.reader.getFloat(inner_currentTransformation, 'z');

				if (nodeName === "translate")
				{
					transformation.addTranslation(x, y, z);
				}
				else
				{
					transformation.addScaling(x, y, z);
				}
			}
			else
			{
				var axis = this.reader.getString(inner_currentTransformation, 'axis');
				var angle = this.reader.getFloat(inner_currentTransformation, 'angle');
				transformation.addRotation(axis, angle);
			}
		}
	}

	var error = this.elements.addTransformation(transformation);
	if (error != null)
	{
		return error;
	}
};

MySceneGraph.prototype.parsePrimitives = function (rootElement)
{
	var elems = rootElement.children[7];

	if (elems.nodeName !== "primitives")
	{
		return "Error Parsing Eighth Child, not Primitives";
	}

	var primitiveCount = elems.children.length;
	if (primitiveCount < 1)
	{
		return "Error Parsing Primitives, no Primitives";
	}

	for (var i = 0; i < primitiveCount; i++)
	{
		var currentPrimitive = elems.children[i];

		var id = this.reader.getString(currentPrimitive, 'id');

		if (currentPrimitive.children.length !== 1)
		{
			return "Error Parsing Primitive, amount of tags found is different from 1";
		}

		var transformation = new Transformation(id);

		var primitive = currentPrimitive.children[0];

		var result;

		if(primitive.nodeName === "rectangle")
		{
			let x1 = this.reader.getFloat(primitive, 'x1');
			let y1 = this.reader.getFloat(primitive, 'y1');

			let x2 = this.reader.getFloat(primitive, 'x2');
			let y2 = this.reader.getFloat(primitive, 'y2');

			let p1 = new CartesianValues2(x1, y1);

			let p2 = new CartesianValues2(x2, y2);

			result = new RectanglePrimitive(id, p1, p2);
		}
		else if(primitive.nodeName === "triangle")
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

			let p1 = new CartesianValues3(x1, y1, z1);

			let p2 = new CartesianValues3(x2, y2, z2);

			let p3 = new CartesianValues3(x3, y3, z3);

			result = new TrianglePrimitive(id, p1, p2, p3);
		}
		else if(primitive.nodeName === "cylinder")
		{
			let base = this.reader.getFloat(primitive, 'base');
			let top = this.reader.getFloat(primitive, 'top');
			let height = this.reader.getFloat(primitive, 'height');

			let slices = this.reader.getInteger(primitive, 'slices');
			let stacks = this.reader.getInteger(primitive, 'stacks');

			result = new CylinderPrimitive(id, base, top, height, slices, stacks);
		}
		else if(primitive.nodeName === "sphere")
		{
			let radius = this.reader.getFloat(primitive, 'radius');

			let slices = this.reader.getInteger(primitive, 'slices');
			let stacks = this.reader.getInteger(primitive, 'stacks');

			result = new SpherePrimitive(id, radius, slices, stacks);
		}
		else if(primitive.nodeName === "torus")
		{
			let inner = this.reader.getFloat(primitive, 'inner');
			let outer = this.reader.getFloat(primitive, 'outer');

			let slices = this.reader.getInteger(primitive, 'slices');
			let loops = this.reader.getInteger(primitive, 'loops');

			result = new TorusPrimitive(id, inner, outer, slices, loops);
		}
		else
		{
			return "Error Parsing Primitive, unknown primitive found."
		}

		var error = this.elements.addPrimitive(result);
		if (error != null)
		{
			return error;
		}
	}
};

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function (message)
{
	console.error("XML Loading Error: " + message);
	this.loadedOk = false;
};


