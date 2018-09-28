Speaker = function(img){
	this.aLetters = new Array(2048);
	for (var x=0;x<this.aLetters.length;x++){
		this.aLetters[x] = undefined;
	}
	this.img = img;
	this.interlinea = 64;
	this.currentStage = undefined;
	this.currentContainer = undefined;
	this.idto = undefined;
	this.numRighe = 0;

}

Speaker.prototype.add = function(letter,x,y,w,h){
	var bmp = new createjs.Bitmap(this.img);
	bmp.sourceRect = new createjs.Rectangle(x*Const.MOB,y*Const.MOB,w*Const.MOB,h*Const.MOB);
	this.aLetters[letter.charCodeAt(0)] = bmp;
}
Speaker.prototype.clear = function(){
	if (this.currentContainer != undefined){
		this.currentStage.removeChild(this.currentContainer);
		this.currentContainer = undefined;
	}
	if (this.idto != undefined){
		clearTimeout(this.idto);
	}

}

Speaker.prototype.speak = function(stage,px,py,widthAreaSpeech,aSentence,callback,lCenter){
	this.index = 0;
	this.aSentence = aSentence;
	this.px = px;
	this.py = py;
	this.widthAreaSpeech = widthAreaSpeech;
	this.currentStage = stage;
	if (Pqp.isNull(callback)){
		this.callback = undefined;
	}else{
		this.callback = Pqp._globalOrContextualized(callback);
	}
	if (Pqp.isNull(lCenter)){
		this.lCenter = true;
	}else{
		this.lCenter = lCenter;
	}
	this.speakNextSentence();
	return this.currentContainer;
}


Speaker.prototype.speakNextSentence = function(){
	if (this.index < this.aSentence.length){
		this.speakSingle(this.aSentence[this.index]);
	}else{
		if (this.callback != undefined){
			this.callback.callback.call(this.callback.ct);
		}
	}
}


Speaker.prototype.speakSingle = function(speech){
	var sentence = speech.msg;
	var container = new createjs.Container();
	var posx = 0;
	var righe = new Array();
	var riga = new createjs.Container();
	var righeWidth = new Array();
	for (var x=0;x<sentence.length;x++){
		var c = sentence.charAt(x);
		if ((c == "\n") || (c=="\r")){
			righeWidth.push(posx);
			righe.push(riga);
			posx = 0;
			riga = new createjs.Container();
		}else{
			var ref = this.aLetters[c.charCodeAt(0)];
			if (ref != undefined){
				var bmp = ref.clone();
				bmp.sourceRect = ref.sourceRect;
				bmp.x = posx;
				bmp.y = 0;
				this.adjustY(c,bmp);
				var w = bmp.sourceRect.width;
				var h = bmp.sourceRect.height;
				posx+=w;
				riga.addChild(bmp);
			}
		}
	}
	righeWidth.push(posx);
	righe.push(riga);

	//
	var maxLen = this.widthAreaSpeech*Const.MOB;
	var indice = 0;
	for (var z=0;z<righeWidth.length;z++){
		var len = righeWidth[z];
		if (len > maxLen){
			indice = z;
			maxLen = len;
		}
	}
	this.numRighe = righe.length

	for (var y=0;y<righe.length;y++){
		riga = righe[y]
		riga.y = this.interlinea*Const.MOB*y;
		if (this.lCenter){
			riga.x = (Math.floor(maxLen-righeWidth[y])/2);
		}
		container.addChild(riga);
	}
	this.currentStage.addChild(container);
	container.x = Math.floor(this.px*Const.MOB);
	container.y = Math.floor(this.py*Const.MOB);

	this.currentContainer = container;

	if (speech.callback != undefined){
		// Chiama la callback di "inizio speech"
		speech.callback.callback.call(speech.callback.ct,Speech.INIZIO);
	}

	if (speech.autoDisappear){
		var ct = this;
		this.idto = setTimeout(function(){ct.preEndSpeech(ct,speech)} , this.calcolaTempoSpeech(speech));
		if (speech.canSkip){
			this.setSkipListeners(true,speech);
		}
	}

}
Speaker.prototype.preEndSpeech = function(ct,speech){
	ct.endCurrentSpeech(speech);
}
Speaker.prototype.endCurrentSpeech = function(speech){
	if (this.idto != undefined){
		clearTimeout(this.idto);
	}
	if (speech.callback != undefined){
		// Chiama la callback di "fine speech"
		speech.callback.callback.call(speech.callback.ct,Speech.FINE);
	}
	if (speech.canSkip){
		this.setSkipListeners(false);
	}

	this.clear();

	if (speech.pauseAtEnd > 0){
		var ct = this;
		this.idto = setTimeout(function(){ct.preNextSentence(ct)} , speech.pauseAtEnd);
	}else{
		this.index++;
		this.speakNextSentence();
	}
}

Speaker.prototype.preNextSentence = function(ct){
	ct.index++;
	ct.speakNextSentence();
}

Speaker.prototype.calcolaTempoSpeech = function(speech){
	var s = speech.msg;
	var n = s.length*Const.TEMPO_PER_LETTERA;
	if (n < Const.TEMPO_MINIMO_VISUALIZZAZIONE){
		return Const.TEMPO_MINIMO_VISUALIZZAZIONE
	}
	return n;
}

Speaker.prototype.adjustY = function(c,bmp){
	// to override

}

Speaker.prototype.setSkipListeners = function(lActive,speech){
	if (lActive){
		Pqp.addClick(jQuery(document),this.skipSpeech,{speech:speech,ct:this});
	}else{
		Pqp.removeClick(jQuery(document));
	}
}

Speaker.prototype.skipSpeech = function(e){
	e.bag.ct.endCurrentSpeech(e.bag.speech);
}

