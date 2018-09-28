Round = function(partita,stage,ib,callback){
	this.partita = partita;
	this.stage = stage;
	this.callback = callback;
	this.ib = ib;
	this.background = undefined;
	this.animGuybrush = undefined;
	this.animOpponent = undefined;
	this.speakGuy = undefined;
	this.speakOpponent = undefined;
	this.guybrush = undefined;
	this.opponent = undefined;
	this.debugIndexg = 0;
	this.debugIndexo = 0;
	this.carlaCustom = undefined;
	this.sceltaMultipla = undefined;
	this.nSceltaTmp = 0;
}


Round.prototype.init = function(){
	if (partita.currentSfidante < 4){
		this.createBackground(this.ib.getImageById("imgRoom0"));
	}else{
		this.createBackground(this.ib.getImageById("imgRoom1"));
	}
	this.startAudio();
	this.creaProtagonisti();
	this.creaSpeakers();
	this.creaCostume();
	if (Const.DEBUG_ANIMAZIONI){
		this.debugAnimazioni();
	}else{
		this.salutoIniziale();
	}
}

Round.prototype.debugAnimazioni = function(){
	Pqp.addClick(jQuery(document),this.onPreDebug,{ct:this});
}

Round.prototype.onPreDebug = function(e){
	var ct = e.bag.ct;
	ct.onDebugGuybrush();
	ct.onDebugOpponent();
}

Round.prototype.onDebugGuybrush = function(){
	var animazioni = [
		"idle_0",
		"speak_0",
		"estrai",
		"idle_1",
		"speak_1",
		"indietreggia",
		"idle_2",
		"speak_2",
		"avanza",
		"idle_3",
		"speak_3",
		"lose",
		"idle_4",
		"speak_4",
		"win",
		"idle_5"
	];
	this.debugIndexg++;
	if (this.debugIndexg >= animazioni.length){
		this.debugIndexg = 0;
	}
	this.animGuybrush.gotoAndPlay(animazioni[this.debugIndexg]);
}
Round.prototype.onDebugOpponent = function(){
	var animazioni = [
		"idle_0",
		"speak_0",
		"estrai",
		"idle_1",
		"speak_1",
		"avanza",
		"idle_3",
		"speak_3",
		"indietreggia",
		"idle_2",
		"speak_2",
		"lose",
		"idle_4",
		"speak_4",
		"win",
		"idle_5"
	];
	this.debugIndexo++;
	if (this.debugIndexo >= animazioni.length){
		this.debugIndexo = 0;
	}
	this.animOpponent.gotoAndPlay(animazioni[this.debugIndexo]);
}



Round.prototype.startAudio = function(){
	if (!lMobile){
		var audio = jQuery("#audioFight audio");
		audio.get(0).play();
	}
}

Round.prototype.createBackground = function(background){
	this.background = new createjs.Bitmap(background);
	this.stage.addChild(this.background);
}

Round.prototype.creaProtagonisti = function(){
	this.creaGuybrush();
	this.creaOpponent();
}

