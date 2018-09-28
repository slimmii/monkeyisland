var ID_DEMO = "mi";
var imagesToLoad = new Array();
var stage;
var ib;
var background;
var guybrush;
var intro;
var round;
var sceltaSfidante;
var tipoPartita = 0;
var lMobile = false;
var endtro;
var aRif;

function appReady(){
  Global._app.hide();
	showPreloaderapp();
	setArrayImmagini();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		lMobile = true;
	}
	//lMobile = true;
	jQuery("#strMobile").hide();


	if (lMobile){
		setNewPositions();
		sorry();
	}else{
		Const.MOB = 1;
		if ((jQuery.browser.msie)  && (parseInt(jQuery.browser.version, 10) <= 8)) {
			jQuery(".lblLoader").text(Lng.ln("sorrynoieprimadi9"));
		}else{
			immaginiGrandi();
		}
	}
}

function setNewPositions(){
	var w = jQuery("#stage").attr("width");
	var h = jQuery("#stage").attr("height");
	jQuery("#stage").attr({width:w*Const.MOB,height:h*Const.MOB});
	//jQuery("#stage").width(w/2);
	//jQuery("#stage").height(h/2);

	var top = jQuery("#altro").css("top");
	top = parseInt(top)
	jQuery("#altro").css("top",(top-h*(1-Const.MOB))+"px");
	w = jQuery("#divlng").width();
	jQuery("#divlng").css("width",(w*Const.MOB)+"px");

	w = jQuery(".mainApp").width();
	jQuery(".mainApp").css("width",(w*Const.MOB)+"px");

	jQuery("#altro").hide();

	jQuery("#strMobile").show();
	jQuery("#strMobile").html(Lng.ln("smallspsh"));



}

function setArrayImmagini(){
	aRif = new Array();
	aRif.push("img/guybrush.png");
	aRif.push("img/carla.png");
	aRif.push("img/pirata0.png");
	aRif.push("img/pirata1.png");
	aRif.push("img/pirata2.png");
	aRif.push("img/pirata3.png");
	aRif.push("img/room049.png");
	aRif.push("img/room044.png");
	aRif.push("img/room005.png");
	aRif.push("img/room085.png");
	aRif.push("img/scabb.png");
	aRif.push("img/fuocherello.png");
	aRif.push("img/sequenzaFuoco.png");
	aRif.push("img/fontPiccole.png");
	aRif.push("img/fontPiccoleVerdi.png");
	aRif.push("img/fontGrandiGrandi.png");
	aRif.push("img/fontGrandiBianche.png");
	aRif.push("img/fontGrandiGialle.png");
	aRif.push("img/fontGrandiGrigie.png");
	aRif.push("img/fontGrandiRosa.png");
	aRif.push("img/fontGrandiRosse.png");
	aRif.push("img/fontGrandiRosseAlt.png");
	aRif.push("img/fontGrandiVerdi.png");
	aRif.push("img/fontGrandiViola.png");

	aRif.push("img/pir1campfire.png");
	aRif.push("img/pir2campfire.png");
	aRif.push("img/guybcampfire.png");
	aRif.push("img/pirataThumb0.png");
	aRif.push("img/pirataThumb1.png");
	aRif.push("img/pirataThumb2.png");
	aRif.push("img/pirataThumb3.png");
	aRif.push("img/pirataThumb4.png");
	aRif.push("img/carlaGrande0.png");
	aRif.push("img/carlaGrande1.png");
	aRif.push("img/guybrushWin0.png");
	aRif.push("img/guybrushWin1.png");

}

function immaginiGrandi(){
	jQuery("#imgGuybrush").attr("src",aRif[0]);
	jQuery("#imgCarla").attr("src",aRif[1]);
	jQuery("#imgPirata0").attr("src",aRif[2]);
	jQuery("#imgPirata1").attr("src",aRif[3]);
	jQuery("#imgPirata2").attr("src",aRif[4]);
	jQuery("#imgPirata3").attr("src",aRif[5]);
	jQuery("#imgRoom0").attr("src",aRif[6]);
	jQuery("#imgRoom1").attr("src",aRif[7]);
	jQuery("#imgRoom5").attr("src",aRif[8]);
	jQuery("#imgRoom85").attr("src",aRif[9]);
	jQuery("#imgScabb").attr("src",aRif[10]);
	jQuery("#imgFuocherello").attr("src",aRif[11]);
	jQuery("#imgFuoco").attr("src",aRif[12]);
	jQuery("#imgFontPiccole").attr("src",aRif[13]);
	jQuery("#imgFontPiccoleVerdi").attr("src",aRif[14]);
	jQuery("#imgFontGrandiGrandi").attr("src",aRif[15]);
	jQuery("#imgFontGrandiBianche").attr("src",aRif[16]);
	jQuery("#imgFontGrandiGialle").attr("src",aRif[17]);
	jQuery("#imgFontGrandiGrigie").attr("src",aRif[18]);
	jQuery("#imgFontGrandiRosa").attr("src",aRif[19]);
	jQuery("#imgFontGrandiRosse").attr("src",aRif[20]);
	jQuery("#imgFontGrandiRosseAlt").attr("src",aRif[21]);
	jQuery("#imgFontGrandiVerdi").attr("src",aRif[22]);
	jQuery("#imgFontGrandiViola").attr("src",aRif[23]);
	jQuery("#imgPir1Campfire").attr("src",aRif[24]);
	jQuery("#imgPir2Campfire").attr("src",aRif[25]);
	jQuery("#imgGuyCampfire").attr("src",aRif[26]);
	jQuery("#imgPirataThumb0").attr("src",aRif[27]);
	jQuery("#imgPirataThumb1").attr("src",aRif[28]);
	jQuery("#imgPirataThumb2").attr("src",aRif[29]);
	jQuery("#imgPirataThumb3").attr("src",aRif[30]);
	jQuery("#imgPirataThumb4").attr("src",aRif[31]);
	jQuery("#imgCarlaGrande0").attr("src",aRif[32]);
	jQuery("#imgCarlaGrande1").attr("src",aRif[33]);
	jQuery("#imgGuybrushWin0").attr("src",aRif[34]);
	jQuery("#imgGuybrushWin1").attr("src",aRif[35]);
	preloadImages();
}

