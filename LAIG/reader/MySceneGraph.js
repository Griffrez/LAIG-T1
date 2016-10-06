
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
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady  = function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	this.myScene = null;
	this.myIllumination = null;
	this.defaultView = null;
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
	result = this.parseScene(rootElement);
	if(result != null)
		return result;
	
	// Parse View TO TEST
	result = this.parseView(rootElement);
	if(result != null)
		return result;
	
	// Parse Illumination TO TEST
	result = this.parseIllumination(rootElement);
	if(result != null)
		return result;
	
	// Parse Lights TO TEST
	result = this.parseLights(rootElement);
	if(result != null)
		return result;
	
	// Parse Textures TO TEST
	result = this.parseTextures(rootElement);
	if(result != null)
		return result;

	// Parse Materials TO TEST
	result = this.parseMaterials(rootElement);
	if(result != null)
		return result;
	
	// Parse Transformations TODO
	result = this.parseTransformations(rootElement);
	if(result != null)
		return result;
	
	// Parse Primitives TODO
	result = this.parsePrimitives(rootElement);
	if(result != null)
		return result;
	
	// Parse Components TODO
	result = this.parseComponents(rootElement);
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
	
	if(elems.length != 1)
		return "Error Parsing Scene, not Unique";
	
	var root = this.reader.getString(elems[0], 'root');
	var axisLength = this.reader.getFloat(elems[0], 'axis_length');
	
	if(axisLength < 0)
		return "Error Parsing Scene, not positive axis";
	
	this.myScene = new MyScene(root,axisLength);
	
	return null;
};

/* -------------------- VIEW -------------------- */
MySceneGraph.prototype.parseView = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('views');
	
	if(elems.length != 1)
		return "Error Parsing View, not Unique";
	
	var viewElems = elems[0];
	
	this.defaultView = this.reader.getString(viewElems, 'default');
	
	var perspectiveCount = viewElems.children.length;
	if(perspectiveCount < 1)
		return "Error Parsing Views, no Perspectives";
	
	// Parse Perspectives
	for(var i = 0; i < perspectiveCount; i++)
	{
		var currentPerspective = viewElems.children[i];
		
		if(currentPerspective.nodeName != 'perspective')
			return "Error Parsing Views, not a Perspective";
			
		var id = this.reader.getString(currentPerspective, 'id');
		var near = this.reader.getString(currentPerspective, 'near');
		var far = this.reader.getFloat(currentPerspective, 'far');
		var angle = this.reader.getFloat(currentPerspective, 'angle');
		
		// To and From
		
		if(currentPerspective.children.length != 2)
			return "Error Parsing Views, Perspective Child not size 2 (to, from)";
		
		var fromElems = currentPerspective.getElementsByTagName('from');
		var toElems = currentPerspective.getElementsByTagName('to');
		
		// Uniqueness Test
		if(fromElems.length != 1)
			return "Error Parsing Views, from not Unique";
			
		if(toElems.length != 1)
			return "Error Parsing Views, to not Unique";
		
		var from = new CartesianValues3((this.reader.getFloat(fromElems[0], 'x'))
				,(this.reader.getFloat(fromElems[0], 'y'))
				, (this.reader.getFloat(fromElems[0], 'z')));
		
		var to = new CartesianValues3((this.reader.getFloat(toElems[0], 'x'))
				, (this.reader.getFloat(toElems[0], 'y'))
				, (this.reader.getFloat(toElems[0], 'z')));
		
		// Add perspective
		
		var perspective = new Perspective(id, near, far, angle, from, to);
		var error = this.elements.addPerspective(perspective);
		if(error != null)
			return error;
	}
	
	// Test for default perspective goes here
	if(this.elements.getPerspective(this.defaultView) === undefined)
	{
		return "Error Parsing Views, no default perspective";
	}
	
	return null;
};

