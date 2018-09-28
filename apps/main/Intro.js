Intro = function(stage,ib,callback){
	this.stage = stage;
	this.endIntro = callback;
	this.background = undefined;
	this.animFuoco = undefined;
	this.ib = ib;
	this.animPirataDx = undefined;
	this.animPirataSx = undefined;
	this.animGuybrush = undefined;
	this.speakPiDx = undefined;
	this.speakPiSx = undefined;
	this.speakGuy = undefined;
	this.speaker = undefined;
	this.pirataDx = undefined;
	this.pirataSx = undefined;
	this.guybrush = undefined;
	this.opzioneScelta = -1;
	this.speakerIstruzioni = undefined;
	this.mcIstruzioni = undefined;
	this.idsi = undefined;
}

Intro.TIME_TO_WAIT_BEFORE_SHOW_CAMPFIRE = 6000;


Intro.prototype.start = function(){
	this.speaker = createSpeakerGrandiGrandi(this.ib.getImageById("imgFontGrandiGrandi"));
	this.createBackground(this.ib.getImageById("imgScabb"));
	this.createFireAnimation(this.ib.getImageById("imgFuocherello"));
	this.startIntroAudio();
	this.showPreludeText();
}


Intro.prototype.createBackground = function(background){
	this.background = new createjs.Bitmap(background);
	this.stage.addChild(this.background);
}

Intro.prototype.createFireAnimation = function(img){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [img],
		frames: {width: 32*Const.MOB, height: 128*Const.MOB, regX: 0, regY: 0},
		animations: {
			brucia: {
				frames: [0,1,2,3,4],
				frequency: Math.floor(14*Const.MFPS)
			}
		}
	});
	this.animFuoco = new createjs.BitmapAnimation(sheet);
	this.animFuoco.gotoAndPlay("brucia");
	this.animFuoco.x = 644*Const.MOB;
	this.animFuoco.y = 432*Const.MOB;

	this.stage.addChild(this.animFuoco);
}

Intro.prototype.startIntroAudio = function(){
	if (!lMobile){
		var intro = jQuery("#audioIntro audio");
		intro.get(0).play();
	}
}

Intro.prototype.showPreludeText = function(){
	var speech = new Speech(Lng.ln("intro"))
	//this.speaker.speak(this.stage,176,648,0,[speech],{ct:this, callback:this.endPreludeText});
	this.speaker.speak(this.stage,0,648,1280,[speech],{ct:this, callback:this.endPreludeText});
	var mc = this.speaker.currentContainer;
	mc.alpha = 0;

	TweenMax.to(mc,0.5,{delay:2,alpha:1,onComplete:this.preShowCampfire,onCompleteParams:[this]});
	// QPQ
	//this.showCampfire(this);

}

Intro.prototype.endPreludeText = function(){
	// Non entra qui, lo lascio solo per ricordarmi la struttura
}

Intro.prototype.preShowCampfire = function(ct){
	setTimeout(function(){ct.showCampfire(ct)} , Intro.TIME_TO_WAIT_BEFORE_SHOW_CAMPFIRE);
}

Intro.prototype.showCampfire = function(ct){
	ct.animFuoco.stop();
	ct.stage.removeChild(this.background);
	ct.stage.removeChild(this.animFuoco);
	ct.createBackground(this.ib.getImageById("imgRoom5"));
	ct.createCampfireAnimation(this.ib.getImageById("imgFuoco"));
	ct.speaker.clear();
	ct.creaProtagonisti();
	ct.creaSpeakers();
	ct.creaCostume();
	ct.initDialoghi();
}


