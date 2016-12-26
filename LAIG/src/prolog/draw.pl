:- module(draw, [printBoard/1, printPrettyBoard/1]).

:- use_module(library(lists)).
:- use_module(list).

test2:-
printPrettyBoard([
            [0,0,0,0,0],
           [0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
         [0,0,0,0,2,0,0,0],
        [0,0,0,1,1,2,1,0,0],
         [0,0,0,0,0,2,0,0],
          [0,0,0,0,0,0,0],
           [0,0,0,0,0,0],
            [0,0,0,0,0]]
).

test1:-
printBoard([
            [0,0,0,0,0],
           [0,0,0,0,0,0],
          [0,0,0,0,2,0,0],
         [0,0,0,0,2,0,0,0],
        [0,0,0,1,1,1,0,0,0],
         [0,0,0,2,0,0,0,0],
          [0,0,0,0,0,0,0],
           [0,0,0,0,0,0],
            [0,0,0,0,0]]
).

empty:-
printBoard([
            [0,0,0,0,0],
           [0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
           [0,0,0,0,0,0],
            [0,0,0,0,0]]
).

translate(0, ' ').
translate(1, 'W').
translate(2, 'B').

linePadding(0):-
    printSpace(4).
linePadding(1):-
    printSpace(3).
linePadding(2):-
    printSpace(2).
linePadding(3):-
    printSpace(1).
linePadding(4):-
    printSpace(0).
linePadding(5):-
    printSpace(1).
linePadding(6):-
    printSpace(2).
linePadding(7):-
    printSpace(3).
linePadding(8):-
    printSpace(4).

printSpace(0).
printSpace(X):-
    X > 0,
    write('  '),
    N is X-1,
    printSpace(N).

printTopPadding:-
    nl.
printBottomPadding:-
    nl.

printLeftPadding:-
    write('| ').
printRightPadding:-
    write(' ').
printRightPadding(1):-
    write(' |').

printElement(E):-
    translate(E, EPrint),
    write(EPrint).

printLine([]):-
    !.
printLine([H|T]):-
    printLeftPadding,
    printElement(H),
    printRightPadding,
    printLine(T).

printBoard([], _):- !.
printBoard([H|T], N):-
    printTopPadding,
    linePadding(N),
    printLine(H),
    linePadding(N),
    print(N),
    printBottomPadding,
    X is N+1,
    printBoard(T, X).

printBoard([H|T]):-
    printBoard([H|T], 0).

%----------- Pretty Print Board

printTop(5, 9):-
	write('                  0    1    2    3    4'),
	nl,
	write('               /---\\/---\\/---\\/---\\/---\\'),
	nl.
	
printTop(5, _):-
	write('               /---\\/---\\/---\\/---\\/---\\'),
	nl.
	
printTop(6, _):-
	write('            /---\\/---\\/---\\/---\\/---\\/---\\'),
	nl.
	
printTop(7, _):-
	write('         /---\\/---\\/---\\/---\\/---\\/---\\/---\\'),
	nl.
	
printTop(8, _):-
	write('      /---\\/---\\/---\\/---\\/---\\/---\\/---\\/---\\'),
	nl.
	
printTop(9, _):-
	write('   /---\\/---\\/---\\/---\\/---\\/---\\/---\\/---\\/---\\'),
	nl.

printPadding(5, Index):-
	write(Index),
    write('              ').
	
printPadding(6, Index):-
	write(Index),
    write('           ').
	
printPadding(7, Index):-
	write(Index),
    write('        ').
	
printPadding(8, Index):-
	write(Index),
    write('     ').
	
printPadding(9, Index):-
	write(Index),
	write('  ').
	
printBot(5, 9):-
	write('               \\---/\\---/\\---/\\---/\\---/  5'),
	nl.
	
printBot(5, _):-
	write('               \\---/\\---/\\---/\\---/\\---/'),
	nl.
	
printBot(6, 8):-
	write('            \\---/\\---/\\---/\\---/\\---/\\---/  6'),
	nl.
	
printBot(6, _):-
	write('            \\---/\\---/\\---/\\---/\\---/\\---/'),
	nl.
	
printBot(7, 7):-
	write('         \\---/\\---/\\---/\\---/\\---/\\---/\\---/  7'),
	nl.
	
printBot(7, _):-
	write('         \\---/\\---/\\---/\\---/\\---/\\---/\\---/'),
	nl.
	
printBot(8, 6):-
	write('      \\---/\\---/\\---/\\---/\\---/\\---/\\---/\\---/  8'),
	nl.
	
printBot(8, _):-
	write('      \\---/\\---/\\---/\\---/\\---/\\---/\\---/\\---/'),
	nl.
	
printBot(9, _):-
	write('   \\---/\\---/\\---/\\---/\\---/\\---/\\---/\\---/\\---/'),
	nl.
	
%PRESENTATION
revertIndex(Index, ReversedIndex):-
	ReversedIndex is (9 - Index).
%PRESENTATION
	
printPrettyRowElement(Elem):-
	write('| '),
	translate(Elem, Char),
	write(Char),
	write(' |').

printPrettyBoardRow([]).
printPrettyBoardRow([H|T]):-
	printPrettyRowElement(H),
	printPrettyBoardRow(T).

printPrettyBoard([]).
printPrettyBoard([H|T]):-
	getListSize([H|T], Index),
	getListSize(H, OutputSize),
	printTop(OutputSize, Index),
	%PRESENTATION
	revertIndex(Index, ReversedIndex), 
	printPadding(OutputSize, ReversedIndex),
	%PRESENTATION
	printPrettyBoardRow(H),
	nl,
	printBot(OutputSize, Index),
	printPrettyBoard(T).
	