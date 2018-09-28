SceltaMultipla = function(aOpzioni,stage,x,y,width,height,callback){
	this.aOpzioniOriginale = aOpzioni.slice();
	this.aOpzioni = this.aggiustaOpzioni(aOpzioni);
	this.stage = stage;
	this.x = x*Const.MOB;
	this.y = y*Const.MOB;
	this.width = width*Const.MOB;
	this.height = height*Const.MOB;
	this.aSpeakers = new Array();
	this.callback = Pqp._globalOrContextualized(callback);
	this.aScelte = new Array();
	this.area = undefined;
	this.mask = undefined;
	this.totRighe = 0;
	this.upArrow = undefined;;
	this.downArrow = undefined;;
	this.index = 0;

}

SceltaMultipla.prototype.init = function(){
	this.createSpeakers();
	this.creaScelte();
	this.creaMaschera();
	if (this.totRighe  > 6){
		this.spostaRighe();
		this.creaFrecce();
		this.setFrecce();
	}
	this.setListeners();
}

SceltaMultipla.prototype.aggiustaOpzioni = function(a){
	for (var x=0;x<a.length;x++){
		a[x] = Lng.safeReplace(a[x],"\n"," ");
		a[x] = Lng.safeReplace(a[x],"§","\n");
	}
	return a;
}

SceltaMultipla.prototype.createSpeakers = function(){
	this.aSpeakers = new Array();
	for (var x=0;x<this.aOpzioni.length;x++){
		this.aSpeakers.push(createSpeakerPiccole(ib.getImageById("imgFontPiccole")));
	}
}

SceltaMultipla.prototype.creaScelte = function(){
	this.aScelte = new Array();
	var cnt = undefined;
	var righe = 0;
	this.area = new createjs.Container();

	for (var x=0;x<this.aOpzioni.length;x++){
		var speaker = this.aSpeakers[x];
		var speech = new Speech(this.aOpzioni[x])
		var frase = new createjs.Container();

		if (cnt != undefined){
			var oldSpeaker = this.aSpeakers[x-1];
			righe += oldSpeaker.numRighe;
		}
		frase.y = righe * speaker.interlinea*Const.MOB;
		cnt = speaker.speak(this.stage,0,0,this.width,[speech],undefined,false);

		// Crea il riempimento
		var g = new createjs.Graphics();
		g.beginFill("#000000");
		g.rect(0,0,this.width,speaker.numRighe*speaker.interlinea)*Const.MOB;
		var sh = new createjs.Shape(g);
		var hit = new createjs.Container();
		hit.addChild(sh);
		frase.addChild(hit);
		frase.addChild(cnt);
		cnt.mouseEnabled = false;

		frase.nWidth = this.width;
		frase.nHeight = speaker.numRighe*speaker.interlinea*Const.MOB;
		frase.mcHit = hit;
		frase.mcHit.ct = frase;
		frase.mcOut = cnt;
		frase.ct = this;
		frase.quale = x;
		frase.numRighe = speaker.numRighe;

		this.aScelte.push(frase);
		this.area.addChild(frase);
	}
	righe += this.aSpeakers[this.aSpeakers.length-1].numRighe;

	this.totRighe = righe;
	this.area.y = this.y;
	this.area.x = this.x;
	this.stage.addChild(this.area);
}

SceltaMultipla.prototype.spostaRighe = function(){
	this.area.x += 64*Const.MOB;
}


SceltaMultipla.prototype.creaMaschera = function(){
	this.mask = new createjs.Container();
	var g = new createjs.Graphics();
	g.beginFill("#000000");
	g.rect(0,0,this.width,this.height);
	this.mask = new createjs.Shape(g);
	this.mask.y = this.y;
	this.mask.x = this.x;
	this.area.mask = this.mask;
}