Intro.prototype.createCampfireAnimation = function(img){
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

Intro.prototype.creaProtagonisti = function(){
	this.creaPirataDx();
	this.creaPirataSx();
	this.creaGuybrush();
}

Intro.prototype.creaPirataDx = function(){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgPir2Campfire")],
		frames: {width: 352*Const.MOB, height: 288*Const.MOB, regX: 0, regY: 0},
		animations: {
			idle_dx: {
				frames: [0,0],
				frequency: Math.floor(120*Const.MFPS),
				next: "idle_dx_step1"
			},
			idle_dx_step1: {
				frames: [1,1],
				frequency: Math.floor(4*Const.MFPS),
				next: "idle_dx"
			},
			speak_dx: {
				//frames: [2,3,4,0,3,4,2,5,6,5],
				frames: [2,3,4,3,4,0,2,5,6,5,6,5],
				frequency: Math.floor(6*Const.MFPS)
			},
			idle_sx: {
				frames: [7,7],
				frequency: Math.floor(120*Const.MFPS),
				next: "idle_sx_step1"
			},
			idle_sx_step1: {
				frames: [8,8],
				frequency: Math.floor(4*Const.MFPS),
				next: "idle_sx"
			},
			speak_sx: {
				frames: [9,10,11,10,11,7,9,12,13,12,13,12],
				frequency: Math.floor(4*Const.MFPS)
			}
		}
	});
	this.animPirataDx = new createjs.BitmapAnimation(sheet);
	this.animPirataDx.gotoAndPlay("idle_dx");
	this.animPirataDx.x = 612*Const.MOB;
	this.animPirataDx.y = 120*Const.MOB;
	this.stage.addChild(this.animPirataDx);
}

Intro.prototype.creaPirataSx = function(){
	var sheet
	sheet = new createjs.SpriteSheet({
		images: [this.ib.getImageById("imgPir1Campfire")],
		frames: {width: 320*Const.MOB, height: 352*Const.MOB, regX: 0, regY: 0},
		animations: {
			idle: {
				frames: [0,0],
				frequency: Math.floor(120*Const.MFPS),
			},
			speak: {
				frames: [1,2,3,0,2,3,1,4,5,4],
				frequency: Math.floor(6*Const.MFPS)
			}
		}
	});
	this.animPirataSx = new createjs.BitmapAnimation(sheet);
	this.animPirataSx.gotoAndPlay("idle");
	this.animPirataSx.x = 102*Const.MOB;
	this.animPirataSx.y = 132*Const.MOB;
	this.stage.addChild(this.animPirataSx);
}

Intro.prototype.creaGuybrush = function(){
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


Intro.prototype.creaSpeakers = function(){
	this.speakPiDx = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiRosse"));
	this.speakPiSx = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiRosa"));
	this.speakGuy = createSpeakerGrandi(this.ib.getImageById("imgFontGrandiBianche"));
	this.speakerIstruzioni = createSpeakerPiccole(this.ib.getImageById("imgFontPiccoleVerdi"));
}

Intro.prototype.creaCostume = function(){
	this.pirataDx = new Costume(this.stage,this.animPirataDx,this.speakPiDx,70,20);
	this.customizeMethods(this.pirataDx);
	this.pirataSx = new Costume(this.stage,this.animPirataSx,this.speakPiSx,44,4);
	this.guybrush = new Costume(this.stage,this.animGuybrush,this.speakGuy,480,126,800);
}

Intro.prototype.customizeMethods = function(costume){
	costume.prefix = "dx";
	costume.beginSpeak = function(){
		this.anim.gotoAndPlay("speak_"+this.prefix);
	}
	costume.endSpeak = function(){
		this.anim.gotoAndPlay("idle_"+this.prefix);
	}

}

Intro.prototype.initDialoghi = function(){
	this.dialoghiStep0();
	// QPQ
	//this.dialoghiStep13();
}

Intro.prototype.giraPirata = function(prefix){
	this.pirataDx.prefix = prefix;
	this.pirataDx.endSpeak();
}

Intro.prototype.dialoghiStep0 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s0_0"));
	aTmp.push(Lng.ln("intro_s0_1"));
	aTmp.push(Lng.ln("intro_s0_2"));
	this.guybrush.speak(aTmp,{callback:this.dialoghiStep1,ct:this});
}