function sorry(){
	for (var x=0;x<aRif.length;x++){
		aRif[x] = "m_"+aRif[x];
	}
	jQuery("#imgGuybrush").attr("src",aRif[0]);
	jQuery("#imgCarla").attr("src",aRif[1]);
	jQuery("#imgPirata0").attr("src",aRif[2]);
	jQuery("#imgPirata1").attr("src",aRif[3]);
	jQuery("#imgPirata2").attr("src",aRif[4]);
	jQuery("#imgPirata3").attr("src",aRif[5]);
	jQuery("#imgRoom0").attr("src",aRif[6]);
	jQuery("#imgRoom1").attr("src",aRif[7]);
	jQuery("#imgRoom5").attr("src",aRif[8]);
	jQuery("#imgRoom85").attr("src",aRif[9]);
	jQuery("#imgScabb").attr("src",aRif[10]);
	jQuery("#imgFuocherello").attr("src",aRif[11]);
	jQuery("#imgFuoco").attr("src",aRif[12]);
	jQuery("#imgFontPiccole").attr("src",aRif[13]);
	jQuery("#imgFontPiccoleVerdi").attr("src",aRif[14]);
	jQuery("#imgFontGrandiGrandi").attr("src",aRif[15]);
	jQuery("#imgFontGrandiBianche").attr("src",aRif[16]);
	jQuery("#imgFontGrandiGialle").attr("src",aRif[17]);
	jQuery("#imgFontGrandiGrigie").attr("src",aRif[18]);
	jQuery("#imgFontGrandiRosa").attr("src",aRif[19]);
	jQuery("#imgFontGrandiRosse").attr("src",aRif[20]);
	jQuery("#imgFontGrandiRosseAlt").attr("src",aRif[21]);
	jQuery("#imgFontGrandiVerdi").attr("src",aRif[22]);
	jQuery("#imgFontGrandiViola").attr("src",aRif[23]);
	jQuery("#imgPir1Campfire").attr("src",aRif[24]);
	jQuery("#imgPir2Campfire").attr("src",aRif[25]);
	jQuery("#imgGuyCampfire").attr("src",aRif[26]);
	jQuery("#imgPirataThumb0").attr("src",aRif[27]);
	jQuery("#imgPirataThumb1").attr("src",aRif[28]);
	jQuery("#imgPirataThumb2").attr("src",aRif[29]);
	jQuery("#imgPirataThumb3").attr("src",aRif[30]);
	jQuery("#imgPirataThumb4").attr("src",aRif[31]);
	jQuery("#imgCarlaGrande0").attr("src",aRif[32]);
	jQuery("#imgCarlaGrande1").attr("src",aRif[33]);
	jQuery("#imgGuybrushWin0").attr("src",aRif[34]);
	jQuery("#imgGuybrushWin1").attr("src",aRif[35]);
	preloadImages();
}

