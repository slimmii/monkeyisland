Const = new Object();
Const.TEMPO_MINIMO_PRELOADING = 1000;
Const.TEMPO_MINIMO_PRELOADING_2 = 2000;
Const.FPS = 30;
Const.MFPS = 0.5;
Const.TEMPO_PER_LETTERA = 60;
Const.TEMPO_MINIMO_VISUALIZZAZIONE = 1900;

Const.TEMPO_PER_LETTERA_DOPO_INTRO = 90;
Const.TEMPO_MINIMO_VISUALIZZAZIONE_DOPO_INTRO = 2500;


Const.CHECK_MOUSE_OVER = 50;

Const.LIVELLO_0 = 0.2;
Const.PROB_LIVELLO_0 = 0.35;
Const.LIVELLO_1 = 0.35;
Const.PROB_LIVELLO_1 = 0.45;
Const.LIVELLO_2 = 0.5;
Const.PROB_LIVELLO_2 = 0.55;

Const.VITTORIE_MINIME_PER_AFFRONTARE_CARLA = 4;

Const.PUNTEGGIO_VITTORIA_CONTRO_PIRATA = 3;
Const.PUNTEGGIO_VITTORIA_CONTRO_CARLA = 5;


// Debug
/*
Const.DEBUG_SALTA_INTRO = true;
Const.DEBUG_TIPO_PARTITA = 0;
Const.DEBUG_INIZIA_SUBITO_DA_CARLA = true;
Const.DEBUG_ANIMAZIONI = false;
Const.DEBUG_MOSTRA_SUBITO_FINALE = true;
*/

// Giuste

Const.DEBUG_SALTA_INTRO = true;
Const.DEBUG_TIPO_PARTITA = 0;
Const.DEBUG_INIZIA_SUBITO_DA_CARLA = true;
Const.DEBUG_ANIMAZIONI = false;
Const.DEBUG_MOSTRA_SUBITO_FINALE = true;

Const.cheatOn = false;
Const.cheatCount = 0;
Const.cheatAttivo = function(){
	Const.DEBUG_INIZIA_SUBITO_DA_CARLA = true;
	partita.setInsultiImparati();
}

Const.MOB = 0.25
