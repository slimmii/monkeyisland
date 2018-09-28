Endtro = function(partita,stage,ib,callback){
	this.partita = partita;
	this.stage = stage;
	this.endIntro = callback;
	this.ib = ib;
	this.background = undefined;
	this.animFuoco = undefined;
	this.animGuybrush = undefined;
	this.speakGuy = undefined;
	this.guybrush = undefined;
}


Endtro.prototype.start = function(){
	this.createBackground(this.ib.getImageById("imgRoom5"));
	var ct = this;
	setTimeout(function(){ct.ritardaStep1(ct)} , 50);

	/*
	this.createBackground(this.ib.getImageById("imgRoom5"));
	this.createCampfireAnimation(this.ib.getImageById("imgFuoco"));
	this.startIntroAudio();
	this.creaProtagonisti();
	this.creaSpeakers();
	this.creaCostume();
	this.initDialoghi();*/

}

Endtro.prototype.ritardaStep1 = function(ct){
	ct.createCampfireAnimation(this.ib.getImageById("imgFuoco"));
	setTimeout(function(){ct.ritardaStep2(ct)} , 50);
}

Endtro.prototype.ritardaStep2 = function(ct){
	setTimeout(function(){ct.ritardaStep3(ct)} , 50);
	ct.startIntroAudio();
	ct.creaProtagonisti();
}
Endtro.prototype.ritardaStep3 = function(ct){
	ct.creaSpeakers();
	ct.creaCostume();
	ct.initDialoghi();
}


Endtro.prototype.createBackground = function(background){
	this.background = new createjs.Bitmap(background);
	this.stage.addChild(this.background);
}


Endtro.prototype.startIntroAudio = function(){
	if (!lMobile){
		var intro = jQuery("#audioIntro audio");
		intro.get(0).currentTime = 0;
		intro.get(0).play();
	}
}


Endtro.prototype.createCampfireAnimation = function(img){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [img],
		frames: {width: 192*Const.MOB, height: 256*Const.MOB, regX: 0, regY: 0},
		animations: {
			brucia: {
				frames: [0,1,2,3,4],
				frequency: Math.floor(6*Const.MFPS)
			}
		}
	});
	this.animFuoco = new createjs.BitmapAnimation(sheet);
	this.animFuoco.gotoAndPlay("brucia");
	this.animFuoco.x = 462*Const.MOB;
	this.animFuoco.y = 224*Const.MOB;

	this.stage.addChild(this.animFuoco);
}

Endtro.prototype.creaProtagonisti = function(){
	this.creaGuybrush();
}

Endtro.prototype.creaGuybrush = function(){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgGuyCampfire")],
		frames: {width: 320*Const.MOB, height: 256*Const.MOB, regX: 0, regY: 0},
		animations: {
			idle: {
				frames: [0,0],
				frequency: Math.floor(120*Const.MFPS),
			},
			speak: {
				frames: [1,2,3,0,2,3,1,4,5,4],
				frequency: Math.floor(7*Const.MFPS)
			}
		}
	});
	this.animGuybrush = new createjs.BitmapAnimation(sheet);
	this.animGuybrush.gotoAndPlay("idle");
	this.animGuybrush.x = 894*Const.MOB;
	this.animGuybrush.y = 244*Const.MOB;
	this.stage.addChild(this.animGuybrush);
}


Endtro.prototype.creaSpeakers = function(){
	this.speakGuy = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiBianche"));

}

Endtro.prototype.creaCostume = function(){
	this.guybrush = new Costume(this.stage,this.animGuybrush,this.speakGuy,380,126,800);
}

Endtro.prototype.initDialoghi = function(){
	this.dialoghiStep0();
}

Endtro.prototype.dialoghiStep0 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("endtro_s0_0"));
	aTmp.push(Lng.ln("endtro_s0_1"));
	aTmp.push(Lng.ln("endtro_s0_2"));
	aTmp.push(Lng.ln("endtro_s0_3"));
	this.guybrush.speak(aTmp,{callback:this.attesa,ct:this});
}

Endtro.prototype.attesa = function(){
	var ct = this;
	setTimeout(function(){ct.scegliCheFare(ct)} , 1000);
}

Endtro.prototype.scegliCheFare = function(){
	var aOpzioni = new Array();
	aOpzioni.push(Lng.ln("endtro_s1_0"));
	aOpzioni.push(Lng.ln("endtro_s1_1"));
	aOpzioni.push(Lng.ln("endtro_s1_2"));
	aOpzioni.push(Lng.ln("endtro_s1_3"));
	aOpzioni.push(Lng.ln("endtro_s1_4"));
	this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.sceltaEffettuata,ct:this});
	this.sceltaMultipla.init();
}

Endtro.prototype.sceltaEffettuata = function(n){
	if (n == 0){
		this.pubblicaSuFb();
	}else if (n == 1){
		this.pubblicaSuTwitter();
	}else if (n == 2){
		this.grazie();
	}else if (n == 3){
		this.endIntroFine();
	}else{
		this.gotogA()
	}
}
Endtro.prototype.grazie = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("grazie_0"));
	aTmp.push(Lng.ln("grazie_1"));
	aTmp.push(Lng.ln("grazie_2"));
	aTmp.push(Lng.ln("grazie_3"));
	aTmp.push(Lng.ln("grazie_4"));
	aTmp.push(Lng.ln("grazie_5"));
	aTmp.push(Lng.ln("grazie_6"));
	aTmp.push(Lng.ln("grazie_7"));
	aTmp.push(Lng.ln("grazie_8"));
	aTmp.push(Lng.ln("grazie_9"));
	aTmp.push(Lng.ln("grazie_10"));
	this.guybrush.speak(aTmp,{callback:this.attesa,ct:this});
}

Endtro.prototype.pubblicaSuFb = function(){
	this.destroy();
	jQuery(location).attr('href',Global.resources.path_share_fb+"?v="+this.partita.vittorie+"&p="+this.partita.sconfitte+"&i="+this.partita.aInsultiImparati.length+"&ln="+Global.LNG+"&lvl="+this.partita.tipo);
}

Endtro.prototype.pubblicaSuTwitter = function(){
	this.destroy();
	var msg = Lng.ln("share_twt");
	jQuery(location).attr('href',Lng.safeReplace(""+Global.resources.path_share_twt,"[msg]",msg));
}


Endtro.prototype.gotogA = function(){
	this.destroy();
	if (Global.LNG == "it"){
		jQuery(location).attr('href',"http://www.genereavventura.com/ita/index.asp");
	}else{
		jQuery(location).attr('href',"http://www.genereavventura.com/eng/index.asp");
	}
}

Endtro.prototype.endIntroFine = function(){
	this.endIntro.call(null);
}

Endtro.prototype.destroy = function(){
	this.stage.removeChild(this.background);
	this.animFuoco.stop();
	this.stage.removeChild(this.animFuoco);
	this.animGuybrush.stop();
	this.stage.removeChild(this.animGuybrush);

	this.stage = undefined;
	this.endIntro = undefined;
	this.background = undefined;
	this.animFuoco = undefined;
	this.ib = undefined;
	this.animGuybrush = undefined;
	this.speakGuy = undefined;
	this.guybrush = undefined;
	if (!lMobile){
		var intro = jQuery("#audioIntro audio");
		intro.get(0).pause();
	}
}

