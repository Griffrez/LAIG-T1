

function Game(scene)
{
	CGFobject.call(this, scene);
	this.whitePlayer = true;
	this.state = 1;
	this.player1mode = 'player';
	this.player2mode = 'player';
	this.scoreToWin = 1;
	this.timeToPlay = 50;
	this.selectedPiece = null;
	this.animation = null;
	this.response = null;
	this.playSequence = new PlaySequence(this);
	window.response = null;
	this.over = false;
	this.matchOver = false;

	this.player1Score = 0;
	this.player2Score = 0;

	this.scoreboard = new Scoreboard(this, scene);
	this.board = new GameBoard(scene);

	this.blackPieceHolder = new PieceHolder(scene, false, 10);
	this.whitePieceHolder = new PieceHolder(scene, true, -10);

	this.timeDone = 0;
}

Game.prototype = Object.create(CGFobject.prototype);

Game.prototype.clickEvent = function(obj)
{
	if(this.animation === null && this.matchOver === false)
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
			this.play(this.selectedPiece, obj);
			this.selectedPiece.setSelected(false);
			this.selectedPiece = null;
		}
	}
};

Game.prototype.State3Handler = function(obj)
{

};

Game.prototype.play = function(piece, tile)
{
	this.placePiece(piece, tile);
	this.playSequence.addPlay(new Play(tile));
	this.checkIfOver();
};

Game.prototype.placePiece = function(piece, tile)
{
	this.animation = piece.move(tile.offset);
	piece.tile = tile;
	tile.piece = piece;
};

Game.prototype.checkIfOver = function()
{
	this.askPrologIfOver();
	this.setState(0);
};

function gameStateHandler(data)
{
	this.game.processGameState(data.target.response);
}

Game.prototype.processGameState = function(data)
{
	let state = parseInt(data);

	switch(state)
	{
		case 0:
			this.setState(1);
			this.whitePlayer = !this.whitePlayer;
			this.timeDone = 0;
			break;
		case 1:
			this.winPlayer(!this.whitePlayer);
			break;
		case 2:
			this.winPlayer(this.whitePlayer);
			break;
		case 3:
			break;
	}
};

Game.prototype.askPrologIfOver = function()
{
	let string = "getGameState(";
	string += this.board.toString();
	string += ")";
	this.getPrologRequest(string, gameStateHandler);
};

Game.prototype.winPlayer = function(bool)
{
	if(bool)
	{
		this.incPlayer1();
	}
	else
	{
		this.incPlayer2();
	}
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
	else
	{
		if(this.matchOver)
		{
			this.playSequence.update();
		}

		if(this.currentPlayerMode() === "player" && !this.matchOver)
		{
			this.timeDone += deltaT;
			if(this.timeDone >= this.timeToPlay)
			{
				this.winPlayer(!this.whitePlayer);
			}
		}

		if(this.currentPlayerMode() !== "player" && this.state !== 0)
		{
			this.setState(3);
		}

		if(this.state === 3)
		{
			this.setState(0);
			this.computerPlay();
		}
	}
};

Game.prototype.currentPlayerMode = function()
{
	if(this.whitePlayer)
	{
		return this.player1mode;
	}
	else
	{
		return this.player2mode;
	}
};

Game.prototype.computerPlay = function()
{
	let mode;
	let string;
	if(this.whitePlayer)
	{
		mode = this.player1mode;
	}
	else
	{
		mode = this.player2mode;
	}
	if(mode === "easy")
	{
		string = this.getEasyMoveString();
	}
	else if(mode === "hard")
	{
		string = this.getHardMoveString();
	}
	this.getPrologRequest(string, handlerBotMove);
};

Game.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
	let requestPort = port || 8081;
	let request = new XMLHttpRequest();
	request.game = this;
	request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
	request.onerror = onError || function(){console.log("Error waiting for response");};

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
};

Game.prototype.getEasyMoveString = function()
{
	let string = "getEasyBotMove(";
	string += this.board.toString();
	string += ")";

	return string;
};

Game.prototype.makeComputerPlay = function(data)
{
	let list = this.parsePosition(data);
	let tile = this.board.tiles[list[1]][list[0]];
	let pieceHolder = this.whitePlayer ? this.whitePieceHolder : this.blackPieceHolder;
	let availablePieces = [];
	for(let piece of pieceHolder.pieces)
	{
		if(piece.tile === null)
		{
			availablePieces.push(piece);
		}
	}
	let rand = Math.floor(Math.random() * availablePieces.length);
	if(rand === availablePieces.length)
	{
		rand = availablePieces.length-1;
	}
	let piece = availablePieces[rand];
	this.play(piece, tile);
};

function handlerBotMove(data)
{
	this.game.makeComputerPlay(data.target.response);
}

Game.prototype.getHardMoveString = function()
{
	let colorNumber;
	if(this.whitePlayer)
	{
		colorNumber = 1;
	}
	else
	{
		colorNumber = 2;
	}
	let string = "getHardBotMove(";
	string += colorNumber;
	string += ",";
	string += this.board.toString();
	string += ")";

	return string;
};

Game.prototype.parsePosition = function(string)
{
	let y = parseInt(string.charAt(3));
	let x = parseInt(string.charAt(1));
	return [x,y];
};

Game.prototype.incPlayer1 = function()
{
	this.player1Score++;
	this.matchOver = true;
	if(this.player1Score >= this.scoreToWin)
	{
		this.over = true;
	}
};

Game.prototype.incPlayer2 = function()
{
	this.player2Score++;
	this.matchOver = true;
	if(this.player2Score >= this.scoreToWin)
	{
		this.over = true;
	}
};

Game.prototype.start = function()
{
	this.over = false;
	this.player1Score = 0;
	this.player2Score = 0;
	this.newMatch();
};

Game.prototype.newMatch = function()
{
	if(!this.over)
	{
		this.matchOver    = false;
		this.playSequence = new PlaySequence(this);
		this.whitePieceHolder.reset();
		this.blackPieceHolder.reset();
		this.setState(1);
		this.whitePlayer = true;
		this.timeDone = 0;
	}
};

Game.prototype.reset = function()
{
	this.whitePieceHolder.reset();
	this.blackPieceHolder.reset();
};

Game.prototype.showGameSequence = function()
{
	if(this.matchOver)
	{
		this.reset();
		this.playSequence.playGameSequence();
	}
};

Game.prototype.undo = function()
{
	if(this.state !== 0 && this.currentPlayerMode() === "player" && this.matchOver === false)
	{
		this.whitePlayer = !this.whitePlayer;
		this.playSequence.undo();
		if(this.currentPlayerMode() !== "player")
		{
			this.whitePlayer = !this.whitePlayer;
			this.playSequence.undo();
		}
		this.timeDone = 0;
	}
};