Round.prototype.creaGuybrush = function(){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgGuybrush")],
		frames: {width: 512*Const.MOB, height: 288*Const.MOB, regX: 0, regY: 0},
		animations: {
			// IDLE 0
			idle_0: {
				frames: [0]
			},
			// SPEAK 0
			speak_0: {
				frames: [59,60,59,60,59,60,0,57,58,56,0,57,58,56,0],
				frequency: Math.floor(6*Const.MFPS)
			},
			// ESTRAI
			estrai: {
				frames: [1,2,3,4,5],
				frequency: Math.floor(6*Const.MFPS),
				next: "idle_1"
			},
			// IDLE 1 (IN GUARDIA)
			idle_1:{
				frames: [5]
			},
			// SPEAK 1 (IN GUARDIA)
			speak_1: {
				frames: [66,67,66,67,66,67,64,65,63,64,65,63],
				frequency: Math.floor(6*Const.MFPS)
			},
			// INDIETREGGIA
			indietreggia: {
				frames: [29,29],
				frequency: Math.floor(6*Const.MFPS),
				next: "_indietreggia_step1"
			},
			_indietreggia_step1: {
				frames: [30,31,32,33],
				frequency: Math.floor(10*Const.MFPS),
				next: "_indietreggia_step2"
			},
			_indietreggia_step2: {
				frames: [34,35,36,37,38,39,40,41,42],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_2"
			},
			// IDLE 2 (IN GUARDIA PROTESO INDIETRO)
			idle_2:{
				frames: [42]
			},
			// SPEAK 2 (IN GUARDIA PROTESO IDIETRO)
			speak_2: {
				frames: [73,74,73,74,73,74,71,72,70,71,72,70],
				frequency: Math.floor(6*Const.MFPS)
			},
			// AVANZA
			avanza: {
				frames: [7,7],
				frequency: Math.floor(6*Const.MFPS),
				next: "_avanza_step1"
			},
			_avanza_step1: {
				frames: [8,9,10,11],
				frequency: Math.floor(10*Const.MFPS),
				next: "_avanza_step2"
			},
			_avanza_step2: {
				frames: [12,13,14,15,16,17,18,19,20],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_3"
			},
			// IDLE 3 (IN GUARDIA PROTESO IN AVANTI)
			idle_3:{
				frames: [20]
			},
			// SPEAK 3 (IN GUARDIA PROTESO IN AVANTI)
			speak_3: {
				frames: [80,81,80,81,80,81,78,79,77,78,79,77],
				frequency: Math.floor(6*Const.MFPS)
			},
			// LOST
			lose: {
				frames: [43,44,45,46,47,48,49,50,51,52,53,54],
				frequency: Math.floor(8*Const.MFPS),
				next: "idle_4"
			},
			// IDLE 4 (HA PERSO)
			idle_4:{
				frames: [54]
			},
			// SPEAK 4 (HA PERSO)
			speak_4: {
				frames: [87,88,87,88,87,88,85,86,84,85,86,84],
				frequency: Math.floor(6*Const.MFPS)
			},
			// WIN
			win: {
				frames: [21,22,23,24,25,26,27,28],
				frequency: Math.floor(12*Const.MFPS),
				next: "idle_5"
			},
			// IDLE 5 (HA VINTO)
			idle_5:{
				frames: [28]
			}
		}
	});
	this.animGuybrush = new createjs.BitmapAnimation(sheet);
	this.animGuybrush.onAnimationEnd = this.onGuybrushAnimationEnd;
	this.animGuybrush.ct = this;
	this.animGuybrush.gotoAndPlay("idle_0");
	this.animGuybrush.x = 260*Const.MOB;
	if (partita.currentSfidante < 4){
		this.animGuybrush.y = 204*Const.MOB;
	}else{
		this.animGuybrush.y = 212*Const.MOB;
	}

	this.stage.addChild(this.animGuybrush);
}

Round.prototype.onGuybrushAnimationEnd = function(anim,name){
	if (name == "avanza"){
		anim.x += 30*Const.MOB;
	}
	if (name == "_avanza_step1"){
		anim.x += 32*Const.MOB;
	}
	if (name == "indietreggia"){
		anim.x -= 30*Const.MOB;
	}
	if (name == "_indietreggia_step1"){
		anim.x -= 32*Const.MOB;
	}
	this.ct.guybrush.animazioneFinita(anim,name);
}

