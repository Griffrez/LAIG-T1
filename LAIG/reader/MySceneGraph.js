
function MySceneGraph(filename, scene)
{
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
};

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	this.myScene;
	this.myIllumination;
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
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

/* -------------------- PARSE DSX -------------------- */

MySceneGraph.prototype.parseDSX = function(rootElement)
{
	var result;
	
	// Parse Scene TO TEST
	result = parseScene(rootElement);
	if(result != null)
		return result;
	
	// Parse View TO TEST
	result = parseView(rootElement);
	if(result != null)
		return result;
	
	// Parse Illumination TO TEST
	result = parseIllumination(rootElement);
	if(result != null)
		return result;
	
	// Parse Lights TO TEST
	result = parseLights(rootElement);
	if(result != null)
		return result;
	
	// Parse Textures TO TEST
	result = parseTextures(rootElement);
	if(result != null)
		return result;

	// Parse Materials TODO
	result = parseMaterials(rootElement);
	if(result != null)
		return result;
	
	// Parse Transformations TODO
	result = parseTransformations(rootElement);
	if(result != null)
		return result;
	
	// Parse Primitives TODO
	result = parsePrimitives(rootElement);
	if(result != null)
		return result;
	
	// Parse Components TODO
	result = parseComponents(rootElement);
	if(result != null)
		return result;
	
	// All is good
	return null;
};

/* -------------------- PARSE FUNCTIONS -------------------- */

/* -------------------- SCENE -------------------- */
MySceneGraph.prototype.parseScene = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('scene');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Scene, not Unique"
	
	var root = this.reader.getString(elems[0], 'root');
	var axisLength = this.reader.getFloat(elems[0], 'axis_length');
	
	// Test for negative axis values here
	// If something goes bad return "Error Parsing Scene, not positive axis"
	
	this.myScene = new MyScene(root,axisLength);
	
	return null;
};

/* -------------------- VIEW -------------------- */
MySceneGraph.prototype.parseView = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('views');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Views, not Unique"
	
	var viewElems = elems[0];
	
	var defaultView = this.reader.getString(viewElems, 'default');
	
	var perspectiveCount = viewElems.children.length;
	if(perspectiveCount < 1)
		return "Error Parsing Views, no Perspectives";
	
	// Parse Perspectives
	for(var i = 0; i < perspectiveCount; i++)
	{
		var currentPerspective = viewElems.children[i];
		
		if(currentPerspective.nodeName != 'perspective');
			return "Error Parsing Views, not a Perspective";
			
		var id = this.reader.getString(currentPerspective, 'id');
		var near = this.reader.getString(currentPerspective, 'near');
		var far = this.reader.getFloat(currentPerspective, 'far');
		var angle = this.reader.getFloat(currentPerspective, 'angle');
		
		if(usedIDs.contains(id))
			return "Error Parsing Views, Perspective ID is not unique";
		
		// To and From
		
		if(currentPerspective.children.length != 2)
			return "Error Parsing Views, Perspective Child not size 2 (to, from)";
		
		var fromElems = currentPerspective.getElementsByTagName('from');
		var toElems = currentPerspective.getElementsByTagName('to');
		
		// Uniqueness Testing goes here
		// If something goes bad return "Error Parsing Views, from/to not Unique"
		
		var from = new CartesianValues3((this.reader.getFloat(fromElems, 'x'))
				,(this.reader.getFloat(fromElems, 'y'))
				, (this.reader.getFloat(fromElems, 'z')));
		
		var to = new CartesianValues3((this.reader.getFloat(toElems, 'x'))
				, (this.reader.getFloat(toElems, 'y'))
				, (this.reader.getFloat(toElems, 'z')));
		
		// Add perspective
		
		var perspective = new Perspective(id, near, far, angle, from, to);
		var error = this.elements.addPerspective(perspective);
		if(error != null)
			return error;
	}
	
	// Test for default perspective goes here
	
	return null;
};

/* -------------------- ILLUMINATION -------------------- */
MySceneGraph.prototype.parseIllumination = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('illumination');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Illumination, not Unique"
	
	var illuminationElems = elems[0];
	
	var illuminationCount = illuminationElems.children.length;
	if(illuminationCount != 2)
		return "Error Parsing Illumination, Illumination child not size 2 (ambient,background)";
	
	var doublesided = this.reader.getString(viewElems, 'doublesided');
	var local = this.reader.getString(viewElems, 'local');
	
	var ambientElems = currentPerspective.getElementsByTagName('ambient');
	var backgroundElems = currentPerspective.getElementsByTagName('background');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Views, ambient/background not Unique"
	
	var ambientColor = new Color((this.reader.getFloat(ambientElems, 'r'))
			, (this.reader.getFloat(ambientElems, 'g'))
			, (this.reader.getFloat(ambientElems, 'b'))
			, (this.reader.getFloat(ambientElems, 'a')));
	
	var backgroundColor = new Color((this.reader.getFloat(backgroundElems, 'r'))
			, (this.reader.getFloat(backgroundElems, 'g'))
			, (this.reader.getFloat(backgroundElems, 'b'))
			, (this.reader.getFloat(backgroundElems, 'a')));
	
	myIllumination = new Illumination (doublesided, local, ambientColor, backgroundColor);
	
	return null;
};