Intro.prototype.dialoghiStep1 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s1_0"));
	this.pirataSx.speak(aTmp,{callback:this.dialoghiStep2,ct:this});
	this.giraPirata("sx");
}

Intro.prototype.dialoghiStep2 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s2_0"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep3,ct:this});
}

Intro.prototype.dialoghiStep3 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s3_0"));
	this.pirataSx.speak(aTmp,{callback:this.dialoghiStep4,ct:this});
	this.giraPirata("dx");
}

Intro.prototype.dialoghiStep4 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s4_0"));
	aTmp.push(Lng.ln("intro_s4_1"));
	aTmp.push(Lng.ln("intro_s4_2"));
	this.guybrush.speak(aTmp,{callback:this.dialoghiStep5,ct:this});
}

Intro.prototype.dialoghiStep5 = function(){
	this.pirataDx.setNewPos(800,20);
	this.pirataSx.setNewPos(144,36);

	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s5_0"));
	this.pirataSx.speak(aTmp);
	aTmp = new Array();
	aTmp.push(Lng.ln("intro_s5_1"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep6,ct:this});
}

Intro.prototype.dialoghiStep6 = function(){
	this.giraPirata("sx");
	this.pirataDx.setNewPos(400,20);
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s6_0"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep7,ct:this});
}

Intro.prototype.dialoghiStep7 = function(){
	var speech = new Speech(Lng.ln("intro_istruzioni"));
	this.mcIstruzioni = this.speakerIstruzioni.speak(this.stage,0,600,1280,[speech]);
	var ct = this;
	this.idsi = setInterval(function(){ct.intermittenzaIstruzioni(ct)} , 500);

	this.giraPirata("dx");
	var aTmp = new Array();
	this.guybrush.setNewPos(420,126);
	aTmp.push(Lng.ln("intro_s7_0"));
	aTmp.push(Lng.ln("intro_s7_1"));
	aTmp.push(Lng.ln("intro_s7_2"));
	aTmp.push(Lng.ln("intro_s7_3"));
	aTmp.push(Lng.ln("intro_s7_4"));
	aTmp.push(Lng.ln("intro_s7_5"));
	aTmp.push(Lng.ln("intro_s7_6"));
	aTmp.push(Lng.ln("intro_s7_7"));
	aTmp.push(Lng.ln("intro_s7_8"));
	aTmp.push(Lng.ln("intro_s7_9"));
	aTmp.push(Lng.ln("intro_s7_10"));
	aTmp.push(Lng.ln("intro_s7_11"));
	this.guybrush.speak(aTmp,{callback:this.dialoghiStep8,ct:this});
}

Intro.prototype.intermittenzaIstruzioni = function(ct){
	ct.mcIstruzioni.visible = !ct.mcIstruzioni.visible;
}

Intro.prototype.dialoghiStep8 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s8_0"));
	this.pirataSx.speak(aTmp);

	this.giraPirata("sx");
	this.pirataDx.setNewPos(800,20);

	aTmp = new Array();
	aTmp.push(Lng.ln("intro_s8_1"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep9,ct:this},1000);
}


Intro.prototype.dialoghiStep9 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s9_0"));
	this.pirataSx.speak(aTmp);

	this.giraPirata("dx");
	this.pirataDx.setNewPos(700,20);

	aTmp = new Array();
	aTmp.push(Lng.ln("intro_s9_1"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep10,ct:this});
}

Intro.prototype.dialoghiStep10 = function(){
	this.giraPirata("dx");
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s10_0"));
	aTmp.push(Lng.ln("intro_s10_1"));
	aTmp.push(Lng.ln("intro_s10_2"));
	aTmp.push(Lng.ln("intro_s10_3"));
	aTmp.push(Lng.ln("intro_s10_4"));
	aTmp.push(Lng.ln("intro_s10_5"));
	aTmp.push(Lng.ln("intro_s10_6"));
	aTmp.push(Lng.ln("intro_s10_7"));
	this.guybrush.speak(aTmp,{callback:this.dialoghiStep11,ct:this});
}

