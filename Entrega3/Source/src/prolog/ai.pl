:- module(ai, [easyBotTurn/3, hardBotTurn/3, bestMove/3, easyBotMove/2]).

:- use_module(mechanics).
:- use_module(list).
:- use_module(library(random)).

% hardBotTurn(+, +, -) Recebe um tabuleiro e uma cor /* numero de jogador e devolve um tabuleiro com a jogada pretendida, em modo dificil. */
hardBotTurn(InBoard, Color, OutBoard):-
  bestMove(InBoard, Color, Play),
  getListElement(Play, 0, XPos),
  getListElement(Play, 1, YPos),
  placePiece(Color, InBoard, XPos, YPos, OutBoard).

% bestMove(+, +, -) Recebe um tabuleiro e uma cor /* numero de jogador e devolve a jogada escolhida entre as jogadas otimas. */
bestMove(InBoard, Player, Play):-
  getValidMoves(InBoard, Moves),
  getBestMove(InBoard, Player, Moves, Play).

% getBestMove(+, +, +, -) Recebe um tabuleiro, uma cor /* numero de jogador e as jogas validas do tabuleiro e devolve jogada escolhida entre as jogadas otimas. */
getBestMove(InBoard, Player, Moves, Play):-
  getBestMoves(InBoard, Player, Moves, Plays),
  length(Plays, Length),
  random(0, Length, PlayNumber),
  getListElement(Plays, PlayNumber, Play).

% getBestMove(+, +, +, -) Recebe um tabuleiro, uma cor /* numero de jogador e as jogas validas do tabuleiro e devolve as jogadas otimas. */
getBestMoves(InBoard, Player, Moves, Plays):-
  getBestMoves(InBoard, Player, Moves, Plays, [], 0).

getBestMoves(_, _, [], Plays, Plays, _).
getBestMoves(InBoard, Player, Moves, OutPlays, Plays, Max):-
  Moves = [Move|T],
  getMoveValue(InBoard, Player, Move, Value),
  getNewPlaysAndMax(Plays, Max, Move, Value, NewPlays, NewMax),
  getBestMoves(InBoard, Player, T, OutPlays, NewPlays, NewMax).

% getMoveValue(+, +, +, -) Recebe um tabuleiro, uma cor /* numero de jogador, uma jogada e devolve o valor dessa jogada. */
getMoveValue(InBoard, Player, Move, Value):-
  valueBoard(InBoard, Player, PlayerV1, EnemyV1),
  getListElement(Move, 0, XPos),
  getListElement(Move, 1, YPos),
  placePiece(Player, InBoard, XPos, YPos, OutBoard),
  valueBoard(OutBoard, Player, PlayerV2, EnemyV2),
  Value is (PlayerV2 - PlayerV1) + (EnemyV1 - EnemyV2)*2.

% getNewPlaysAndMax(+, +, +, +, -, -)
% Recebe uma lista de jogadas otimas atuais e o valor maximo dessas jogadas. Recebe também uma nova jogada e o seu valor.
% Devolve uma lista de jogadas otimas atuais e o maximo novo.
% Se for igual, concatena a lista
% Se for maior, substitui o maximo e mete uma lista com a nova jogada
% Se for menor, nada muda
getNewPlaysAndMax(Plays, Max, Move, Max, NewPlays, Max):-
  MoveList = [Move],
  append(Plays, MoveList, NewPlays).

getNewPlaysAndMax(_, Max, Move, Value, NewPlays, NewMax):-
  Value > Max,
  MoveList = [Move],
  NewPlays = MoveList,
  NewMax = Value.

getNewPlaysAndMax(Plays, Max, _, _, Plays, Max).

% valueBoard(+, +, -, -) Recebe um tabuleiro e uma cor/numero de jogador e devolve a valorização do tabuleiro para o jogador e o oponente.
valueBoard(InBoard, Player, PlayerV, EnemyV):-
  boardToRows(InBoard, Rows),
  valueRows(Rows, Player, PlayerV, EnemyV).

% valueRows(+, +, -, -) Recebe uma lista de linhas de elementos e uma cor/numero de jogador e devolve a valorização dessa lista para o jogador e o oponente.
valueRows([], _, 0, 0).
valueRows(InRows, Player, PlayerV, EnemyV):-
  InRows = [H|T],
  valueRow(H, Player, PlayerV1, EnemyV1),
  valueRows(T, Player, PlayerV2, EnemyV2),
  PlayerV is PlayerV1 + PlayerV2,
  EnemyV is EnemyV1 + EnemyV2.

% valueRows(+, +, -, -) Recebe uma lista de elementos e uma cor/numero de jogador e devolve a valorização dessa lista para o jogador e o oponente.
valueRow(Row, _, PlayerV, EnemyV):-
  length(Row, RowLength),
  RowLength < 4,
  PlayerV = 0,
  EnemyV = 0.

valueRow(Row, Player, PlayerV, EnemyV):-
  getListElement(Row, 0, Element0),
  getListElement(Row, 1, Element1),
  getListElement(Row, 2, Element2),
  getListElement(Row, 3, Element3),
  TestRow = [Element0, Element1, Element2, Element3],
  switchPlayer(Player, OtherPlayer),
  valueRowPlayer(TestRow, Player, PlayerV1),
  valueRowPlayer(TestRow, OtherPlayer, EnemyV1),
  Row = [_|T],
  valueRow(T, Player, PlayerV2, EnemyV2),
  PlayerV is PlayerV1 + PlayerV2,
  EnemyV is EnemyV1 + EnemyV2.

% valueRowPlayer(+, +, -) Recebe uma lista de linhas de elementos e uma cor/numero de jogador e devolve a valorização dessa lista para o jogador.
valueRowPlayer(Row, Player, PlayerV):-
  switchPlayer(Player, OtherPlayer),
  member(OtherPlayer, Row),
  PlayerV = 0.

valueRowPlayer(Row, Player, PlayerV):-
  Row = [Player, Player, Player, Player],
  PlayerV = 1000.

valueRowPlayer(Row, Player, PlayerV):-
  Row = [Player, Player, Player, _],
  PlayerV = -100.

valueRowPlayer(Row, Player, PlayerV):-
  Row = [_, Player, Player, Player],
  PlayerV = -100.

valueRowPlayer(Row, Player, PlayerV):-
  Row = [Player, _, Player, Player],
  PlayerV = 10.

valueRowPlayer(Row, Player, PlayerV):-
  Row = [Player, Player, _, Player],
  PlayerV = 10.

valueRowPlayer(Row, Player, PlayerV):-
  countElement(Row, Player, Out),
  Out is 2,
  PlayerV = 1.

valueRowPlayer(_, _, 0).

% easyBotTurn(+, +, -) Recebe um tabuleiro e uma cor /* numero de jogador e devolve um tabuleiro com a jogada pretendida, em modo fácil. */
easyBotTurn(InBoard, Color, OutBoard):-
  getValidMoves(InBoard, List),
  length(List, Length),
  random(0, Length, Choice),
  getListElement(List, Choice, Element),
  getListElement(Element, 0, XPos),
  getListElement(Element, 1, YPos),
  placePiece(Color, InBoard, XPos, YPos, OutBoard).
  
easyBotMove(InBoard, OutPlay):-
	getValidMoves(InBoard, List),
	length(List, Length),
	random(0, Length, Choice),
	getListElement(List, Choice, OutPlay).