function preloadImages(){

	imagesToLoad.push(jQuery("#imgGuybrush").attr("src"));
	imagesToLoad.push(jQuery("#imgCarla").attr("src"));
	imagesToLoad.push(jQuery("#imgPirata0").attr("src"));
	imagesToLoad.push(jQuery("#imgPirata1").attr("src"));
	imagesToLoad.push(jQuery("#imgPirata2").attr("src"));
	imagesToLoad.push(jQuery("#imgPirata3").attr("src"));
	imagesToLoad.push(jQuery("#imgRoom0").attr("src"));
	imagesToLoad.push(jQuery("#imgRoom1").attr("src"));
	imagesToLoad.push(jQuery("#imgRoom5").attr("src"));
	imagesToLoad.push(jQuery("#imgRoom85").attr("src"));
	imagesToLoad.push(jQuery("#imgScabb").attr("src"));
	imagesToLoad.push(jQuery("#imgFuocherello").attr("src"));
	imagesToLoad.push(jQuery("#imgFuoco").attr("src"));
	imagesToLoad.push(jQuery("#imgFontPiccole").attr("src"));
	imagesToLoad.push(jQuery("#imgFontPiccoleVerdi").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiGrandi").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiBianche").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiGialle").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiGrigie").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiRosa").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiRosse").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiRosseAlt").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiVerdi").attr("src"));
	imagesToLoad.push(jQuery("#imgFontGrandiViola").attr("src"));
	imagesToLoad.push(jQuery("#imgPir1Campfire").attr("src"));
	imagesToLoad.push(jQuery("#imgPir2Campfire").attr("src"));
	imagesToLoad.push(jQuery("#imgGuyCampfire").attr("src"));
	imagesToLoad.push(jQuery("#imgPirataThumb0").attr("src"));
	imagesToLoad.push(jQuery("#imgPirataThumb1").attr("src"));
	imagesToLoad.push(jQuery("#imgPirataThumb2").attr("src"));
	imagesToLoad.push(jQuery("#imgPirataThumb3").attr("src"));
	imagesToLoad.push(jQuery("#imgPirataThumb4").attr("src"));
	imagesToLoad.push(jQuery("#imgCarlaGrande0").attr("src"));
	imagesToLoad.push(jQuery("#imgCarlaGrande1").attr("src"));
	imagesToLoad.push(jQuery("#imgGuybrushWin0").attr("src"));
	imagesToLoad.push(jQuery("#imgGuybrushWin1").attr("src"));

  jQuery.imgpreload(imagesToLoad,{
		each: imgLoaded,
		all: imagesPreloaded
  },null);
}
var quantiLoaded = 0;
function imgLoaded(){
	quantiLoaded++;
	var perc = Math.floor(quantiLoaded*100/imagesToLoad.length);
	jQuery(".lblLoader").text(Lng.ln("loadSpriteSheet",perc));
}

function imagesPreloaded(){
  setTimeout(buildImages,Const.TEMPO_MINIMO_PRELOADING_2);
}
function initCanvas(){
	var canvas = jQuery("#stage")[0];
	stage = new createjs.Stage(canvas);
	stage.ct = jQuery("#stage");
}

function buildImages(){
	ib = new ImagesBuilder(imagesBuilt,imagesToLoad);
	ib.init();
}

function imagesBuilt(){
	initCanvas();
	initMainLoop();
	startGame();
}

function startGame(){
	if (Const.DEBUG_SALTA_INTRO){
		tipoPartita = Const.DEBUG_TIPO_PARTITA;
		initPartita();
	}else{
		showIntro();
	}
}

function onCheat(){
	sceltaSfidante.destroy();
	showSceltaSfidante();
}

function showIntro(){
	intro = new Intro(stage,ib,introDone);
	intro.start();
}

function introDone(tipo){
	tipoPartita = tipo;
	intro.destroy();
	initPartita();

}

function initPartita(){
	// Rallenta i tempi delle lettere su schermo
	Const.TEMPO_PER_LETTERA = Const.TEMPO_PER_LETTERA_DOPO_INTRO;
	Const.TEMPO_MINIMO_VISUALIZZAZIONE = Const.TEMPO_MINIMO_VISUALIZZAZIONE_DOPO_INTRO;
	partita = new Partita(tipoPartita);
	partita.init();
	if (Const.DEBUG_MOSTRA_SUBITO_FINALE){
		showEndtro();
	}else{
		showSceltaSfidante();
	}
}

function showSceltaSfidante(){
	sceltaSfidante = new SceltaSfidante(partita,stage,ib,sceltaSfidanteDone);
	sceltaSfidante.start();
}

function sceltaSfidanteDone(n){
	partita.addSfidante(n);
	round = new Round(partita,stage,ib,roundDone);
	round.init();
}

function roundDone(esito){

	if (esito == 0){
		// Abbandono
		showSceltaSfidante();
	}else if (esito == 1){
		// Sconfitto
		showSceltaSfidante();
	}else if (esito == 2){
		// vittoria su pirata
		checkIfShowCarla();
		showSceltaSfidante();
	}else if (esito == 3){
		// vittoria su carla
		showEndtro();
	}
}

function checkIfShowCarla(){
	var xp = partita.getXpPercCompleti();
	if (xp > Const.LIVELLO_2){
		if (partita.vittorie >= Const.VITTORIE_MINIME_PER_AFFRONTARE_CARLA){
			partita.piratiSconfitti = 4;
		}
	}
}

function showEndtro(){
	endtro = new Endtro(partita,stage,ib,endtroDone);
	setTimeout(showIt,100)
}
function showIt(){
	endtro.start();
}

function endtroDone(){
	endtro.destroy();
	startGame();
}


function initMainLoop(){
	hidePreloaderapp();
  Global._app.show();
  showLink33();
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(Const.FPS);
}

function tick(){
	stage.update();
}
