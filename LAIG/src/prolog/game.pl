:- module(game, [start/0]).

:- use_module(draw).
:- use_module(mechanics).
:- use_module(termination).
:- use_module(ai).
:- use_module(library(random)).

% (-) Devolve um board vazio
initBoard(Board):-
  Board = [
              [0,0,0,0,0],
             [0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
             [0,0,0,0,0,0],
              [0,0,0,0,0]].

%  (-) Inicializa um Game com um board vazio
initGame(Game):-
  Game = game(Board, 1),
  initBoard(Board).

% (+,+,-) Interface com o utilizador para colocar uma peça
placePiece(Color, Board, OutBoard):-
  print('Indicate the X position.\n'),
  read(XPos),
  print('Indicate the Y position.\n'),
  read(YPos),
  placePiece(Color, Board, XPos, YPos, OutBoard),
  !.
% Mensagem de erro da interface acima, volta a tentar
placePiece(Color, Board, OutBoard):-
  print('Not a valid piece place.\n'),
  placePiece(Color, Board, OutBoard).

% Interface inicio de jogo INICIO
start:-
  initGame(Game),
  write('Insira o modo de jogo'),
  %PRESENTATION
  nl,
  write(' 0 - Player vs Player'),
  nl,
  write(' 1 - Player vs BotEasy'),
  nl,
  write(' 2 - Player vs BotHard'),
  nl,
  write(' 3 - BotEasy vs BotEasy'),
  nl,
  write(' 4 - BotEasy vs BotHard'),
  nl,
  write(' 5 - BotHard Vs BotHard'),
  nl,
  %PRESENTATION
  read(Mode),
  start(Game, Mode).

start(Game, 0):-
  play(Game, 0).

start(Game, 1):-
  random(0, 2, FirstPlayer),
  playEasy(Game, FirstPlayer, 0).

start(Game, 2):-
  random(0, 2, FirstPlayer),
  playHard(Game, FirstPlayer, 0).

 start(Game, 3):-
   playEasyAIvAI(Game, 0).

 start(Game, 4):-
   random(0, 2, FirstPlayer),
   playHardvEasy(Game, FirstPlayer, 0).

 start(Game, 5):-
   playHardAIvAI(Game, 0).
   
 start(_, _):-
	write('Invalid game mode'),
	nl,
	start.
   
% PvP

play(game(Board, Color), 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 placePiece(Color, Board, OutBoard),
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 play(NewGame, OutResult).

play(game(Board, Color), 1):-
 printPrettyBoard(Board),
 write('Player '),
 write(Color),
 write( ' wins').

play(game(Board, Color), 2):-
 printPrettyBoard(Board),
 switchPlayer(Color, OutColor),
 write('Player '),
 write(OutColor),
 write( ' wins').

play(game(Board, Color), 3):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 write('Draw.').

% PvBotEasy
 
playEasy(game(Board, Color), 0, 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 placePiece(Color, Board, OutBoard),
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playEasy(NewGame, 1, OutResult).

playEasy(game(Board, Color), 1, 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 easyBotTurn(Board, Color, OutBoard),
 %PRESENTATION
 write('Press any key to continue'),
 nl,
 read(_),
 %PRESENTATION
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playEasy(NewGame, 0, OutResult).

playEasy(game(Board, Color), _, 1):-
 printPrettyBoard(Board),
 write('Player '),
 write(Color),
 write( ' wins').

playEasy(game(Board, Color), _, 2):-
 printPrettyBoard(Board),
 switchPlayer(Color, OutColor),
 write('Player '),
 write(OutColor),
 write( ' wins').

 playEasy(game(Board, Color), _, 3):-
  printPrettyBoard(Board),
  print('Player '), print(Color), print('\'s turn:'), nl,
  write('Draw.').

 % PvBotHard
  
 playHard(game(Board, Color), 0, 0):-
  printPrettyBoard(Board),
  print('Player '), print(Color), print('\'s turn:'), nl,
  placePiece(Color, Board, OutBoard),
  checkTermination(OutBoard, OutResult),
  switchPlayer(Color, OutColor),
  NewGame = game(OutBoard, OutColor),
  playHard(NewGame, 1, OutResult).

 playHard(game(Board, Color), 1, 0):-
  printPrettyBoard(Board),
  print('Player '), print(Color), print('\'s turn:'), nl,
  hardBotTurn(Board, Color, OutBoard),
  %PRESENTATION
  write('Press any key to continue'),
  nl,
  read(_),
  %PRESENTATION
  checkTermination(OutBoard, OutResult),
  switchPlayer(Color, OutColor),
  NewGame = game(OutBoard, OutColor),
  playHard(NewGame, 0, OutResult).

 playHard(game(Board, Color), _, 1):-
  printPrettyBoard(Board),
  write('Player '),
  write(Color),
  write( ' wins').

 playHard(game(Board, Color), _, 2):-
  printPrettyBoard(Board),
  switchPlayer(Color, OutColor),
  write('Player '),
  write(OutColor),
  write( ' wins').

  playHard(_, _, 3):-
   write('Draw.').

% BotEasyvBotEasy

playEasyAIvAI(game(Board, Color), 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 easyBotTurn(Board, Color, OutBoard),
 %PRESENTATION
 write('Press any key to continue'),
 nl,
 read(_),
 %PRESENTATION
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playEasyAIvAI(NewGame, OutResult).

playEasyAIvAI(game(Board, Color), 1):-
 printPrettyBoard(Board),
 write('Player '),
 write(Color),
 write( ' wins').

playEasyAIvAI(game(Board, Color), 2):-
 printPrettyBoard(Board),
 switchPlayer(Color, OutColor),
 write('Player '),
 write(OutColor),
 write( ' wins').

 playHardvEasy(game(Board, _), 3):-
  printPrettyBoard(Board),
  write('Draw.').

% BotHardvBotEasy

playHardvEasy(game(Board, Color), 0, 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 hardBotTurn(Board, Color, OutBoard),
 %PRESENTATION
 write('Press any key to continue'),
 nl,
 read(_),
 %PRESENTATION
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playHardvEasy(NewGame, 1, OutResult).

playHardvEasy(game(Board, Color), 1, 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 easyBotTurn(Board, Color, OutBoard),
 %PRESENTATION
 write('Press any key to continue'),
 nl,
 read(_),
 %PRESENTATION
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playHardvEasy(NewGame, 0, OutResult).

playHardvEasy(game(Board, Color), _, 1):-
 printPrettyBoard(Board),
 write('Player '),
 write(Color),
 write( ' wins').

playHardvEasy(game(Board, Color), _, 2):-
 printPrettyBoard(Board),
 switchPlayer(Color, OutColor),
 write('Player '),
 write(OutColor),
 write( ' wins').

 playHardvEasy(game(Board, _), _, 3):-
  printPrettyBoard(Board),
  write('Draw.').

% BotHardvBotHard

playHardAIvAI(game(Board, Color), 0):-
 printPrettyBoard(Board),
 print('Player '), print(Color), print('\'s turn:'), nl,
 hardBotTurn(Board, Color, OutBoard),
 %PRESENTATION
 write('Press any key to continue'),
 nl,
 read(_),
 %PRESENTATION
 checkTermination(OutBoard, OutResult),
 switchPlayer(Color, OutColor),
 NewGame = game(OutBoard, OutColor),
 playHardAIvAI(NewGame, OutResult).

playHardAIvAI(game(Board, Color), 1):-
 printPrettyBoard(Board),
 write('Player '),
 write(Color),
 write( ' wins').

playHardAIvAI(game(Board, Color), 2):-
 printPrettyBoard(Board),
 switchPlayer(Color, OutColor),
 write('Player '),
 write(OutColor),
 write( ' wins').

 playHardAIvAI(game(Board, _), 3):-
  printPrettyBoard(Board),
  write('Draw.').
