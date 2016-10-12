
function XMLscene() {
    CGFscene.call(this);
	/*MySceneGraph*/this.graph = null;
	/*CGFinterface*/this.interface = null;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

XMLscene.prototype.illuminationInit = function()
{
	var illumination = this.graph.elements.getIllumination();

	var ambient = illumination.getAmbient();
	this.setGlobalAmbientLight(
		ambient.getRed(),
		ambient.getGreen(),
		ambient.getBlue(),
		ambient.getAlpha()
	);

	var background = illumination.getBackground();
	this.gl.clearColor(
		background.getRed(),
		background.getGreen(),
		background.getBlue(),
		background.getAlpha()
	);
};

XMLscene.prototype.perspectivesInit = function()
{
	var perspectives = this.graph.elements.getPerspectives();

	this.cameras = [];

	for(let perspective of perspectives)
	{
		var fov = perspective.getAngle();
		var near = perspective.getNear();
		var far = perspective.getFar();
		var position = perspective.getFrom();
		var target = perspective.getTo();

		var camera = new CGFlight(fov, near, far, position, target);

		this.cameras.push(camera);
	}

	this.interface.setActiveCamera(this.cameras[0]);
};

XMLscene.prototype.lightsInit = function()
{

};

XMLscene.prototype.textureInit = function()
{

};

XMLscene.prototype.materialsInit = function()
{

};

XMLscene.prototype.transformationsInit = function()
{

};

XMLscene.prototype.primitivesInit = function()
{

};

XMLscene.prototype.componentsInit = function()
{

};

XMLscene.prototype.sceneInit = function()
{

};


// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.illuminationInit();
	this.perspectivesInit();
	this.lightsInit();
	this.textureInit();
	this.materialsInit();
	this.transformationsInit();
	this.primitivesInit();
	this.componentsInit();
	this.sceneInit();
	this.lights[0].setVisible(true);
	this.lights[0].enable();
};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		this.lights[0].update();
	}
};

