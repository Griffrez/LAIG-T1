function Game(scene)
{
	CGFobject.call(this, scene);
	this.whitePlayer = true;
	this.state = 1;
	this.mode = 0;
	this.selectedPiece = null;
	this.animation = null;
	this.playSequence = new PlaySequence(this);

	this.player1Score = 0;
	this.player2Score = 0;

	this.scoreboard = new Scoreboard(this, scene);
	this.board = new GameBoard(scene);

	this.blackPieceHolder = new PieceHolder(scene, false, 10);
	this.whitePieceHolder = new PieceHolder(scene, true, -10);
}

Game.prototype = Object.create(CGFobject.prototype);

Game.prototype.clickEvent = function(obj)
{
	if(this.animation === null)
	{
		let handlers = [this.State0Handler, this.State1Handler, this.State2Handler, this.State3Handler];
		handlers[this.state].call(this, obj);
	}
};

Game.prototype.State0Handler = function(obj)
{

};

Game.prototype.State1Handler = function(obj)
{
	if(obj instanceof Piece && obj.tile === null && obj.isWhite === this.whitePlayer)
	{
		this.selectedPiece = obj;
		obj.setSelected(true);
		this.setState(2);
	}
};

Game.prototype.State2Handler = function(obj)
{
	if(obj instanceof Piece && obj.isWhite === this.whitePlayer)
	{
		if(obj === this.selectedPiece)
		{
			obj.setSelected(false);
			this.selectedPiece = null;
			this.setState(1);
		}
		else if(obj.tile === null)
		{
			this.selectedPiece.setSelected(false);
			this.selectedPiece = obj;
			obj.setSelected(true);
		}
	}
	else if(obj instanceof Tile)
	{
		if(obj.piece === null)
		{
			this.animation = this.selectedPiece.move(obj.offset);
			obj.setPiece(this.selectedPiece);
			this.selectedPiece.tile = obj;
			this.selectedPiece.setSelected(false);
			this.selectedPiece = null;
			this.setState(3);
			this.whitePlayer = !this.whitePlayer;
		}
	}
};

Game.prototype.State3Handler = function(obj)
{

};

Game.prototype.setState = function(state)
{
	if(state !== 2)
	{
		for(let line of this.board.tiles)
		{
			for(let tile of line)
			{
				tile.setSelected(false);
			}
		}
	}

	if(state === 2)
	{
		for(let line of this.board.tiles)
		{
			for(let tile of line)
			{
				if(tile.piece === null)
				{
					tile.setSelected(true);
				}
			}
		}
	}

	this.state = state;
};

Game.prototype.display = function()
{
	this.board.display();
	this.blackPieceHolder.display();
	this.whitePieceHolder.display();
};

Game.prototype.update = function(deltaT)
{
	if(this.animation !== null)
	{
		if(this.animation[1].finished)
		{
			this.animation[0].offset = this.animation[2];
			this.animation = null;
		}
		else
		{
			this.animation[0].offset = this.animation[1].getPosition(deltaT);
		}
	}
	else if(this.state === 3)
	{
		this.computerPlay();
		this.state = 1;
	}
};

Game.prototype.computerPlay = function()
{
	let valid = false;
	let tile;
	let piece;
	while(!valid)
	{
		let rand = Math.floor(Math.random() * 8);
		let columns = this.board.columns[rand];
		let rand2 = Math.floor(Math.random() * (columns-1));
		if(this.board.tiles[rand][rand2].piece === null)
		{
			tile = this.board.tiles[rand][rand2];
			valid = true;
		}
	}

	valid = false;

	while(!valid)
	{
		let rand = Math.floor(Math.random() * 29);
		if(this.blackPieceHolder.pieces[rand].tile === null)
		{
			piece = this.blackPieceHolder.pieces[rand];
			valid = true;
		}
	}

	this.animation = piece.move(tile.offset);
	this.whitePlayer = !this.whitePlayer;
};

Game.prototype.incPlayer1 = function()
{
	this.player1Score++;
};

Game.prototype.incPlayer2 = function()
{
	this.player2Score++;
};