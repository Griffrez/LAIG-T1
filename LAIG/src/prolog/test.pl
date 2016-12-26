:- consult(game).
:- use_module(termination).
:- use_module(mechanics).
:- use_module(list).
:- use_module(ai).
:- use_module(hexagon).

test1(In):-
  In = [
              [0,0,0,0,0],
             [0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
             [0,0,0,0,0,0],
              [0,0,0,0,0]].

test2(In):-
  In = [
              [1,0,0,0,0],
             [0,1,0,0,0,0],
            [0,0,1,0,0,0,0],
           [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
             [0,0,0,0,0,0],
              [0,0,0,0,0]].

printList([]).
printList([H|T]):-
  print(H),
  printList(T).

print2DList([]).
print2DList([H|T]):-
  printList(H),
  print2DList(T).

test:-
  test1(Board1),
  checkTermination(Board1, Result1),
  Result1 = 0,
  write('Test 1 Passed.'),
  test2(Board2),
  checkTermination(Board2, Result2),
  Result2 = 1,
  game:play(game(_, 2), Result2),
  write('Test 2 check result (Should be "Player 2 wins")').

test2:-
  In = [
              [1,0,0,0,0],
             [0,1,0,0,0,0],
            [0,0,1,0,0,0,0],
           [0,0,0,1,0,0,0,0],
          [0,0,0,0,1,0,0,0,0],
           [0,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0],
             [0,0,0,0,1,0],
              [0,0,0,0,1]],
  getValidMoves(In, List),
  print(List).

test3:-
  In = [0, 0, 1, 1, 1],
  countElement(In, 0, Out0),
  countElement(In, 1, Out1),
  print(Out0),
  nl,
  print(Out1),
  nl.

test4:-
  In = [
              [1,0,0,0,0],
             [0,0,0,0,0,0],
            [0,0,1,0,0,0,0],
           [0,0,0,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
             [0,0,0,0,0,0],
              [0,0,0,0,0]],
  valueBoard(In, 1, Value1, Value2),
  print(Value1),
  nl,
  print(Value2).

test5:-
  In = [
              [1,0,0,1,0],
             [0,0,0,0,0,0],
            [0,0,0,0,0,0,2],
           [0,0,0,1,0,0,2,0],
          [0,0,0,0,0,0,0,0,0],
           [0,0,0,0,0,2,1,0],
            [0,0,0,0,0,0,0],
             [0,0,0,0,0,0],
              [1,0,0,1,0]],
  getValidMoves(In, List),
  getBestMoves(In, 1, List, Moves),
  print(Moves).
