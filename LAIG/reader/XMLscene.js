function setMaterial(appearance, data)
{
	let emission = data.getEmission();
	let ambient = data.getAmbient();
	let diffuse = data.getDiffuse();
	let specular = data.getSpecular();
	let shininess = data.getShininess();

	appearance.setEmission(
		emission.getRed(),
		emission.getGreen(),
		emission.getBlue(),
		emission.getAlpha()
	);

	appearance.setAmbient(
		ambient.getRed(),
		ambient.getGreen(),
		ambient.getBlue(),
		ambient.getAlpha()
	);

	appearance.setDiffuse(
		diffuse.getRed(),
		diffuse.getGreen(),
		diffuse.getBlue(),
		diffuse.getAlpha()
	);

	appearance.setSpecular(
		specular.getRed(),
		specular.getGreen(),
		specular.getBlue(),
		specular.getAlpha()
	);

	appearance.setShininess(shininess);
}

function XMLscene() {
	CGFscene.call(this);
	this.graph = null;
	this.interface = null;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
	CGFscene.prototype.init.call(this, application);

	this.initLights();

	this.enableTextures(true);

	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.initLights = function () {

	//this.lights[0].setPosition(2, 3, 3, 1);
	//this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
	//this.lights[0].setVisible(true);
	//this.lights[0].enable();
	//this.lights[0].update();
};

XMLscene.prototype.setDefaultAppearance = function () {
	this.setAmbient(0.2, 0.4, 0.8, 1.0);
	this.setDiffuse(0.2, 0.4, 0.8, 1.0);
	this.setSpecular(0.2, 0.4, 0.8, 1.0);
	this.setShininess(10.0);
	this.activeTexture = null;
};

XMLscene.prototype.illuminationInit = function ()
{
	var illumination = this.graph.elements.getIllumination();

	var background = illumination.getBackground();
	this.gl.clearColor(
		background.getRed(),
		background.getGreen(),
		background.getBlue(),
		background.getAlpha()
	);

	var ambient = illumination.getAmbient();
	this.setGlobalAmbientLight(
		ambient.getRed(),
		ambient.getGreen(),
		ambient.getBlue(),
		ambient.getAlpha()
	);
};

XMLscene.prototype.perspectivesInit = function ()
{
	var perspectives = this.graph.elements.getPerspectives();

	this.cameras = [];

	this.cameraIndex = 0;

	for(let perspective of perspectives)
	{
		let near = perspective.getNear();

		let far = perspective.getFar();

		let fov = perspective.getAngle();

		var from = perspective.getFrom();

		var to = perspective.getTo();

		let camera = new CGFcamera(fov, near, far, from, to);

		this.cameras.push(camera);
	}

	this.camera = this.cameras[0];
	this.interface.setActiveCamera(this.cameras[0]);
};

XMLscene.prototype.texturesInit = function ()
{
	let texturesData = this.graph.elements.getTextures();

	this.textures = new Map();

	for(let textureData of texturesData)
	{
		let texture = new Texture(this, textureData);

		this.textures.set(textureData.getID(), texture);
	}
};

XMLscene.prototype.lightsInit = function ()
{
	let lightsData = this.graph.elements.getLights();

	this.lights = [];
	this.lightNames = [];

	let index = 0;

	for(let lightData of lightsData)
	{
		let i = index++;

		let id = lightData.getID();

		let light = new CGFlight(this, i);

		let ambient = lightData.getAmbient();
		light.setAmbient(
			ambient.getRed(),
			ambient.getGreen(),
			ambient.getBlue(),
			ambient.getAlpha()
		);

		let diffuse = lightData.getDiffuse();
		light.setDiffuse(
			diffuse.getRed(),
			diffuse.getGreen(),
			diffuse.getBlue(),
			diffuse.getAlpha()
		);

		let specular = lightData.getSpecular();
		light.setSpecular(
			specular.getRed(),
			specular.getGreen(),
			specular.getBlue(),
			specular.getAlpha()
		);

		if(lightData instanceof OmniLight)
		{
			let location = lightData.getLocation();
			light.setPosition(
				location[0],
				location[1],
				location[2],
				location[3]
			);
		}
		else
		{
			let location = lightData.getLocation();
			light.setPosition(
				location[0],
				location[1],
				location[2],
				0.0
			);

			let target = lightData.getTarget();
			let directionSpot = vec3.create();
			vec3.subtract(directionSpot, target, location);
			vec3.normalize(directionSpot, directionSpot);
			light.setSpotDirection(
				directionSpot[0],
				directionSpot[1],
				directionSpot[2]
			);

			let exponent = lightData.getExponent();
			light.setSpotExponent(exponent);

			let angle = lightData.getAngle();
			light.setSpotCutOff(angle);
		}

		light.setConstantAttenuation(0);
		light.setLinearAttenuation(1);
		light.setQuadraticAttenuation(0);

		if(lightData.isEnabled())
		{
			light.enable();
			this[id] = true;
		}
		else
		{
			light.disable();
			this[id] = false;
		}

		this.interface.addLight(id);
		this.lightNames.push(id);

		light.setVisible(true);

		this.lights[i] = light;
		this.lights[i].update();
	}
};

XMLscene.prototype.processComponent = function(id)
{
	let compData = this.graph.elements.getComponent(id);
	let transformation = compData.getTransformation();
	let materials = compData.getMaterials();
	let texture = compData.getTexture();
	if(!((texture === "inherit") || (texture === "none")))
	{
		let textureID = texture.getID();
		texture = this.textures.get(textureID);
	}
	let childComponents = [];
	for(let childData of compData.getChildren().components)
	{
		let childID = childData.getID();
		let child = this.processComponent(childID);
		childComponents.push(child);
	}
	let childPrimitives = compData.getChildren().primitives;
	return new Component(id, transformation, materials, texture, childComponents, childPrimitives);
};

XMLscene.prototype.componentsInit = function ()
{
	let rootID = this.graph.elements.getScene().getRoot();
	this.root = this.processComponent(rootID);
};

XMLscene.prototype.primitivesInit = function()
{
	let texturesData = this.graph.elements.getTextures();

	let texturesLengths = [];

	for(let textureData of texturesData)
	{
		let sLength = textureData.getLengthS();
		let tLength = textureData.getLengthT();
		let i;
		for(i = 0; i < texturesLengths.length; i++)
		{
			if((texturesLengths[i][0] === sLength) &&
				(texturesLengths[i][1] === tLength))
			{
				break;
			}
		}
		if(i === texturesLengths.length)
		{
			texturesLengths.push([sLength, tLength])
		}
	}

	let primitivesData = this.graph.elements.getPrimitives();

	this.primitives = new Map();

	for(let primitiveData of primitivesData)
	{
		if(primitiveData instanceof RectanglePrimitive)
		{
			let lengthsToPrimitive = [];
			for(let textureLength of texturesLengths)
			{
				let sLength = textureLength[0];
				let tLength = textureLength[1];

				let primitive = new MyRectangle(this, primitiveData, sLength, tLength);

				lengthsToPrimitive.push([sLength, tLength, primitive]);
			}
			this.primitives.set(primitiveData.getID(), lengthsToPrimitive);
		}
		else if(primitiveData instanceof TrianglePrimitive)
		{
			let lengthsToPrimitive = [];
			for(let textureLength of texturesLengths)
			{
				let sLength = textureLength[0];
				let tLength = textureLength[1];

				let primitive = new MyTriangle(this, primitiveData, sLength, tLength);

				lengthsToPrimitive.push([sLength, tLength, primitive]);
			}
			this.primitives.set(primitiveData.getID(), lengthsToPrimitive);
		}
		else if(primitiveData instanceof CylinderPrimitive)
		{
			let primitive = new MyCylinder(this, primitiveData);

			this.primitives.set(primitiveData.getID(), primitive);
		}
		else if(primitiveData instanceof SpherePrimitive)
		{
			let primitive = new MySphere(this, primitiveData);

			this.primitives.set(primitiveData.getID(), primitive);
		}
		else if(primitiveData instanceof TorusPrimitive)
		{
			let primitive = new MyTorus(this, primitiveData);

			this.primitives.set(primitiveData.getID(), primitive);
		}
	}
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function ()
{
	this.illuminationInit();
	this.perspectivesInit();
	this.texturesInit();
	this.lightsInit();
	this.componentsInit();
	this.primitivesInit();

	this.materialsIndex = 0;

	this.dataLoaded = true;
};

XMLscene.prototype.display = function () {
	if(!this.dataLoaded)
	{
		return;
	}
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

	let componentStack = [];
	let indexStack = [];
	let materialStack = [];
	let textureStack = [];
	let currentComponent = this.root;
	let index = 0;
	let running = true;
	while(running)
	{
		if(index === 0)
		{
			this.pushMatrix();
			componentStack.push(currentComponent);

			let appearance = new CGFappearance(this);
			let materials = currentComponent.getMaterials();
			let material = materials[(this.materialsIndex)%(materials.length)];
			if((material === "inherit"))
			{
				material = materialStack.pop();
				materialStack.push(material);
			}
			setMaterial(appearance, material);
			let texture = currentComponent.getTexture();
			if((texture === "none"))
			{
				texture = null;
			}
			else if((texture === "inherit"))
			{
				texture = textureStack.pop();
				textureStack.push(texture);
			}
			if(texture !== null)
			{
				appearance.setTexture(texture.texture);
			}
			appearance.apply();

			let matrix = currentComponent.getTransformation().getMatrix();
			this.multMatrix(matrix);
			materialStack.push(material);
			textureStack.push(texture);

			let primitiveChildren = currentComponent.getChildren().primitives;
			let sLength = null;
			let tLength = null;
			if(texture !== null)
			{
				sLength = texture.getData().getLengthS();
				tLength = texture.getData().getLengthT();
			}
			for(let prim of primitiveChildren)
			{
				let primitive = null;
				if((prim instanceof RectanglePrimitive) || (prim instanceof TrianglePrimitive))
				{
					let data = this.primitives.get(prim.getID());

					if(texture === null)
					{
						primitive = data[0][2];
					}
					else
					{
						for (let dataElement of data)
						{
							if ((dataElement[0] === sLength) && (dataElement[1] === tLength))
							{
								primitive = dataElement[2];
							}
						}
					}
				}
				else
				{
					primitive = this.primitives.get(prim.getID());
				}
				primitive.display();
			}
		}

		if(index < currentComponent.getChildren().components.length)
		{
			let childComponent = currentComponent.getChildren().components[index];
			indexStack.push(++index);
			index = 0;
			currentComponent = childComponent;
		}
		else
		{
			componentStack.pop();
			materialStack.pop();
			textureStack.pop();
			this.popMatrix();
			index = indexStack.pop();
			currentComponent = componentStack[componentStack.length - 1];
			if(currentComponent === undefined)
			{
				running = false;
			}
		}
	}

	for(let i = 0; i < this.lights.length; i++)
	{
		let lightBool = this[this.lightNames[i]];

		if(lightBool === true)
		{
			this.lights[i].enable();
		}
		else
		{
			this.lights[i].disable();
		}
		this.lights[i].update();
	}
};

XMLscene.prototype.changeCamera = function()
{
	this.cameraIndex = (this.cameraIndex+1)%(this.cameras.length);

	let camera = this.cameras[this.cameraIndex];

	this.camera = camera;
	this.interface.setActiveCamera(camera);
};

XMLscene.prototype.changeMaterial = function()
{
	this.materialsIndex++;
};