Round.prototype.creaOpponent = function(){
	if (partita.currentSfidante < 4){
		this.creaPirata();
	}else{
		this.creaCarla();
	}

}
Round.prototype.creaPirata = function(){
	var sheet

	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgPirata"+this.partita.currentSfidante)],
		frames: {width: 352*Const.MOB, height: 224*Const.MOB, regX: 0, regY: 0},
		animations: {
			// IDLE 0
			idle_0: {
				frames: [0]
			},
			// SPEAK 0
			speak_0: {
				frames: [51,52,0,50,0,52,51,52,0,51,52,0,50,49],
				frequency: Math.floor(6*Const.MFPS)
			},
			// ESTRAI
			estrai: {
				frames: [0,0,1,2,3,4,5],
				frequency: Math.floor(6*Const.MFPS),
				next: "idle_1"
			},
			// IDLE 1 (IN GUARDIA)
			idle_1:{
				frames: [5]
			},
			// SPEAK 1 (IN GUARDIA)
			speak_1: {
				frames: [58,59,5,57,5,59,58,59,5,58,59,5,57,56],
				frequency: Math.floor(6*Const.MFPS)
			},
			// INDIETREGGIA
			indietreggia: {
				frames: [7,7],
				frequency: Math.floor(6*Const.MFPS),
				next: "_indietreggia_step1"
			},
			_indietreggia_step1: {
				frames: [8,9,10,11],
				frequency: Math.floor(10*Const.MFPS),
				next: "_indietreggia_step2"
			},
			_indietreggia_step2: {
				frames: [12,13,14,15,16,17,18,19,20],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_2"
			},
			// IDLE 2 (IN GUARDIA PROTESO INDIETRO)
			idle_2:{
				frames: [20]
			},
			// SPEAK 2 (IN GUARDIA PROTESO IDIETRO)
			speak_2: {
				frames: [65,66,20,64,20,66,65,66,20,65,66,20,64,63],
				frequency: Math.floor(6*Const.MFPS)
			},
			// AVANZA
			avanza: {
				frames: [28,28],
				frequency: Math.floor(6*Const.MFPS),
				next: "_avanza_step1"
			},
			_avanza_step1: {
				frames: [29,30,31,32],
				frequency: Math.floor(10*Const.MFPS),
				next: "_avanza_step2"
			},
			_avanza_step2: {
				frames: [33,34,35,36,37,38,39,40,41],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_3"
			},
			// IDLE 3 (IN GUARDIA PROTESO IN AVANTI)
			idle_3:{
				frames: [41]
			},
			// SPEAK 3 (IN GUARDIA PROTESO IN AVANTI)
			speak_3: {
				frames: [72,73,41,71,41,73,72,73,41,72,73,41,71,70],
				frequency: Math.floor(6*Const.MFPS)
			},
			// LOST
			lose: {
				frames: [21,22,23,24,25,26,27],
				frequency: Math.floor(8*Const.MFPS),
				next: "idle_4"
			},
			// IDLE 4 (HA PERSO)
			idle_4:{
				frames: [27]
			},
			// SPEAK 4 (HA PERSO)
			speak_4: {
				frames: [79,80,27,78,27,80,79,80,27,79,80,27,78,77],
				frequency: Math.floor(6*Const.MFPS)
			},
			// WIN
			win: {
				frames: [42,43,44,45,46,47,48],
				frequency: Math.floor(12*Const.MFPS),
				next: "idle_5"
			},
			// IDLE 5 (HA VINTO)
			idle_5:{
				frames: [48]
			}
		}
	});
	this.animOpponent = new createjs.BitmapAnimation(sheet);
	this.animOpponent.onAnimationEnd = this.onOpponentPirataAnimationEnd;
	this.animOpponent.ct = this;
	this.animOpponent.gotoAndPlay("idle_0");
	this.animOpponent.x = 516*Const.MOB;
	this.animOpponent.y = 268*Const.MOB;
	this.stage.addChild(this.animOpponent);
}

Round.prototype.onOpponentPirataAnimationEnd = function(anim,name){
	if (name == "avanza"){
		anim.x -= 30*Const.MOB;
	}
	if (name == "_avanza_step1"){
		anim.x -= 32*Const.MOB;
	}
	if (name == "indietreggia"){
		anim.x += 30*Const.MOB;
	}
	if (name == "_indietreggia_step1"){
		anim.x += 32*Const.MOB;
	}
	this.ct.opponent.animazioneFinita(anim,name);
}

