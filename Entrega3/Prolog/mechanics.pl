:- module(mechanics, [placePiece/5, getValidMoves/2, boardToRows/2, switchPlayer/2]).

:- use_module(library(lists)).
:- use_module(list).
:- use_module(hexagon).

% (+) Validação da cor
validateColor(1).
validateColor(2).

% (+, -) Devolve o oponente
switchPlayer(1,2).
switchPlayer(2,1).

% (+, -) Retorna a length de uma linha com um certo indice Y
lineLength(YPos, LineLength):-
  LineLength is 9 - abs(YPos - 4).

% (+) Validação da posição Y
validateYPos(YPos):-
  YPos >= 0,
  YPos =< 8.

% (+, +) Validação da posição X
validateXPos(XPos, YPos):-
  lineLength(YPos, LineLength),
  MaxIndex is LineLength - 1,
  XPos >= 0,
  XPos =< MaxIndex.

% (+, +, +) Verifica se a célula está vazia
validatePosition(InBoard, XPos, YPos):-
  nth0(YPos, InBoard, Line),
  nth0(XPos, Line, Element),
  Element is 0.

% (+, +, +, +, -) Coloca, se possível, uma peça da cor Color, no InBoard, na posição XPos YPos e retorna o resultado no OutBoard
placePiece(Color, InBoard, XPos, YPos, OutBoard):-
  validateColor(Color),
  validateYPos(YPos),
  validateXPos(XPos, YPos),
  validatePosition(InBoard, XPos, YPos),
  set2DListElement(InBoard, XPos, YPos, Color, OutBoard).

% (+, -) Retorna todos os moves válidos de um board
getValidMoves(InBoard, List):-
  getValidMoves(InBoard, 0, List).

getValidMoves(_, 9, []).
getValidMoves(InBoard, YPos, List):-
  lineLength(YPos, LineLength),
  MaxX is LineLength - 1,
  getValidMoves(InBoard, YPos, MaxX, List1),
  Next is YPos + 1,
  getValidMoves(InBoard, Next, List2),
  append(List1, List2, List).

getValidMoves(_, _, -1, []).
getValidMoves(InBoard, YPos, XPos, [H|T]):-
  validatePosition(InBoard, XPos, YPos),
  H = [XPos, YPos],
  Next is XPos - 1,
  getValidMoves(InBoard, YPos, Next, T).
getValidMoves(InBoard, YPos, XPos, List):-
  Next is XPos - 1,
  getValidMoves(InBoard, YPos, Next, List).

  % Recebe um board e retorna a Left Diagonal Row INICIO ----------------------------------------------------

  leftDiagonalRowStart(StartingLRow):-
   StartingLRow = [[0,-4],[1,-4],[2,-4],[3,-4],[4,-4],[4,-3],[4,-2],[4,-1],[4,0]].

  getLeftDiagonalRowElement(_, -5, _, []).

  getLeftDiagonalRowElement(_, _, 5, []).

  getLeftDiagonalRowElement(InBoard, Q, R, [H|T]):-
   translateHexToArray(Q, R, Y, X),
   get2DListElement(InBoard, X, Y, H),
   NewQ is Q - 1,
   NewR is R + 1,
   getLeftDiagonalRowElement(InBoard, NewQ, NewR, T).

  getLeftDiagonalRowElements(InBoard, Point, OutRow):-
   getListElement(Point, 0, Q),
   getListElement(Point, 1, R),
   getLeftDiagonalRowElement(InBoard, Q, R, OutRow).

  getLeftDiagonalRow(_, [], []).

  getLeftDiagonalRow(InBoard, [H|T], [OH|OT]):-
   getLeftDiagonalRowElements(InBoard, H, OH),
   getLeftDiagonalRow(InBoard, T, OT).

  getLeftDiagonalRows(InBoard, LeftDiagonalRows):-
   leftDiagonalRowStart(StartingLRow),
   getLeftDiagonalRow(InBoard, StartingLRow, LeftDiagonalRows).

  % Recebe um board e retorna a Left Diagonal Row FIM ----------------------------------------------------

  % Recebe um board e retorna a Right Diagonal Row INICIO ----------------------------------------------------

  rightDiagonalRowStart(StartingLRow):-
   StartingLRow = [[0,-4],[1,-4],[2,-4],[3,-4],[4,-4],[-1, -3],[-2, -2],[-3, -1],[-4, 0]].

  getRightDiagonalRowElement(_, Q, R, []):-
    Sum is Q + R,
    Sum is 5.

  getRightDiagonalRowElement(_, _, 5, []).

  getRightDiagonalRowElement(InBoard, Q, R, [H|T]):-
   translateHexToArray(Q, R, Y, X),
   get2DListElement(InBoard, X, Y, H),
   NewR is R + 1,
   getRightDiagonalRowElement(InBoard, Q, NewR, T).

  getRightDiagonalRowElements(InBoard, Point, OutRow):-
   getListElement(Point, 0, Q),
   getListElement(Point, 1, R),
   getRightDiagonalRowElement(InBoard, Q, R, OutRow).

  getRightDiagonalRow(_, [], []).

  getRightDiagonalRow(InBoard, [H|T], [OH|OT]):-
   getRightDiagonalRowElements(InBoard, H, OH),
   getRightDiagonalRow(InBoard, T, OT).

  getRightDiagonalRows(InBoard, RightDiagonalRows):-
   rightDiagonalRowStart(StartingLRow),
   getRightDiagonalRow(InBoard, StartingLRow, RightDiagonalRows).

  % Recebe um board e retorna a Right Diagonal Row FIM ----------------------------------------------------

  % Recebe um board e passa para a lista de listas INICIO ----------------------------------------------------

  boardToRows(InBoard, BoardRowsOutput):-
   getLeftDiagonalRows(InBoard, LeftDiagonalRows),
   getRightDiagonalRows(InBoard, RightDiagonalRows),
   append(InBoard, LeftDiagonalRows, IntermediateRowOutput),
   append(IntermediateRowOutput, RightDiagonalRows, BoardRowsOutput).
   %append(IntermediateRowOutput, RightDiagonalRow, BoardRowsOutput).

  % Recebe um board e passa para a lista de listas FIM ----------------------------------------------------