Intro.prototype.dialoghiStep11 = function(){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s11_0"));
	this.pirataSx.speak(aTmp);

	this.giraPirata("dx");
	this.pirataDx.setNewPos(700,20);

	aTmp = new Array();
	aTmp.push(Lng.ln("intro_s11_1"));
	this.pirataDx.speak(aTmp,{callback:this.dialoghiStep13,ct:this});
}

Intro.prototype.dialoghiStep13 = function(){
	this.giraPirata("dx");
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s12_0"));
	aTmp.push(Lng.ln("intro_s12_1"));
	aTmp.push(Lng.ln("intro_s12_2"));
	aTmp.push(Lng.ln("intro_s12_3"));
	aTmp.push(Lng.ln("intro_s12_4"));
	aTmp.push(Lng.ln("intro_s12_5"));
	this.guybrush.speak(aTmp,{callback:this.showSceltaMultipla,ct:this});
}

Intro.prototype.showSceltaMultipla = function(){
	var ct = this
	setTimeout(function(){ct.showSceltaMultipla1(ct)} , 100);
}

Intro.prototype.showSceltaMultipla1 = function(ct){
	ct.showSceltaMultipla2();
}

Intro.prototype.showSceltaMultipla2 = function(){
	clearInterval(this.idsi);
	this.speakerIstruzioni.clear();
	var aOpzioni = new Array();
	aOpzioni.push(Lng.ln("intro_d0_0"));
	this.sceltaMultipla = new SceltaMultipla(aOpzioni,this.stage,8,576,1280,216,{callback:this.sceltaEffettuata,ct:this});
	this.sceltaMultipla.init();
}

Intro.prototype.sceltaEffettuata = function(n){
	this.opzioneScelta = n;
	var ct = this
	setTimeout(function(){ct.dialoghiStep14(ct)} , 100);
}

Intro.prototype.dialoghiStep14 = function(ct){
	var aTmp = new Array();
	aTmp.push(Lng.ln("intro_s13_0"));
	aTmp.push(Lng.ln("intro_s13_1"));
	aTmp.push(Lng.ln("intro_s13_2"));
	aTmp.push(Lng.ln("intro_s13_3"));
	ct.guybrush.speak(aTmp,{callback:ct.attesa,ct:ct});
}

Intro.prototype.attesa = function(){
	var ct = this;
	setTimeout(function(){ct.endIntroFine(ct)} , 1000);
}

Intro.prototype.endIntroFine = function(){
	this.endIntro.call(null,this.opzioneScelta);
}

Intro.prototype.destroy = function(){
	this.stage.removeChild(this.background);
	this.animFuoco.stop();
	this.stage.removeChild(this.animFuoco);
	this.animPirataDx.stop();
	this.stage.removeChild(this.animPirataDx);
	this.animPirataSx.stop();
	this.stage.removeChild(this.animPirataSx);
	this.animGuybrush.stop();
	this.stage.removeChild(this.animGuybrush);


	this.stage = undefined;
	this.endIntro = undefined;
	this.background = undefined;
	this.animFuoco = undefined;
	this.ib = undefined;
	this.animPirataDx = undefined;
	this.animPirataSx = undefined;
	this.animGuybrush = undefined;
	this.speakPiDx = undefined;
	this.speakPiSx = undefined;
	this.speakGuy = undefined;
	this.speaker = undefined;
	this.speakerIstruzioni = undefined;
	this.mcIstruzioni = undefined;
	this.pirataDx = undefined;
	this.pirataSx = undefined;
	this.guybrush = undefined;
	if (!lMobile){
		var intro = jQuery("#audioIntro audio");
		intro.get(0).pause();
	}

}