SceltaMultipla.prototype.setListeners = function(){
	this.stage.enableMouseOver(Const.CHECK_MOUSE_OVER);
	for (var x=0;x<this.aScelte.length;x++){
		var scelta = this.aScelte[x];
		scelta.overColor = new createjs.ColorFilter(0,0,0,1,216,80,216);
		scelta.mcOut.cache(0,0,scelta.nWidth,scelta.nHeight);
		scelta.mcHit.onMouseOver = function(e){
			this.ct.mcOut.filters = [this.ct.overColor];
			this.ct.mcOut.updateCache();
			//this.ct.ct.stage.ct.css("cursor","pointer");
			jQuery(this.ct.ct.stage.canvas).css("cursor","pointer");
		}
		scelta.mcHit.onMouseOut = function(e){
			this.ct.mcOut.filters = null;
			this.ct.mcOut.updateCache();
			//this.ct.ct.stage.ct.css("cursor","default");
			jQuery(this.ct.ct.stage.canvas).css("cursor","default");
		}
		scelta.mcHit.onClick = function(e){
			this.ct.ct.clicked(this.ct.quale);
		}
	}
}

SceltaMultipla.prototype.clicked = function(quale){
	var ct = this;
	setTimeout(function(){ct.callCallback(ct,quale)} , 100);
}

SceltaMultipla.prototype.callCallback = function(ct,quale){
	ct.callback.callback.call(ct.callback.ct,quale,ct.aOpzioniOriginale[quale]);
	ct.destroy();
}

SceltaMultipla.prototype.destroy = function(){
	jQuery(this.stage.canvas).css("cursor","default");
	this.stage.enableMouseOver(0);
	this.stage.removeChild(this.area);
	for (var x=0;x<this.aScelte.length;x++){
		var scelta = this.aScelte[x];
		scelta.onMouseOver = undefined;
		scelta.onMouseOut = undefined;
		scelta.onClick = undefined;
	}
	if (this.totRighe  > 6){
		this.upArrow.onMouseOver = undefined;
		this.upArrow.onMouseOut = undefined;
		this.upArrow.onClick = undefined;
		this.downArrow.onMouseOver = undefined;
		this.downArrow.onMouseOut = undefined;
		this.downArrow.onClick = undefined;
		this.stage.removeChild(this.upArrow);
		this.stage.removeChild(this.downArrow);
	}

	this.aOpzioni = new Array();
	this.aScelte = new Array();
	this.aSpeakers = new Array();
	this.mask = undefined;
	this.callback = undefined;
	this.upArrow = undefined;
	this.downArrow = undefined;

}