/* -------------------- ILLUMINATION -------------------- */
MySceneGraph.prototype.parseIllumination = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('illumination');
	
	if(elems.length != 1)
		return "Error Parsing Illumination, not Unique";
	
	var illuminationElems = elems[0];
	
	var illuminationCount = illuminationElems.children.length;
	if(illuminationCount != 2)
		return "Error Parsing Illumination, Illumination child not size 2 (ambient,background)";
	
	var doublesided = this.reader.getString(illuminationElems, 'doublesided');
	var local = this.reader.getString(illuminationElems, 'local');
	
	var ambientElems = illuminationElems.getElementsByTagName('ambient');
	var backgroundElems = illuminationElems.getElementsByTagName('background');
	
	// Uniqueness Test
	if(ambientElems.length != 1)
		return "Error Parsing Illumination, ambient not Unique";
		
	if(backgroundElems.length != 1)
		return "Error Parsing Illumination, background not Unique";
	
	var ambientColor = new Color((this.reader.getFloat(ambientElems[0], 'r'))
			, (this.reader.getFloat(ambientElems[0], 'g'))
			, (this.reader.getFloat(ambientElems[0], 'b'))
			, (this.reader.getFloat(ambientElems[0], 'a')));
	
	var backgroundColor = new Color((this.reader.getFloat(backgroundElems[0], 'r'))
			, (this.reader.getFloat(backgroundElems[0], 'g'))
			, (this.reader.getFloat(backgroundElems[0], 'b'))
			, (this.reader.getFloat(backgroundElems[0], 'a')));
	
	this.myIllumination = new Illumination (doublesided, local, ambientColor, backgroundColor);
	
	return null;
};