Round.prototype.creaCarla = function(){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgCarla")],
		frames: {width: 352*Const.MOB, height: 224*Const.MOB, regX: 0, regY: 0},
		animations: {
			// IDLE 0
			idle_0: {
				frames: [0]
			},
			// SPEAK 0
			speak_0: {
				frames: [51,49,50,52,53,49,51,53,49,0,52,53,50,53,49,50],
				frequency: Math.floor(6*Const.MFPS)
			},
			// ESTRAI
			estrai: {
				frames: [1,2,3,4],
				frequency: Math.floor(6*Const.MFPS),
				next: "idle_1"
			},
			// IDLE 1 (IN GUARDIA)
			idle_1:{
				frames: [4]
			},
			// SPEAK 1 (IN GUARDIA)
			speak_1: {
				frames: [58,56,57,59,60,56,58,60,56,59,60,57,60,56,57],
				frequency: Math.floor(6*Const.MFPS)
			},
			// INDIETREGGIA
			indietreggia: {
				frames: [7,7],
				frequency: Math.floor(6*Const.MFPS),
				next: "_indietreggia_step1"
			},
			_indietreggia_step1: {
				frames: [8,9,10,11],
				frequency: Math.floor(10*Const.MFPS),
				next: "_indietreggia_step2"
			},
			_indietreggia_step2: {
				frames: [12,13,14,15,16,17,18,19,20],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_2"
			},
			// IDLE 2 (IN GUARDIA PROTESO INDIETRO)
			idle_2:{
				frames: [20]
			},
			// SPEAK 2 (IN GUARDIA PROTESO IDIETRO)
			speak_2: {
				frames: [65,63,64,66,67,63,65,67,63,66,67,64,67,63,64],
				frequency: Math.floor(6*Const.MFPS)
			},
			// AVANZA
			avanza: {
				frames: [28,28],
				frequency: Math.floor(6*Const.MFPS),
				next: "_avanza_step1"
			},
			_avanza_step1: {
				frames: [29,30,31,32],
				frequency: Math.floor(10*Const.MFPS),
				next: "_avanza_step2"
			},
			_avanza_step2: {
				frames: [33,34,35,36,37,38,39,40,41],
				frequency: Math.floor(10*Const.MFPS),
				next: "idle_3"
			},
			// IDLE 3 (IN GUARDIA PROTESO IN AVANTI)
			idle_3:{
				frames: [41]
			},
			// SPEAK 3 (IN GUARDIA PROTESO IN AVANTI)
			speak_3: {
				frames: [72,70,71,73,74,70,72,74,70,73,74,71,74,70,71],
				frequency: Math.floor(6*Const.MFPS)
			},
			// LOST
			lose: {
				frames: [21,22,23,24,25,26,27],
				frequency: Math.floor(8*Const.MFPS),
				next: "idle_0"
			},
			// IDLE 4 (HA PERSO)
			idle_4:{
				frames: [27]
			},
			// SPEAK 4 (HA PERSO)
			speak_4: {
				frames: [49,50,51,52,53],
				frequency: Math.floor(6*Const.MFPS)
			},
			// WIN
			win: {
				frames: [42,43,44,45,46,47,48,48,48,48,21,25,26],
				frequency: Math.floor(12*Const.MFPS),
				next: "idle_0"
			},
			// IDLE 5 (HA VINTO)
			idle_5:{
				frames: [48]
			}
		}
	});
	this.animOpponent = new createjs.BitmapAnimation(sheet);
	this.animOpponent.onAnimationEnd = this.onOpponentCarlaAnimationEnd;
	this.animOpponent.ct = this;
	this.animOpponent.gotoAndPlay("idle_0");
	this.animOpponent.x = 516*Const.MOB;
	this.animOpponent.y = 276*Const.MOB;
	this.stage.addChild(this.animOpponent);
}

Round.prototype.onOpponentCarlaAnimationEnd = function(anim,name){
	if (name == "avanza"){
		anim.x -= 30*Const.MOB;
	}
	if (name == "_avanza_step1"){
		anim.x -= 32*Const.MOB;
	}
	if (name == "indietreggia"){
		anim.x += 30*Const.MOB;
	}
	if (name == "_indietreggia_step1"){
		anim.x += 32*Const.MOB;
	}
	this.ct.opponent.animazioneFinita(anim,name);
}

Round.prototype.creaSpeakers = function(){
	this.speakGuy = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiBianche"));
	this.speakOpponent = createSpeakerGrandi(this.ib.getImageById(this.getFontColor()));
}

