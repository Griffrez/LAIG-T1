Tile.prototype = Object.create(CGFobject.prototype);

function Tile(scene, offset)
{
	CGFobject.call(this, scene);

	this.id = scene.nextID++;

	if(Tile.prototype.hexagon === undefined)
	{
		let hexPrim = new HexagonPrimitive("", 1);
		Tile.prototype.hexagon = new MyHexagon(scene, hexPrim);
	}

	if(Tile.prototype.appearance === undefined)
	{
		let texture = new CGFtexture(scene, "../resources/tile.png");
		let appearance = new CGFappearance(scene);
		appearance.setTexture(texture);
		Tile.prototype.appearance = appearance;
	}

	if(Tile.prototype.selectedAppearance === undefined)
	{
		let texture = new CGFtexture(scene, "../resources/tileSelected.png");
		let appearance = new CGFappearance(scene);
		appearance.setTexture(texture);
		Tile.prototype.selectedAppearance = appearance;
	}

	this.selected = false;
	this.offset = offset;
	this.piece = null;
}

Tile.prototype.setPiece = function(piece)
{
	this.piece = piece;
};

Tile.prototype.clickEvent = function()
{
	this.selected = !this.selected;
};

Tile.prototype.setSelected = function(bool)
{
	this.selected = bool;
};

Tile.prototype.display = function()
{
	if(this.selected)
	{
		Tile.prototype.selectedAppearance.apply();
	}
	this.scene.registerForPick(this.id, this);
	this.scene.pushMatrix();
	this.scene.translate(this.offset[0], this.offset[1], this.offset[2]);
	this.hexagon.display();
	this.scene.popMatrix();
	if(this.selected)
	{
		Tile.prototype.appearance.apply();
	}
};

Tile.prototype.getID = function()
{
	return this.id;
};