SceltaMultipla.prototype.creaFrecce = function(){

	// Freccia su
	var up = new createjs.Container();
	var tmpSpeaker = createSpeakerPiccole(ib.getImageById("imgFontPiccole"));
	var p0 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("[")],undefined,false);
	var p1 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("]")],undefined,false);
	var p2 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("^")],undefined,false);
	var p3 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("=")],undefined,false);
	var cnt = new createjs.Container();
	cnt.addChild(p0);
	cnt.addChild(p1);
	cnt.addChild(p2);
	cnt.addChild(p3);
	p1.x = 24*Const.MOB
	p2.y = 20*Const.MOB
	p3.x = 24*Const.MOB
	p3.y = 20*Const.MOB
	up.addChild(cnt);
	up.y = this.y;
	up.x = this.x;

	// Crea il riempimento
	var g = new createjs.Graphics();
	g.beginFill("#000000");
	g.rect(0,0,48*Const.MOB,56*Const.MOB);
	var sh = new createjs.Shape(g);
	var hit = new createjs.Container();
	hit.addChild(sh);
	up.addChildAt(hit,0);
	up.mcHit = hit;
	up.mcOut = cnt;
	up.mcHit.ct = up;
	up.ct = this;

	// Aggiunge gli eventi
	up.overColor = new createjs.ColorFilter(0,0,0,1,216,80,216);
	up.mcOut.cache(0,0,48*Const.MOB,56*Const.MOB);

	up.mcHit.onMouseOver = function(){
		this.ct.mcOut.filters = [this.ct.overColor];
		this.ct.mcOut.updateCache();
		//this.ct.ct.stage.ct.css("cursor","pointer");
		jQuery(this.ct.ct.stage.canvas).css("cursor","pointer");
	}
	up.mcHit.onMouseOut = function(){
		this.ct.mcOut.filters = null;
		this.ct.mcOut.updateCache();
		//this.ct.ct.stage.ct.css("cursor","default");
		jQuery(this.ct.ct.stage.canvas).css("cursor","default");
	}
	up.mcHit.onClick = function(){
		this.ct.ct.clickedArrowUp();
	}


	this.stage.addChild(up);

	// Freccia giu
	var down = new createjs.Container();
	p0 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("^")],undefined,false);
	p1 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("=")],undefined,false);
	p2 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("{")],undefined,false);
	p3 = tmpSpeaker.speak(this.stage,0,0,24,[new Speech("}")],undefined,false);
	cnt = new createjs.Container();
	cnt.addChild(p0);
	cnt.addChild(p1);
	cnt.addChild(p2);
	cnt.addChild(p3);
	p1.x = 24*Const.MOB
	p2.y = 20*Const.MOB
	p3.x = 24*Const.MOB
	p3.y = 20*Const.MOB
	down.addChild(cnt);
	down.y = this.y+this.height-56*Const.MOB;
	down.x = this.x;

	g = new createjs.Graphics();
	g.beginFill("#000000");
	g.rect(0,0,48*Const.MOB,56*Const.MOB);
	sh = new createjs.Shape(g);
	hit = new createjs.Container();
	hit.addChild(sh);
	down.addChildAt(hit,0);
	down.mcHit = hit;
	down.mcOut = cnt;
	down.mcHit.ct = down;
	down.ct = this;

	// Aggiunge gli eventi
	down.overColor = new createjs.ColorFilter(0,0,0,1,216,80,216);
	down.mcOut.cache(0,0,48*Const.MOB,56*Const.MOB);

	down.mcHit.onMouseOver = function(){
		this.ct.mcOut.filters = [this.ct.overColor];
		this.ct.mcOut.updateCache();
		//this.ct.ct.stage.ct.css("cursor","pointer");
		jQuery(this.ct.ct.stage.canvas).css("cursor","pointer");
	}
	down.mcHit.onMouseOut = function(){
		this.ct.mcOut.filters = null;
		this.ct.mcOut.updateCache();
		//this.ct.ct.stage.ct.css("cursor","default");
		jQuery(this.ct.ct.stage.canvas).css("cursor","default");
	}
	down.mcHit.onClick = function(){
		this.ct.ct.clickedArrowDown();
	}

	this.stage.addChild(down);

	this.upArrow = up;
	this.downArrow = down;


}

SceltaMultipla.prototype.clickedArrowUp = function(){
	var interlinea = this.aSpeakers[0].interlinea*Const.MOB;
	var a = this.aScelte;
	var newy = a[0].y + a[0].numRighe * interlinea
	for (var x=0;x<a.length;x++){
		var scelta = a[x];
		scelta.y = newy;
		newy += scelta.numRighe * interlinea;
	}
	this.index--;
	this.setFrecce();
}

SceltaMultipla.prototype.clickedArrowDown = function(){
	var interlinea = this.aSpeakers[0].interlinea*Const.MOB;
	var a = this.aScelte;
	var newy = a[0].y - a[0].numRighe * interlinea
	for (var x=0;x<a.length;x++){
		var scelta = a[x];
		scelta.y = newy;
		newy += scelta.numRighe * interlinea;
	}
	this.index++;
	this.setFrecce();
}

SceltaMultipla.prototype.setFrecce = function(){
	this.upArrow.visible = true;
	this.downArrow.visible = true;
	if (this.index == 0){
		this.upArrow.visible = false;
		this.stage.ct.css("cursor","default");
	}
	if (this.index+6 == this.totRighe){
		this.downArrow.visible = false;
		this.stage.ct.css("cursor","default");
	}
}