Round.prototype.getFontColor = function(){
	var aFonts = ["imgFontGrandiGialle","imgFontGrandiGrigie","imgFontGrandiRosseAlt","imgFontGrandiRosa"];
	var ret = "imgFontGrandiVerdi"
	if (partita.currentSfidante < 4){
		ret = aFonts[Pqp.rnd(aFonts.length-1)];
	}
	return ret;
}


Round.prototype.creaCostume = function(){
	this.guybrush = new Costume(this.stage,this.animGuybrush,this.speakGuy,10,160,1040);
	this.opponent = new Costume(this.stage,this.animOpponent,this.speakOpponent,120,160,1140);
	this.customizeMethods(this.guybrush);
	this.customizeMethods(this.opponent);
}

Round.prototype.customizeMethods = function(costume){
	costume.prefix = "0";
	costume.beginSpeak = function(){
		this.anim.gotoAndPlay("speak_"+this.prefix);
	}
	costume.endSpeak = function(){
		this.anim.gotoAndPlay("idle_"+this.prefix);
	}
	costume.estrai = function(cb){
		this.callbackAzione = cb
		this.anim.gotoAndPlay("estrai");
	}
	costume.indietreggia = function(cb){
		this.callbackAzione = cb
		this.anim.gotoAndPlay("indietreggia");
	}
	costume.avanza = function(cb){
		this.callbackAzione = cb
		this.anim.gotoAndPlay("avanza");
		setTimeout(this.playAttacco,150);
	}
	costume.playAttacco = function(){
		var n = Pqp.rnd(3);
		if (!lMobile){
			var snd = jQuery("#audioHit"+n+" audio");
			snd.currentTime = 0;
			snd.get(0).play();
		}
	}


	costume.lose = function(cb){
		this.callbackAzione = cb
		this.anim.gotoAndPlay("lose");
	}
	costume.win = function(cb){
		this.callbackAzione = cb
		this.anim.gotoAndPlay("win");
		setTimeout(this.playWin,400);
	}

	costume.playWin = function(){
		if (!lMobile){
			var snd = jQuery("#audioWin audio");
			snd.currentTime = 0;
			snd.get(0).play();
		}
	}



}

Round.prototype.salutoIniziale = function(){
	var aTmp = new Array();
	if (partita.currentSfidante < 4){
		aTmp.push(Lng.ln("saluto"+Pqp.rnd(3)));
		this.opponent.speak(aTmp,{callback:this.dialogoIniziale,ct:this},500);
	}else{
		// Custom per Carla
		if (partita.carlaFirstTime){
			this.opponent.setNewPos(350,20);
			this.carlaCustom = new createjs.Bitmap(this.ib.getImageById("imgCarlaGrande0"));
			this.stage.addChild(this.carlaCustom);
			aTmp.push(Lng.ln("saluto_carla0"));
			this.opponent.speak(aTmp,{callback:this.salutoInizialeCarla0,ct:this});
		}else{
			this.dialogoIniziale();
		}
	}
}

Round.prototype.salutoInizialeCarla0 = function(){
	var aTmp = new Array();
	this.stage.removeChild(this.carlaCustom);
	this.carlaCustom = new createjs.Bitmap(this.ib.getImageById("imgCarlaGrande1"));
	this.stage.addChild(this.carlaCustom);

	aTmp.push(Lng.ln("saluto_carla1"));
	this.opponent.speak(aTmp,{callback:this.salutoInizialeCarla1,ct:this});

}

Round.prototype.salutoInizialeCarla1 = function(){
	this.opponent.setNewPos(120,160);
	this.stage.removeChild(this.carlaCustom);
	this.carlaCustom = undefined;
	this.dialogoIniziale();
}

