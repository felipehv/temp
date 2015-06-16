:- consult(io).
:- dynamic es_un/2.
:- dynamic es_adj_que/2.

append(P1,P2,P3,P4,L):-
	append(P1,X,L),
	append(P2,Y,X),
	append(P3,P4,Y).

universal(todo).
universal(un).
universal(una).
universal(unos).
universal(unas).
verbo_ser(es).
verbo_ser(son).


conversar :-
    leer_oracion(L),
    entender(L,A),
    (A=continuar ->
        conversar
	;
	true).

entender(O,continuar) :-
    append(Sujeto,[Verbo],Predicado,['.'],O),
    entender_afirmacion(Sujeto,Verbo,Predicado),
    write('entiendo.'),nl.

entender(O,continuar) :-
    O=[los,Algo1,son,Adj,que,los,Algo2,'.'],
    Clases = [Algo1,Algo2],
    Cabeza = es_adj_que(Adj,Clases),
    assert((Cabeza)),
    write('entiendo.'),nl.


entender(O,continuar) :-
    O=[quien,es,Adj,'?'],
    Consulta = es_adj_que(Adj,Clase),
    findall(Clase,Consulta,L),
    (L\=[]->
    pretty_print(L),write(' es '),write(Adj),write(' que  '),pretty_print(L),write('.'),nl;
    write('no se que es '),write(X),write('.'),nl).

entender(O,continuar) :-
    O=[que,es,X,'?'],
	Consulta = es_un(X,Clase),
    findall(Clase,Consulta,L),
    (L\=[]->
    write(X),write(' es '),pretty_print(L),write('.'),nl;
    write('no se quien es '),write(X),write('.'),nl).

entender(O,continuar) :-
    O=[quienes,son,Clase,'?'],
    Consulta=es_un(X,Clase),
    findall(X,Consulta,L),
    (L\=[]->
    pretty_print(L),write(' son '),write(Clase),write('.'),nl;
    write('No conozco ningun '),write(Clase),write('.'),nl).

entender([chao,'.'],parar) :-
    write('Conversemos otro dia.'),nl.

entender(_,continuar) :-
    write('No entiendo.'),nl.

entender_afirmacion(Sujeto,Verbo,Predicado) :-
    Sujeto=[Objeto],
    verbo_ser(Verbo),
    Predicado=[un,Clase],
	Cabeza=es_un(Objeto,Clase),
    assert(Cabeza).

entender_afirmacion(Sujeto,Verbo,Predicado) :-
    Sujeto=[Todo,SubClase],universal(Todo),
    verbo_ser(Verbo),
    Predicado=[un,Clase],
	Cabeza = es_un(X,Clase),
	Cola = es_un(X,SubClase),
    assert((Cabeza:-Cola)).

pretty_print([X]) :-
    write(X).

pretty_print([X|L]) :-
    write(X), pretty_print_commas(L).

pretty_print_commas([X]) :-
    write(' y '),write(X).

pretty_print_commas([X,Y|L]) :-
    write(', '),write(X),pretty_print_commas([Y|L]).
















