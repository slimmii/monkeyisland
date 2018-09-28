SceltaSfidante = function(partita,stage,ib,callback){
	this.partita = partita;
	this.stage = stage;
	this.callback = callback;
	this.ib = ib;
	this.background = undefined;
	this.where = this.setWhere();
	this.attivi = new Array();
	this.speaker = undefined;
	this.speakerIstruzioni = undefined;
	this.tooltip = undefined;
	this.istruzioni = undefined;
	this.nomi = [0,1,2,3];
	this.nomi.push(4);
	this.mcCheat = undefined;
	this.cntCheat = undefined;
}

SceltaSfidante.prototype.setWhere = function(){
	var a = [[166*Const.MOB,284*Const.MOB],[671*Const.MOB,68*Const.MOB],[775*Const.MOB,519*Const.MOB],[493*Const.MOB,412*Const.MOB]];
	var el = [356*Const.MOB,137*Const.MOB];
	a = Pqp.shuffle(a);
	a.push(el);
	return a;
}

SceltaSfidante.prototype.start = function(){
	this.createBackground(this.ib.getImageById("imgRoom85"));
	this.startSceltaAudio();
	this.creaSpeaker();
	this.mostraSfidanti();
	this.mostraIstruzioni();
	this.settaCheat();
}


SceltaSfidante.prototype.startSceltaAudio = function(){
	if (!lMobile){
		var audio = jQuery("#audioScelta audio");
		audio.get(0).currentTime = 0;
		audio.get(0).play();
	}
}

SceltaSfidante.prototype.createBackground = function(background){
	this.background = new createjs.Bitmap(background);
	this.stage.addChild(this.background);
}
SceltaSfidante.prototype.creaSpeaker = function(){
	this.speaker = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiBianche"));
}

SceltaSfidante.prototype.mostraSfidanti = function(){
	this.stage.enableMouseOver(Const.CHECK_MOUSE_OVER);
	for (var x=0;x<this.partita.piratiSconfitti+1;x++){
		this.creaThumbPirata(x);
	}
}

SceltaSfidante.prototype.creaThumbPirata = function(n){
	var coord = this.where[n];
	var img = new createjs.Bitmap(this.ib.getImageById("imgPirataThumb"+n));
	this.stage.addChild(img);
	var cnt = new createjs.Container();
	cnt.addChild(img);

	var g = new createjs.Graphics();
	g.beginFill(createjs.Graphics.getRGB(248,252,80,0.2));
	g.rect(0,0,96*Const.MOB,96*Const.MOB);
	var sh = new createjs.Shape(g);
	cnt.addChild(sh);
	cnt.highlight = sh;
	sh.visible = false;

	cnt.x = Math.floor(coord[0]);
	cnt.y = Math.floor(coord[1]);
	this.attivi.push(cnt);

	this.stage.addChild(cnt);

	cnt.indexNome = this.nomi.shift();
	cnt.quale = n;
	cnt.ct = this;
	cnt.onMouseOver = function(){
		jQuery(this.ct.stage.canvas).css("cursor","pointer");
		//this.ct.stage.ct.css("cursor","pointer");
		this.highlight.visible = true;
		this.ct.mostraNomePirata(this.quale,this.indexNome,true);

	}
	cnt.onMouseOut = function(){
		jQuery(this.ct.stage.canvas).css("cursor","default");
		//this.ct.stage.ct.css("cursor","default");
		this.highlight.visible = false;
		this.ct.mostraNomePirata(this.quale,this.indexNome,false);
	}

	cnt.onClick = function(){
		this.ct.clicked(this.quale);
	}
}

SceltaSfidante.prototype.mostraNomePirata = function(n,indexNome,lShow){
	if (lShow){
		var speech = new Speech(Lng.ln("descPirata"+indexNome))
		var coord = this.where[n];
		this.tooltip = this.speaker.speak(this.stage,coord[0]/Const.MOB-120,coord[1]/Const.MOB+128,340,[speech]);
		this.stage.addChild(this.tooltip);
		//this.istruzioni.visible = false;
	}else{
		this.stage.removeChild(this.tooltip);
		this.tooltip = undefined;
		//this.istruzioni.visible = true;
	}
}