Round.prototype.dialogoIniziale = function(){
	var aOpzioni = new Array();
	if (partita.currentSfidante < 4){
		aOpzioni.push(Lng.ln("dialogo0_0"));
		aOpzioni.push(Lng.ln("dialogo0_1"));
		this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.dialogoInizialeSceltaEffettuata,ct:this});
		this.sceltaMultipla.init();
	}else{
		if (partita.carlaFirstTime){
			partita.carlaFirstTime = false;
			aOpzioni.push(Lng.ln("dialogo1_0"));
			aOpzioni.push(Lng.ln("dialogo1_1"));
			aOpzioni.push(Lng.ln("dialogo1_2"));
			this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.dialogoInizialeCarlaSceltaEffettuata,ct:this});
			this.sceltaMultipla.init();
		}else{
			var aTmp = new Array();
			aTmp.push(Lng.ln("replicaGuy2"));
			this.guybrush.speak(aTmp,{callback:this.preludioCombattimento,ct:this});
		}
	}
}

Round.prototype.dialogoInizialeSceltaEffettuata = function(n,s){
	var aTmp = new Array();
	aTmp.push(s);
	if (n == 0){
		this.guybrush.speak(aTmp,{callback:this.iniziaCombattimento,ct:this},500);
	}else{
		this.guybrush.speak(aTmp,{callback:this.tornaIndietro,ct:this},500);
	}
}

Round.prototype.dialogoInizialeCarlaSceltaEffettuata = function(n,s){
	var aTmp = new Array();
	aTmp.push(s);
	this.nSceltaTmp = n;
	this.guybrush.speak(aTmp,{callback:this.rispostaCarla,ct:this});
}

Round.prototype.rispostaCarla = function(){
	var aTmp = new Array();
	var n = this.nSceltaTmp;
	if (n == 0){
		aTmp.push(Lng.ln("rispostaCarla0_0"));
		aTmp.push(Lng.ln("rispostaCarla0_1"));
		aTmp.push(Lng.ln("rispostaCarla0_2"));
		this.opponent.speak(aTmp,{callback:this.replicaGuybrush,ct:this});
	}else if (n == 1){
		aTmp.push(Lng.ln("rispostaCarla1_0"));
		this.opponent.speak(aTmp,{callback:this.chiusuraDialogo,ct:this});
	}else{
		aTmp.push(Lng.ln("rispostaCarla2_0"));
		aTmp.push(Lng.ln("rispostaCarla2_1"));
		aTmp.push(Lng.ln("rispostaCarla2_2"));
		aTmp.push(Lng.ln("rispostaCarla2_3"));
		this.opponent.speak(aTmp,{callback:this.replicaGuybrush,ct:this});
	}


}

Round.prototype.replicaGuybrush = function(){
	var n = this.nSceltaTmp;
	var aTmp = new Array();
	aTmp.push(Lng.ln("replicaGuy"));
	this.guybrush.speak(aTmp,{callback:this.chiusuraDialogo,ct:this});
}

Round.prototype.chiusuraDialogo = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("chiusuraDialogo"));
	this.opponent.speak(aTmp,{callback:this.preludioCombattimento,ct:this});
}

Round.prototype.preludioCombattimento = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("preludioCombattimento"));
	this.opponent.speak(aTmp,{callback:this.iniziaCombattimento,ct:this});
}


Round.prototype.tornaIndietro = function(){
	this.callback.call(null,0);
	this.destroy();
}

Round.prototype.destroy = function(){
	this.stage.removeChild(this.background);
	this.animGuybrush.stop();
	this.stage.removeChild(this.animGuybrush);
	this.animOpponent.stop();
	this.stage.removeChild(this.animOpponent);
	this.animGuybrush = undefined;
	this.animOpponent = undefined;
	this.speakGuy = undefined;
	this.speakOpponent = undefined;
	this.guybrush = undefined;
	this.opponent = undefined;
	this.carlaCustom = undefined;
	this.partita = undefined;
	this.stage = undefined;

	this.ib = undefined;
	if (!lMobile){
		var audio = jQuery("#audioFight audio");
		audio.get(0).pause();
	}
}

Round.prototype.iniziaCombattimento = function(){
	this.fight = new Fight(this.stage,this.guybrush,this.opponent,this.partita,{callback:this.fineCombattimento,ct:this});
	this.fight.start();
}

Round.prototype.fineCombattimento = function(esito){
	this.destroy();
	this.callback.call(null,esito);
	this.callback = undefined;
}

