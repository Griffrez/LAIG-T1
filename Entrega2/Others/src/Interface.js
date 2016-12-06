function Interface(scene)
{
	CGFinterface.call(this);
	this.scene = scene;
}

Interface.prototype = Object.create(CGFinterface.prototype);

Interface.prototype.constructor = Interface;

Interface.prototype.init = function(application)
{
	CGFinterface.prototype.init.call(this, application);

	this.GUI    = new dat.GUI();
	this.lights = this.GUI.addFolder("Lights");
	this.lights.open();

	return true;
};

Interface.prototype.addLight = function(lightId)
{
	this.lights.add(this.scene, lightId);
};

Interface.prototype.processKeyDown = function(event)
{
	switch (event.keyCode)
	{
		case (118):
		case (86):
			this.scene.changeCamera();
			break;
		case (109):
		case (77):
			this.scene.changeMaterial();
			break;
	}
};