SceltaSfidante.prototype.clicked = function(quale){
	var ct = this;
	this.destroy();
	setTimeout(function(){ct.endSceltaSfidante(ct,quale)} , 100);

}
SceltaSfidante.prototype.endSceltaSfidante = function(ct,quale){
	ct.callback.call(null,quale);
}

SceltaSfidante.prototype.mostraIstruzioni = function(){
	var speech = new Speech(Lng.ln("scelta_istruzioni"))
	this.speakerIstruzioni = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiRosa"));
	this.istruzioni = this.speakerIstruzioni.speak(this.stage,16,8,null,[speech]);
}


SceltaSfidante.prototype.destroy = function(){
	//this.stage.ct.css("cursor","default");
	jQuery(this.stage.canvas).css("cursor","default");

	this.stage.enableMouseOver(0);
	if (!lMobile){
		var audio = jQuery("#audioScelta audio");
		audio.get(0).pause();
	}
	if (this.tooltip != undefined){
		this.mostraNomePirata(0,0,false);
	}
	this.stage.removeChild(this.background);
	this.stage.removeChild(this.istruzioni);
	if (this.mcCheat != undefined){
		this.stage.removeChild(this.mcCheat);
		this.mcCheat = undefined;
	}
	if (this.cntCheat != undefined){
		this.stage.removeChild(this.cntCheat);
		this.cntCheat = undefined;
	}
	for (var x=0;x<this.attivi.length;x++){
		this.stage.removeChild(this.attivi[x]);
		this.attivi[x].onMouseOut = undefined;
		this.attivi[x].onMouseOver = undefined;
		this.attivi[x].onClick = undefined;
	}
	this.attivi = new Array();
	this.stage = undefined;
	this.ib = undefined;
	this.background = undefined;
	this.speaker = undefined;
	this.speakerIstruzioni = undefined;
	this.istruzioni = undefined;

}

SceltaSfidante.prototype.settaCheat = function(){
	if (!Const.cheatOn){
		this.stage.enableMouseOver(50);
		this.creaHitArea();
	}
}

SceltaSfidante.prototype.creaHitArea = function(){
	var cnt = new createjs.Container();
	var g = new createjs.Graphics();
	g.beginFill(createjs.Graphics.getRGB(248,252,80,1));
	if (lMobile){
		g.rect(0,0,60*Const.MOB,60*Const.MOB);
	}else{
		g.rect(0,0,20*Const.MOB,20*Const.MOB);
	}

	var sh = new createjs.Shape();
	sh.hitArea = new createjs.Shape(g);
	cnt.addChild(sh);
	cnt.ct = this;
	cnt.x = 1092*Const.MOB;
	cnt.y = 414*Const.MOB;
	cnt.onClick = function(){
		this.ct.clickedCheat(this,this.ct);
	}
	cnt.onMouseOver = function(){
		jQuery(this.ct.stage.canvas).css("cursor","pointer");
	}
	cnt.onMouseOut = function(){
		if (this.ct.stage != undefined){
			jQuery(this.ct.stage.canvas).css("cursor","default");
		}
	}
	this.cntCheat = cnt;
	this.stage.addChild(cnt);
}

SceltaSfidante.prototype.clickedCheat = function(cnt,ct){
	Const.cheatCount++;
	if (Const.cheatCount == 3){
		Const.cheatOn = true;
		Const.cheatAttivo();
		ct.stage.removeChild(cnt);
		for (var x=0;x<this.attivi.length;x++){
			this.attivi[x].onMouseOut = undefined;
			this.attivi[x].onMouseOver = undefined;
			this.attivi[x].onClick = undefined;
		}
		var speech = new Speech("Cheat on!")
		ct.mcCheat = this.speakerIstruzioni.speak(this.stage,972,360,null,[speech]);
		setTimeout(onCheat,2000);
	}
}
