function PrologHandler(game)
{
	this.game = game;
}

PrologHandler.prototype.getPrologRequest = function(requestString, game, onSuccess, onError, port)
{
	let requestPort = port || 8081;
	let request = new XMLHttpRequest();
	request.game = game;
	request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
	request.onerror = onError || function(){console.log("Error waiting for response");};

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
};

PrologHandler.prototype.getRequestEasyBot = function()
{
	let string = "getEasyBotMove(";
	string += this.game.board.toString();
	string += ")";

	this.getPrologRequest(string, this.handleRequestEasyBot)
};

PrologHandler.prototype.handleRequestEasyBot = function(data)
{
	this.game.response = data.target.response;
};
