Fight = function(stage,guybrush,opponent,partita,callback){
	this.stage = stage;
	this.guybrush = guybrush;
	this.opponent = opponent;
	this.partita = partita;
	this.callback = callback;
	this.sceltaMultipla = undefined;
	this.currentInsulto = undefined;
	this.scoreGuybrush = 0;
	this.scoreOpponent = 0;
	this.aAttaccoDetti = new Array();
	this.aOpponentAttaccoDetti = new Array();
	this.lAbbandonoInDifesa = false;
	this.maglietta = undefined;
}

Fight.prototype.start = function(){
	this.partita.initInsulti();
	this.guybrush.estrai({callback:this.endEstrai,ct:this});
	this.opponent.estrai();
}

Fight.prototype.endEstrai = function(costume,anim,name){
	if (name == "estrai"){
		this.guybrush.prefix = "1";
		this.opponent.prefix = "1";
		if (this.partita.currentSfidante == 4){
			// Carla
			this.turnoAttaccoOpponent();
		}else{
			// Pirati
			this.turnoAttaccoGuybrush();
		}
		costume.callbackAzione = undefined;
	}
}

/* GUYBRUSH ATTACCA */
Fight.prototype.turnoAttaccoGuybrush = function(){
	var a = this.partita.aInsultiImparati;
	var aOpzioni = new Array();
	for (var x=0;x<a.length;x++){
		aOpzioni.push(a[x].attacco);
	}
	aOpzioni = aOpzioni.concat(this.partita.getInsultiStandardAttacco());
	aOpzioni = this.rimuoviInsultiAttaccoGiaDetti(aOpzioni);
	this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.sceltaRispostaAttacco,ct:this});
	this.sceltaMultipla.init();
}

Fight.prototype.rimuoviInsultiAttaccoGiaDetti = function(a){
	var aRet = new Array();
	for (var x=0;x<a.length;x++){
		var insulto = a[x];
		var lTrovato = false;
		for (var y=0;y<this.aAttaccoDetti.length;y++){
			if (this.aAttaccoDetti[y] == insulto){
				lTrovato = true;
				break;
			}
		}
		if (!lTrovato){
			for (var z=0;z<this.aOpponentAttaccoDetti.length;z++){
				if (this.aOpponentAttaccoDetti[z] == insulto){
					lTrovato = true;
					break;
				}
			}
		}
		if (!lTrovato){
			aRet.push(insulto);
		}
	}
	return aRet;
}

Fight.prototype.sceltaRispostaAttacco = function(n,s){
	this.currentInsulto = s;
	this.aAttaccoDetti.push(s); // lo aggiunge a quelli già detti
	this.guybrush.speak([s],{callback:this.aiValutaDifesa,ct:this});
}

Fight.prototype.aiValutaDifesa = function(){
	var rispostaStandard = this.partita.indexRispostaAttaccoStandard(this.currentInsulto);
	if (rispostaStandard == -1){
		var xp = this.partita.getXpPerc();
		var prob;
		if (xp < Const.LIVELLO_0){
			prob = Const.PROB_LIVELLO_0
		}else if (xp < Const.LIVELLO_1){
			prob = Const.PROB_LIVELLO_1
		}else{
			prob = Const.PROB_LIVELLO_2
		}

		var reply
		if (Pqp.check(prob)){
			// Ai perde
			var a = this.partita.getInsultiStandardDifesa();
			reply = a[Pqp.rnd(a.length-3)];
			this.opponent.speak([reply],{callback:this.aiPerdeTurnoAttacco,ct:this});
		}else{
			// Ai vince
			reply = this.partita.getRispostaGiusta(this.currentInsulto);
			this.partita.imparaRisposta(this.currentInsulto);
			this.opponent.speak([reply],{callback:this.aiVinceTurnoAttacco,ct:this});

		}
	}else{
		// ai vince
		var aTmp = new Array();
		if (rispostaStandard == 0){
			aTmp.push(Lng.ln("mi1_ris_std0_0"));
		}else if (rispostaStandard == 1){
			aTmp.push(Lng.ln("mi1_ris_std1_0"));
			aTmp.push(Lng.ln("mi1_ris_std1_1"));
		}else if (rispostaStandard == 2){
			aTmp.push(Lng.ln("mi1_ris_std2_0"));
		}else if (rispostaStandard == 3){
			// Abbandono
			this.abbandono();
		}else{
			trace("Error aiValutaDifesa rispostaStandard !");
		}
		if (aTmp.length > 0){
			this.opponent.speak(aTmp,{callback:this.aiVinceTurnoAttacco,ct:this});
		}

	}
}

Fight.prototype.guybrushScores = function(){
	//trace("GUY GAIN");
	this.scoreGuybrush++;
}

Fight.prototype.opponentScores = function(){
	//trace("OPP GAIN");
	this.scoreOpponent++;
}

Fight.prototype.aiPerdeTurnoAttacco = function(){
	this.guybrushScores();
	var lEnd = this.checkEndFight();
	if (!lEnd){
		this.guybrush.avanza({callback:this.endAvanza,ct:this});
		this.opponent.indietreggia();
		this.partita.turniWon++;
	}

}

