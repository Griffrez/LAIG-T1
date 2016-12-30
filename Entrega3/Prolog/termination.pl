:- module(termination, [checkTermination/2, evalRows/3, evalRow/3, evalList/3]).

:- use_module(library(lists)).
:- use_module(list).
:- use_module(hexagon).
:- use_module(mechanics, [boardToRows/2]).

/* Returns
	0 - Game Continues
	1 - Player 1 win
	2 - Player 2 win
	3 - Game is Tied
 */

% Avaliar 4 elementos INICIO ----------------------------------------------------

% Quatro Iguais
evalList(List, Result, Size):-
 Size > 3,
 getListElement(List, 0, Elem1),
 getListElement(List, 1, Elem2),
 getListElement(List, 2, Elem3),
 getListElement(List, 3, Elem4),
 Elem1 \= 0,
 Elem1 = Elem2,
 Elem1 = Elem3,
 Elem1 = Elem4,
 Result is 2.

% Tres Primeiros Iguais
evalList(List, Result, _):-
 getListElement(List, 0, Elem1),
 getListElement(List, 1, Elem2),
 getListElement(List, 2, Elem3),
 Elem1 \= 0,
 Elem1 = Elem2,
 Elem1 = Elem3,
 Result is 1.

% Nenhum dos anteriores
evalList(_, Result, _):-
 Result is 0.

% Avaliar 4 elementos FIM ----------------------------------------------------

% Percorre toda uma linha INICIO ----------------------------------------------------

% Chamada inicial recursiva
evalRow([H|T], 0, Output):-
 getListSize([H|T], OutputSize),
 OutputSize >= 3,
 evalList([H|T], Result, OutputSize),
 evalRow(T, Result, Output).

% Terminou com Resultado 0 (nada)
evalRow(_, 0, Output):-
 Output is 0.

% Terminou com resultado 1 (3 iguais)
evalRow(_, 1, Output):-
 Output is 1.

% Terminou com resultado 2 (4 iguais)
evalRow(_, 2, Output):-
 Output is 2.

% Percorre toda uma linha FIM ----------------------------------------------------

% Percorre toda uma lista de linhas INICIO ----------------------------------------------------

evalRows([], 0, Output):-
 Output is 0.

evalRows([H|T], 0, Output):-
 evalRow(H, 0, Result),
 evalRows(T, Result, Output).

evalRows(_, 1, Output):-
 Output is 1.

evalRows(_, 2, Output):-
 Output is 2.

% Percorre toda uma lista de linhas FIM ----------------------------------------------------
isBoardFull([], 0).
isBoardFull(InBoard, OutResult):-
 InBoard = [H|_],
 member(H, 0),
 OutResult = 1.
isBoardFull([_|T], OutResult):-
  isBoardFull(T, OutResult).

% Ponto de entrada INICIO ----------------------------------------------------

checkTermination(InBoard, OutResult):-
 isBoardFull(InBoard, IsFull),
 checkTermination(InBoard, IsFull, OutResult).

checkTermination(InBoard, 0, OutResult):-
 boardToRows(InBoard, BoardRows),
 evalRows(BoardRows, 0, OutResult).

checkTermination(InBoard, 1, OutResult):-
 boardToRows(InBoard, BoardRows),
 evalRows(BoardRows, 0, OutResultIntermediate),
 checkTermination(InBoard, 1, OutResult, OutResultIntermediate).

checkTermination(_, 1, OutResult, 0):-
 OutResult is 3.

checkTermination(_, 1, OutResult, OutResultIntermediate):-
 OutResult is OutResultIntermediate.



% Ponto de entrada FIM ----------------------------------------------------

/*
checkTermination(InBoard, OutResult):-
 boardToRows(InBoard, BoardRows),
 evalRows(BoardRows, 0, OutResult).
*/
