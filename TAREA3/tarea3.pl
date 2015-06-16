s(0).
natural(0).
natural(s(X)) :- natural(X).
aDecimal(0,0).
aDecimal(s(X),Y) :- aDecimal(X,Z), Y is Z+1.
suma_l([X],X).
suma_l([X|Y],S) :- suma_l(Y,Ss), suma(X,Ss,S).

suma(0,X,X).
suma(s(X),Y,s(Z)) :- suma(X,Y,Z).

multiplicacion(0,X,0).
multiplicacion(s(X),Y,R) :- suma(Z,Y,R),multiplicacion(X,Y,Z).

menor(0,s(Y)).
menor(s(X),s(Y)) :- menor(X,Y).

divisors(X,Y) :- menor(Y,X), multiplicacion(Y,_,X).

abundante(X) :-  menor(0,X),natural(X),findall(Y,divisors(X,Y),L), suma_l(L,R), menor(X,R).

