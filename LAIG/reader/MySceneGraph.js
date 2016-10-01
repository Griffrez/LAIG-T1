
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
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	/*
	this.components = new Components();
	this.materials	= [];
	this.lights		= [];
	*/
	
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

MySceneGraph.prototype.parseDSX = function(rootElement)
{
	// Parse Scene
	if(parseScene(rootElement) == null)
		return "Error Parsing Scene";
};

/*
 * Example of method that parses components of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseScene= function(rootElement)
{
	var elems = rootElement.getElementsByTagName('scene');
	
	// Testing goes here
	
	var root = this.reader.getString(elems[0], 'root');
	var axisLength = this.reader.getFloat(elems[0], 'axis_length');
	
	this.myScene = new MyScene(root,axisLength);
};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message)
{
	console.error("XML Loading Error: " + message);	
	this.loadedOk = false;
};