Fight.prototype.endAvanza = function(costume,anim,name){
	if (name == "_avanza_step2"){
		this.guybrush.prefix = "3";
		this.opponent.prefix = "2";
		if (this.partita.currentSfidante == 4){
			this.turnoAttaccoOpponent();
		}else{
			this.turnoAttaccoGuybrush();
		}
		costume.callbackAzione = undefined;
	}
}


Fight.prototype.aiVinceTurnoAttacco = function(){
	this.opponentScores();
	var lEnd = this.checkEndFight();
	if (!lEnd){
		this.guybrush.indietreggia({callback:this.endIndietreggia,ct:this});
		this.opponent.avanza();
		this.partita.turniLost++;
	}
}

Fight.prototype.endIndietreggia = function(costume,anim,name){
	if (name == "_indietreggia_step2"){
		this.guybrush.prefix = "2";
		this.opponent.prefix = "3";
		this.turnoAttaccoOpponent();
		costume.callbackAzione = undefined;
	}
}


Fight.prototype.abbandono = function(){
	this.callback.callback.call(this.callback.ct,0);
}

Fight.prototype.checkEndFight = function(){
	var maxScore = Const.PUNTEGGIO_VITTORIA_CONTRO_PIRATA;
	if (this.partita.currentSfidante == 4){
		maxScore = Const.PUNTEGGIO_VITTORIA_CONTRO_CARLA;
	}
	if (this.scoreGuybrush == maxScore){
		this.scenettaWon();
		return true;
	}
	if (this.scoreOpponent == maxScore){
		this.scenettaLost();
		return true;
	}
	return false;
}


/* GUYBRUSH DIFENDE */
Fight.prototype.turnoAttaccoOpponent = function(){
	// La AI sceglie l'insulto
	var a = this.partita.aInsulti;
	var aPool = new Array();
	for (var x=0;x<a.length;x++){
		if (a[x].owned == 0){
			aPool.push(a[x].attacco); // piu' probabilita
		}
		aPool.push(a[x].attacco);
	}
	// Toglie quelli già detti
	aPool = this.rimuoviInsultiGiaDetti(aPool);

	aPool = Pqp.shuffle(aPool);
	aPool = Pqp.shuffle(aPool);
	var s = aPool[Pqp.rnd(aPool.length-1)];
	if (this.partita.currentSfidante != 4){
		this.partita.imparaInsulto(s);
	}
	this.currentInsulto = s;
	this.aOpponentAttaccoDetti.push(s);
	this.opponent.speak([this.pirataOppureCarla(s)],{callback:this.turnoDifesaGuybrush,ct:this});
}

Fight.prototype.pirataOppureCarla = function(s){
	if (this.partita.currentSfidante == 4){
		var insulto = partita.getInsultoFromAttacco(s);
		return insulto.carla;
	}
	return s;
}

Fight.prototype.rimuoviInsultiGiaDetti = function(aPool){
	var aRet = new Array();
	for (var x=0;x<aPool.length;x++){
		var insulto = aPool[x];
		var lTrovato = false;
		for (var y=0;y<this.aOpponentAttaccoDetti.length;y++){
			if (insulto == this.aOpponentAttaccoDetti[y]){
				lTrovato = true;
				break;
			}
		}
		if (!lTrovato){
			for (var z=0;z<this.aAttaccoDetti.length;z++){
				if (insulto == this.aAttaccoDetti[z]){
					lTrovato = true;
					break;
				}
			}
		}
		if (!lTrovato){
			aRet.push(insulto);
		}
	}
	return aRet;
}

Fight.prototype.turnoDifesaGuybrush = function(){
	var a = this.partita.aInsultiImparati;
	var aOpzioni = new Array();
	for (var x=0;x<a.length;x++){
		if (a[x].owned == 2){
			aOpzioni.push(a[x].risposta);
		}
	}
	aOpzioni = aOpzioni.concat(this.partita.getInsultiStandardDifesa());
	this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.sceltaRispostaDifesa,ct:this});
	this.sceltaMultipla.init();

}

Fight.prototype.sceltaRispostaDifesa = function(n,s){
	var rispostaStandard = this.partita.indexRispostaDifesaStandard(s);
	//trace(rispostaStandard);
	var lOk = false;
	if (rispostaStandard == -1){
		var giusta = this.partita.getRispostaGiusta(this.currentInsulto);
		if (giusta == s){
			lOk = true;
			this.guybrushScores();
		}else{
			this.opponentScores();
		}
		//this.guybrush.speak([s],{callback:this.aiValutaDifesa,ct:this});
	}else{
		if (rispostaStandard == 3){
			// Ripeti please...
			if (this.partita.currentSfidante == 4){
				this.guybrush.speak([s],{callback:this.ripetiInsulto,ct:this});
			}else{
				this.guybrush.speak([this.pirataOppureCarla(s)],{callback:this.ripetiInsulto,ct:this});
			}
			return
		}else if (rispostaStandard == 4){
			// Abbandono
			this.lAbbandonoInDifesa = true;
		}
		this.opponentScores();
	}

	if (lOk){
		this.guybrush.speak([s],{callback:this.rispostaDifesaCorretta,ct:this});
	}else{
		this.guybrush.speak([s],{callback:this.rispostaDifesaSbagliata,ct:this});
	}

}