/* -------------------- LIGHTS -------------------- */
MySceneGraph.prototype.parseLights = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('lights');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Lights, not Unique"
	
	var lightElems = elems[0];
	
	var lightCount = lightElems.children.length;
	if(lightCount < 1)
		return "Error Parsing Lights, no Lights";
	
	for(var i = 0; i < lightCount; i++)
	{
		var currentLight = lightElems.children[i];
		
		var isSpot = (currentLight.nodeName == 'spot');
		
		// Control
		var id = this.reader.getString(currentLight, 'id');
		var enabled = this.reader.getBoolean(currentLight, 'enabled');
		
		if(isSpot)
		{
			// Control
			var angle = this.reader.getFloat(currentLight, 'angle');
			var exponent = this.reader.getFloat(currentLight, 'exponent');
			
			if(currentLight.children.length != 5)
				return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
			
			// Elems
			var locationElems = currentLight.getElementsByTagName('location');
			var targetElems = currentLight.getElementsByTagName('target');
			var ambientElems = currentLight.getElementsByTagName('ambient');
			var diffuseElems = currentLight.getElementsByTagName('diffuse');
			var specularElems = currentLight.getElementsByTagName('specular');
			
			// Uniqueness Test here
			
			// Cartesian Value 3
			var location = new CartesianValues3((this.reader.getFloat(locationElems, 'x'))
					,(this.reader.getFloat(fromElems, 'y'))
					, (this.reader.getFloat(fromElems, 'z')));
					
			var target = new CartesianValues3((this.reader.getFloat(targetElems, 'x'))
					,(this.reader.getFloat(fromElems, 'y'))
					, (this.reader.getFloat(fromElems, 'z')));
			
			// Colors
			var ambient =  new Color((this.reader.getFloat(ambientElems, 'r'))
					, (this.reader.getFloat(ambientElems, 'g'))
					, (this.reader.getFloat(ambientElems, 'b'))
					, (this.reader.getFloat(ambientElems, 'a')));
			
			var diffuse =  new Color((this.reader.getFloat(diffuseElems, 'r'))
					, (this.reader.getFloat(diffuseElems, 'g'))
					, (this.reader.getFloat(diffuseElems, 'b'))
					, (this.reader.getFloat(diffuseElems, 'a')));
			
			var specular =  new Color((this.reader.getFloat(specularElems, 'r'))
					, (this.reader.getFloat(specularElems, 'g'))
					, (this.reader.getFloat(specularElems, 'b'))
					, (this.reader.getFloat(specularElems, 'a')));
			
			var spotLight = new SpotLight(id, enabled, location, ambient, diffuse, specular, angle, exponent, target);
			
			var error = myElements.addLight(spotLight);
			if(error != null)
				return error;
		}
		else
		{			
			if(currentLight.children.length != 4)
				return "Error Parsing Lights, Omni Child not size 4 (location, ambient, diffuse, specular)";
			
			// Elems
			var locationElems = currentLight.getElementsByTagName('location');
			var ambientElems = currentLight.getElementsByTagName('ambient');
			var diffuseElems = currentLight.getElementsByTagName('diffuse');
			var specularElems = currentLight.getElementsByTagName('specular');
			
			// Uniqueness Test here
			
			// Cartesian Value 4
			var location = new CartesianValues4((this.reader.getFloat(locationElems, 'x'))
					,(this.reader.getFloat(fromElems, 'y'))
					, (this.reader.getFloat(fromElems, 'z'))
					, (this.reader.getFloat(fromElems, 'w')));
			
			// Colors
			var ambient =  new Color((this.reader.getFloat(ambientElems, 'r'))
					, (this.reader.getFloat(ambientElems, 'g'))
					, (this.reader.getFloat(ambientElems, 'b'))
					, (this.reader.getFloat(ambientElems, 'a')));
			
			var diffuse =  new Color((this.reader.getFloat(diffuseElems, 'r'))
					, (this.reader.getFloat(diffuseElems, 'g'))
					, (this.reader.getFloat(diffuseElems, 'b'))
					, (this.reader.getFloat(diffuseElems, 'a')));
			
			var specular =  new Color((this.reader.getFloat(specularElems, 'r'))
					, (this.reader.getFloat(specularElems, 'g'))
					, (this.reader.getFloat(specularElems, 'b'))
					, (this.reader.getFloat(specularElems, 'a')));
			
			var omniLight = new OmniLight(id, enabled, location, ambient, diffuse, specular);
			
			var error = myElements.addLight(omniLight);
			if(error != null)
				return error;
		}
	}
	return null;
};

/* -------------------- TEXTURES -------------------- */
MySceneGraph.prototype.parseTextures = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('textures');
	
	// Uniqueness Testing goes here
	// If something goes bad return "Error Parsing Lights, not Unique"
	
	var textureElems = elems[0];
	
	var textureCount = lightElems.children.length;
	if(textureCount < 1)
		return "Error Parsing Textures, no Textures";
	
	for(var i = 0; i < textureCount; i++)
	{
		var currentTexture = textureElems.children[i];
		
		var id = this.reader.getString(currentTexture, 'id');
		var file = this.reader.getString(currentTexture, 'file');
		var length_s = this.reader.getFloat(currentTexture, 'length_s');
		var length_t = this.reader.getFloat(currentTexture, 'length_t');
		
		var texture = new Texture(id, file, length_s, length_t);
		var error = this.elements.addTexture(texture);
		if(error != null)
			return error;
	}
	return null;
};


/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError = function (message)
{
	console.error("XML Loading Error: " + message);	
	this.loadedOk = false;
};


