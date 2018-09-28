Speech = function(msg,callback,canSkip,autoDisappear,costume,pauseAtEnd){
	this.msg = msg;
	this.canSkip = canSkip;
	if (Pqp.isNull(canSkip)){
		this.canSkip = false;
	}
	this.costume = costume;
	if (Pqp.isNull(costume)){
		this.costume = undefined;
	}
	if (Pqp.isNull(callback)){
		this.callback = undefined;
	}else{
		this.callback = Pqp._globalOrContextualized(callback);
	}
	this.autoDisappear = autoDisappear;
	if (Pqp.isNull(autoDisappear)){
		this.autoDisappear = false;
	}
	this.pauseAtEnd = pauseAtEnd;
	if (Pqp.isNull(pauseAtEnd)){
		this.pauseAtEnd = 0;
	}
}

Speech.prototype.setCallback = function(callback){
	this.callback = Pqp._globalOrContextualized(callback);
}

Speech.INIZIO = 0;
Speech.FINE = 1;