Fight.prototype.ripetiInsulto = function(){
	this.opponent.speak([Lng.ln("ripeti",this.pirataOppureCarla(this.currentInsulto))],{callback:this.turnoDifesaGuybrush,ct:this});
}
Fight.prototype.rispostaDifesaCorretta = function(){
	var lEnd = this.checkEndFight();
	if (!lEnd){
		this.guybrush.avanza({callback:this.endAvanza,ct:this});
		this.opponent.indietreggia();
		this.partita.turniWon++;
	}
}
Fight.prototype.rispostaDifesaSbagliata = function(){
	if (this.lAbbandonoInDifesa){
		this.abbandono();
	}else{
		var lEnd = this.checkEndFight();
		if (!lEnd){
			this.guybrush.indietreggia({callback:this.endIndietreggia,ct:this});
			this.opponent.avanza();
			this.partita.turniLost++;
		}
	}
}

Fight.prototype.scenettaWon = function(){
	this.guybrush.win({callback:this.endWin,ct:this});
	this.opponent.lose();
}
Fight.prototype.scenettaLost = function(){
	this.guybrush.lose({callback:this.endLose,ct:this});
	this.opponent.win();
}

Fight.prototype.endWin = function(costume,anim,name){
	this.partita.vittorie++;
	var s = "";
	if (name == "win"){
		if (this.partita.currentSfidante == 4){
			s = Lng.ln("wincarla");
		}else{
			var xp = this.partita.getXpPercCompleti();
			if (xp <= Const.LIVELLO_2){
				s = Lng.ln("win0");
			}else{
				if (this.partita.vittorie >= Const.VITTORIE_MINIME_PER_AFFRONTARE_CARLA){
					s = Lng.ln("win1");
				}else{
					s = Lng.ln("win0");
				}
			}
		}
		this.opponent.prefix = "4";
		this.opponent.speak([s],{callback:this.fineFightWin,ct:this});
		costume.callbackAzione = undefined;
	}
}

Fight.prototype.endLose = function(costume,anim,name){
	if (name == "lose"){
		var aTmp = new Array();
		for (var x=0;x<5;x++){
			aTmp.push(Lng.ln("lose"+x));
		}
		this.guybrush.prefix = "4";
		this.guybrush.speak([aTmp[Pqp.rnd(aTmp.length-1)]],{callback:this.fineFightLose,ct:this},500);
		costume.callbackAzione = undefined;
	}
}

Fight.prototype.fineFightLose = function(){
	this.partita.sconfitte++;
	if (this.partita.currentSfidante == 4){
		this.opponent.prefix = 0;
		var aTmp = new Array();
		aTmp.push(Lng.ln("losewithcarla0"));
		aTmp.push(Lng.ln("losewithcarla1"));
		this.opponent.speak(aTmp,{callback:this.fineFightLoseWithCarla,ct:this});
	}else{
		this.callback.callback.call(this.callback.ct,1);
	}
}

Fight.prototype.fineFightWin = function(){
	if (this.partita.currentSfidante == 4){
		var aTmp = new Array();
		for (var x=0;x<4;x++){
			aTmp.push(Lng.ln("wincarla"+x));
		}
		this.opponent.speak(aTmp,{callback:this.scenettaMaglietta,ct:this},1000);
	}else{
		this.callback.callback.call(this.callback.ct,2); // vittoria su pirata
	}
}


Fight.prototype.fineFightLoseWithCarla = function(){
	this.callback.callback.call(this.callback.ct,1);
}

Fight.prototype.scenettaMaglietta = function(){
	this.guybrush.setNewPos(10,20)
	this.guybrush.setNewAreaSpeak(1260)
	this.maglietta = new createjs.Bitmap(ib.getImageById("imgGuybrushWin0"));
	this.stage.addChild(this.maglietta);
	var aTmp = new Array();
	aTmp.push(Lng.ln("winguybrush0"));
	aTmp.push(Lng.ln("winguybrush1"));
	aTmp.push(Lng.ln("winguybrush2"));
	this.guybrush.speak(aTmp,{callback:this.scenettaMagliettaParte2,ct:this});

}

Fight.prototype.scenettaMagliettaParte2 = function(){
	this.stage.removeChild(this.maglietta);
	this.maglietta = new createjs.Bitmap(ib.getImageById("imgGuybrushWin1"));
	this.stage.addChild(this.maglietta);
	var aTmp = new Array();
	aTmp.push(Lng.ln("winguybrush3"));
	this.guybrush.speak(aTmp,{callback:this.fineFightWinWithCarla,ct:this},2000);
}


Fight.prototype.fineFightWinWithCarla = function(){
	this.stage.removeChild(this.maglietta);
	this.callback.callback.call(this.callback.ct,3); // vittoria su carla
}


