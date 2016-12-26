function GameBoard(scene)
{
	CGFobject.call(this, scene);

	this.tiles = [];
	for(let i = 0; i < 9; i++)
	{
		let tilesInner = [];
		for(let j = 0; j < this.columns[i]; j++)
		{
			let offset = this.getSpaceOffset(i, j);
			tilesInner.push(new Tile(scene, offset));
		}
		this.tiles.push(tilesInner);
	}
}

GameBoard.prototype = Object.create(CGFobject.prototype);

GameBoard.prototype.columns = [5,6,7,8,9,8,7,6,5];

GameBoard.prototype.getSpaceOffset = function(line, column)
{
	let x = (1-this.columns[line]+column*2)*Math.sqrt(3)/2;
	let y = (4-line)*1.5;
	return [x, y, 0];
};

GameBoard.prototype.setSelected = function(list)
{
	for(let [line, column] of list)
	{
		this.tiles[line][column].setSelected(true);
	}
};

GameBoard.prototype.deselectAll = function()
{
	for(let line of this.tiles)
	{
		for(let column of line)
		{
			column.setSelected(false);
		}
	}
};

GameBoard.prototype.display = function()
{
	Tile.prototype.appearance.apply();
	for(let i = 0; i < 9; i++)
	{
		for(let j = 0; j < this.columns[i]; j++)
		{
			let tile = this.tiles[i][j];
			this.scene.registerForPick(tile.getID(), tile);
			tile.display();
		}
	}
};