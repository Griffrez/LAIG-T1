:- module(hexagon, [translateHexToArray/4]).

% Traduzir do formato referido em http://www.redblobgames.com/grids/hexagons/#map-storage para as coordenadas tipicas do tabuleiro.
translateHexToArray(Q, R, Y, X):-
  N is 4,
  Y is R + N,
  X is Q + N + min(0, R).
