Piece.prototype = Object.create(CGFobject.prototype);

function Piece(scene, isWhite, offset)
{
	CGFobject.call(this, scene);

	this.id = scene.nextID++;
	this.selected = false;
	this.isWhite = isWhite;

	if(Piece.prototype.cylinder === undefined)
	{
		let cylPrim = new CylinderPrimitive("", 0.5, 0.5, 0.2, 10, 10);
		Piece.prototype.cylinder = new MyCylinder(scene, cylPrim);
	}

	if(Piece.prototype.whiteAppearance === undefined || Piece.prototype.blackAppearance === undefined || Piece.prototype.selectedAppearance)
	{
		let texture = new CGFtexture(scene, "../resources/piece_white.png");
		let whiteAppearance = new CGFappearance(scene);
		whiteAppearance.setDiffuse(0.7, 0.7, 0.7, 1.0);
		whiteAppearance.setTexture(texture);
		Piece.prototype.whiteAppearance = whiteAppearance;
	}

	if(Piece.prototype.blackAppearance === undefined)
	{
		let texture = new CGFtexture(scene, "../resources/piece_black.png");
		let blackAppearance = new CGFappearance(scene);
		blackAppearance.setDiffuse(0.15, 0.15, 0.15, 1.0);
		blackAppearance.setTexture(texture);
		Piece.prototype.blackAppearance = blackAppearance;
	}

	if(Piece.prototype.selectedAppearance === undefined)
	{
		let texture = new CGFtexture(scene, "../resources/piece_red.png");
		let selectedAppearance = new CGFappearance(scene);
		selectedAppearance.setDiffuse(0.9, 0.05, 0.05, 1.0);
		selectedAppearance.setTexture(texture);
		Piece.prototype.selectedAppearance = selectedAppearance;
	}

	if(isWhite)
	{
		this.appearance = Piece.prototype.whiteAppearance;
	}
	else
	{
		this.appearance = Piece.prototype.blackAppearance;
	}
	this.offset = offset;
	this.originalOffset = offset;
	this.tile = null;
}

Piece.prototype.display = function()
{
	this.appearance.apply();
	this.scene.registerForPick(this.id, this);
	this.scene.pushMatrix();
	this.scene.translate(this.offset[0], this.offset[1], this.offset[2]);
	this.cylinder.display();
	this.scene.popMatrix();
};

Piece.prototype.setSelected = function(bool)
{
	this.selected = bool;
	if(this.selected)
	{
		this.appearance = Piece.prototype.selectedAppearance;
	}
	else
	{
		if(this.isWhite)
		{
			this.appearance = Piece.prototype.whiteAppearance;
		}
		else
		{
			this.appearance = Piece.prototype.blackAppearance;
		}
	}
};

Piece.prototype.clickEvent = function()
{
	this.selected = !this.selected;
	if(this.selected)
	{
		this.appearance = Piece.prototype.selectedAppearance;
	}
	else
	{
		if(this.isWhite)
		{
			this.appearance = Piece.prototype.whiteAppearance;
		}
		else
		{
			this.appearance = Piece.prototype.blackAppearance;
		}
	}
};

Piece.prototype.move = function(newOffset)
{
	let animationData = new EllipticAnimationData("", 0.25, this.offset, newOffset);
	let animation = new EllipticAnimation(animationData);
	return [this, animation, newOffset];
};

Piece.prototype.getID = function()
{
	return this.id;
};
