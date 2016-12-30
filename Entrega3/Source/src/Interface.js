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

	this.options = this.GUI.addFolder("Options");
	this.options.add(this.scene, 'changeScene');
	this.options.add(this.scene.game, 'start');
	this.options.add(this.scene.game, 'newMatch');
	this.options.add(this.scene.game, 'undo');
	let modes = ['player', 'easy', 'hard'];
	this.options.add(this.scene.game, 'player1mode', modes);
	this.options.add(this.scene.game, 'player2mode', modes);
	this.options.add(this.scene.game, 'scoreToWin', 1, 9).step(1);
	this.options.add(this.scene.game, 'timeToPlay');
	this.options.add(this.scene, 'changePerspective');
	this.options.add(this.scene.game, 'showGameSequence');

	this.lights = this.GUI.addFolder("Lights");

	return true;
};

Interface.prototype.resetLights = function()
{
	this.deleteFolder("Lights");
	this.lights = this.GUI.addFolder("Lights");
};

Interface.prototype.deleteFolder = function(name)
{
	let folder = this.GUI.__folders[name];
	if (!folder)
	{
		return;
	}
	folder.close();
	this.GUI.__ul.removeChild(folder.domElement.parentNode);
	delete this.GUI.__folders[name];
	this.GUI.onResize();
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