/* -------------------- LIGHTS -------------------- */
MySceneGraph.prototype.parseLights = function(rootElement)
{
	var elems = rootElement.getElementsByTagName('lights');
	
	if(elems.length != 1)
		return "Error Parsing Lights, not Unique";
	
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

		// Variables
		var locationElems = currentLight.getElementsByTagName('location');
		var ambientElems = currentLight.getElementsByTagName('ambient');
		var diffuseElems = currentLight.getElementsByTagName('diffuse');
		var specularElems = currentLight.getElementsByTagName('specular');

        var location = null;
        var ambient = null;
        var diffuse = null;
        var specular = null;

		if(isSpot)
		{
			// Control
			var angle = this.reader.getFloat(currentLight, 'angle');
			var exponent = this.reader.getFloat(currentLight, 'exponent');
			
			if(currentLight.children.length != 5)
				return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
			
			// Elems
			var targetElems = currentLight.getElementsByTagName('target');
			
			// Uniqueness Test
			if(locationElems.length != 1)
				return "Error Parsing Lights, location not Unique";
				
			if(targetElems.length != 1)
				return "Error Parsing Lights, target not Unique";
			
			if(ambientElems.length != 1)
				return "Error Parsing Lights, ambient not Unique";
			
			if(diffuseElems.length != 1)
				return "Error Parsing Lights, diffuse not Unique";
			
			if(specularElems.length != 1)
				return "Error Parsing Lights, specular not Unique";
			
			// Cartesian Value 3
			location = new CartesianValues3((this.reader.getFloat(locationElems[0], 'x'))
					,(this.reader.getFloat(locationElems[0], 'y'))
					, (this.reader.getFloat(locationElems[0], 'z')));
					
			var target = new CartesianValues3((this.reader.getFloat(targetElems[0], 'x'))
					,(this.reader.getFloat(targetElems[0], 'y'))
					, (this.reader.getFloat(targetElems[0], 'z')));
			
			// Colors
			ambient =  new Color((this.reader.getFloat(ambientElems[0], 'r'))
					, (this.reader.getFloat(ambientElems[0], 'g'))
					, (this.reader.getFloat(ambientElems[0], 'b'))
					, (this.reader.getFloat(ambientElems[0], 'a')));
			
			diffuse =  new Color((this.reader.getFloat(diffuseElems[0], 'r'))
					, (this.reader.getFloat(diffuseElems[0], 'g'))
					, (this.reader.getFloat(diffuseElems[0], 'b'))
					, (this.reader.getFloat(diffuseElems[0], 'a')));
			
			specular =  new Color((this.reader.getFloat(specularElems[0], 'r'))
					, (this.reader.getFloat(specularElems[0], 'g'))
					, (this.reader.getFloat(specularElems[0], 'b'))
					, (this.reader.getFloat(specularElems[0], 'a')));
			
			var spotLight = new SpotLight(id, enabled, location, ambient, diffuse, specular, angle, exponent, target);
			
			var error = this.elements.addLight(spotLight);
			if(error != null)
				return error;
		}
		else
		{			
			if(currentLight.children.length != 4)
				return "Error Parsing Lights, Omni Child not size 4 (location, ambient, diffuse, specular)";
			
			// Uniqueness Test
			if(locationElems.length != 1)
				return "Error Parsing Lights, location not Unique";
					
			if(ambientElems.length != 1)
				return "Error Parsing Lights, ambient not Unique";
			
			if(diffuseElems.length != 1)
				return "Error Parsing Lights, diffuse not Unique";
			
			if(specularElems.length != 1)
				return "Error Parsing Lights, specular not Unique";
			
			// Cartesian Value 4
			location = new CartesianValues4((this.reader.getFloat(locationElems[0], 'x'))
					,(this.reader.getFloat(locationElems[0], 'y'))
					, (this.reader.getFloat(locationElems[0], 'z'))
					, (this.reader.getFloat(locationElems[0], 'w')));
			
			// Colors
			ambient =  new Color((this.reader.getFloat(ambientElems[0], 'r'))
					, (this.reader.getFloat(ambientElems[0], 'g'))
					, (this.reader.getFloat(ambientElems[0], 'b'))
					, (this.reader.getFloat(ambientElems[0], 'a')));
			
			diffuse =  new Color((this.reader.getFloat(diffuseElems[0], 'r'))
					, (this.reader.getFloat(diffuseElems[0], 'g'))
					, (this.reader.getFloat(diffuseElems[0], 'b'))
					, (this.reader.getFloat(diffuseElems[0], 'a')));
			
			specular =  new Color((this.reader.getFloat(specularElems[0], 'r'))
					, (this.reader.getFloat(specularElems[0], 'g'))
					, (this.reader.getFloat(specularElems[0], 'b'))
					, (this.reader.getFloat(specularElems[0], 'a')));
			
			var omniLight = new OmniLight(id, enabled, location, ambient, diffuse, specular);
			
			error = this.elements.addLight(omniLight);
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
	
	if(elems.length != 1)
		return "Error Parsing Textures, not Unique";
	
	var textureElems = elems[0];
	
	var textureCount = textureElems.children.length;
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

/* -------------------- MATERIALS -------------------- */
MySceneGraph.prototype.parseMaterials = function(rootElement)
{
	var elems = rootElement.get
	
	if(elems.length != 1)
		return "Error Parsing Materials, not Unique";
	
	var materialElems = elems[0];
	
	var materialCount = materialElems.children.length;
	if(materialCount < 1)
		return "Error Parsing Materials, no Materials";
	
	for(var i = 0; i < materialCount; i++)
	{
		var currentMaterial = materialElems.children[i];
		
		var id = this.reader.getString(currentMaterial, 'id');	
		var shininess = this.reader.getFloat(currentMaterial, 'shininess');
		
		if(currentMaterial.children.length != 5)
			return "Error Parsing Lights, Spot Child not size 5 (location, target, ambient, diffuse, specular)";
		
		// Elems
		var emissionElems = currentMaterial.getElementsByTagName('emission');
		var ambientElems = currentMaterial.getElementsByTagName('ambient');
		var diffuseElems = currentMaterial.getElementsByTagName('diffuse');
		var specularElems = currentMaterial.getElementsByTagName('specular');
		
		// Uniqueness Test
		if(emissionElems.length != 1)
			return "Error Parsing Materials, emission not Unique";
				
		if(ambientElems.length != 1)
            return "Error Parsing Materials, ambient not Unique";
		
		if(diffuseElems.length != 1)
            return "Error Parsing Materials, diffuse not Unique";
		
		if(specularElems.length != 1)
            return "Error Parsing Materials, specular not Unique";
		
		// Colors
		var emission =  new Color((this.reader.getFloat(emissionElems[0], 'r'))
				, (this.reader.getFloat(emissionElems[0], 'g'))
				, (this.reader.getFloat(emissionElems[0], 'b'))
				, (this.reader.getFloat(emissionElems[0], 'a')));
		
		var ambient =  new Color((this.reader.getFloat(ambientElems[0], 'r'))
				, (this.reader.getFloat(ambientElems[0], 'g'))
				, (this.reader.getFloat(ambientElems[0], 'b'))
				, (this.reader.getFloat(ambientElems[0], 'a')));
		
		var diffuse =  new Color((this.reader.getFloat(diffuseElems[0], 'r'))
				, (this.reader.getFloat(diffuseElems[0], 'g'))
				, (this.reader.getFloat(diffuseElems[0], 'b'))
				, (this.reader.getFloat(diffuseElems[0], 'a')));
		
		var specular =  new Color((this.reader.getFloat(specularElems[0], 'r'))
				, (this.reader.getFloat(specularElems[0], 'g'))
				, (this.reader.getFloat(specularElems[0], 'b'))
				, (this.reader.getFloat(specularElems[0], 'a')));
		
		var material = new Material(id, emission, ambient, diffuse, specular, shininess);
		
		var error = this.elements.addMaterial(material);
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


