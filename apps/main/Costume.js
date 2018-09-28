Costume = function(stage,anim,speaker,posx,posy,widthAreaSpeech){
	this.stage = stage;
	this.anim = anim;
	this.speaker = speaker;
	this.posx = posx
	this.posy = posy;
	this.widthAreaSpeech = widthAreaSpeech;
	if (Pqp.isNull(widthAreaSpeech)){
		this.widthAreaSpeech = 0;
	}
	this.callbackAzione = undefined;
	
	
}

Costume.prototype.speak = function(aMsg,callback,pauseAtEnd){
	if (Pqp.isNull(callback)){
		this.callback = undefined;
	}else{
		this.callback = Pqp._globalOrContextualized(callback);
	}
	var aTmp = new Array();
	for (var x=0;x<aMsg.length;x++){
		var speech = new Speech(aMsg[x],null,true,true,this);
		aTmp.push(speech);
	}
	if (Pqp.isNull(pauseAtEnd)){
		aTmp[aTmp.length-1].pauseAtEnd = 100;
	}else{
		aTmp[aTmp.length-1].pauseAtEnd = pauseAtEnd;
	}
	aTmp[aTmp.length-1].callback = {callback:this.endLastSpeech,ct:this};
	this.speaker.speak(this.stage,this.posx,this.posy,this.widthAreaSpeech,aTmp,{callback:this.endSpeech,ct:this});
	this.beginSpeak();
}

Costume.prototype.setNewPos = function(newx,newy){
	this.posx = newx;
	this.posy = newy;
}

Costume.prototype.setNewAreaSpeak = function(widthAreaSpeech){
	this.widthAreaSpeech = widthAreaSpeech;
}


Costume.prototype.endLastSpeech = function(n){
	if (n == Speech.FINE){
		this.endSpeak();
	}
}

Costume.prototype.beginSpeak = function(){
	this.anim.gotoAndPlay("speak");
}

Costume.prototype.endSpeak = function(){
	this.anim.gotoAndPlay("idle");
}
Costume.prototype.endSpeech = function(){
	this.endSpeak();
	if (this.callback != undefined){
		this.callback.callback.call(this.callback.ct,this.callback.ct);
	}
}

Costume.prototype.animazioneFinita = function(anim,name){
	if (this.callbackAzione != undefined){
		this.callbackAzione.callback.call(this.callbackAzione.ct,this,anim,name);
	}
}