Partita = function(tipo){
	this.tipo = tipo;
	this.piratiSconfitti = 3;
	this.sfide = new Array(0,0,0,0,0);
	this.currentSfidante = 0;
	this.carlaFirstTime = true;
	this.aInsulti = new Array();
	this.aInsultiImparati = new Array();
	this.aStandardAttacco = new Array();
	this.aStandardDifesa = new Array();
	this.turniWon = 0;
	this.turniLost = 0;
	this.vittorie = 0;
	this.sconfitte = 0;


}

Partita.prototype.init = function(){
	this.setInsultiImparati();
	this.setInsultiStandardAttacco();
	this.setInsultiStandardDifesa();
}

Partita.prototype.setInsultiStandardAttacco = function(){
	for (var x=0;x<4;x++){
		this.aStandardAttacco.push(new Insulto(Lng.ln("mi1_att_std"+x),undefined,undefined,3));
	}
}

Partita.prototype.setInsultiStandardDifesa = function(){
	for (var x=0;x<5;x++){
		this.aStandardDifesa.push(new Insulto(undefined,undefined,Lng.ln("mi1_def_std"+x),4));
	}
}

Partita.prototype.getInsultiStandardAttacco = function(){
	var aRet = new Array();
	for (var x=0;x<this.aStandardAttacco.length;x++){
		aRet.push(this.aStandardAttacco[x].attacco);
	}
	return aRet
}

Partita.prototype.getInsultiStandardDifesa = function(){
	var aRet = new Array();
	for (var x=0;x<this.aStandardDifesa.length;x++){
		aRet.push(this.aStandardDifesa[x].risposta);
	}
	return aRet
}

Partita.prototype.setInsultiImparati = function(){
	this.aInsultiImparati = new Array()
	if (this.tipo != 1){
		this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a7"),Lng.ln("mi1_b7"),Lng.ln("mi1_c7"),2));
		this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a1"),Lng.ln("mi1_b1"),Lng.ln("mi1_c1"),2));
	}

	if (Const.DEBUG_INIZIA_SUBITO_DA_CARLA){
		if (this.tipo != 1){
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a2"),Lng.ln("mi1_b2"),Lng.ln("mi1_c2"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a3"),Lng.ln("mi1_b3"),Lng.ln("mi1_c3"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a4"),Lng.ln("mi1_b4"),Lng.ln("mi1_c4"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a5"),Lng.ln("mi1_b5"),Lng.ln("mi1_c5"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a6"),Lng.ln("mi1_b6"),Lng.ln("mi1_c6"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a0"),Lng.ln("mi1_b0"),Lng.ln("mi1_c0"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a8"),Lng.ln("mi1_b8"),Lng.ln("mi1_c8"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a9"),Lng.ln("mi1_b9"),Lng.ln("mi1_c9"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a10"),Lng.ln("mi1_b10"),Lng.ln("mi1_c10"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a11"),Lng.ln("mi1_b11"),Lng.ln("mi1_c11"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a12"),Lng.ln("mi1_b12"),Lng.ln("mi1_c12"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a13"),Lng.ln("mi1_b13"),Lng.ln("mi1_c13"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a14"),Lng.ln("mi1_b14"),Lng.ln("mi1_c14"),2));
			if (Global.LNG != "it"){
				this.aInsultiImparati.push(new Insulto(Lng.ln("mi1_a15"),Lng.ln("mi1_b15"),Lng.ln("mi1_c15"),2));
			}
		}
		if (this.tipo != 0){
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a0"),Lng.ln("mi3_b0"),Lng.ln("mi3_c0"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a1"),Lng.ln("mi3_b1"),Lng.ln("mi3_c1"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a2"),Lng.ln("mi3_b2"),Lng.ln("mi3_c2"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a3"),Lng.ln("mi3_b3"),Lng.ln("mi3_c3"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a4"),Lng.ln("mi3_b4"),Lng.ln("mi3_c4"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a5"),Lng.ln("mi3_b5"),Lng.ln("mi3_c5"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a6"),Lng.ln("mi3_b6"),Lng.ln("mi3_c6"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a7"),Lng.ln("mi3_b7"),Lng.ln("mi3_c7"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a8"),Lng.ln("mi3_b8"),Lng.ln("mi3_c8"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a9"),Lng.ln("mi3_b9"),Lng.ln("mi3_c9"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a10"),Lng.ln("mi3_b10"),Lng.ln("mi3_c10"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a11"),Lng.ln("mi3_b11"),Lng.ln("mi3_c11"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a12"),Lng.ln("mi3_b12"),Lng.ln("mi3_c12"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a13"),Lng.ln("mi3_b13"),Lng.ln("mi3_c13"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a14"),Lng.ln("mi3_b14"),Lng.ln("mi3_c14"),2));
			this.aInsultiImparati.push(new Insulto(Lng.ln("mi3_a15"),Lng.ln("mi3_b15"),Lng.ln("mi3_c15"),2));
		}

		this.vittorie = 0;
		this.piratiSconfitti = 3;
	}

}

Partita.prototype.addSfidante = function(n){
	this.currentSfidante = n;
	this.sfide[n] = this.sfide[n]+1;
}

Partita.prototype.initInsulti = function(){
	if (this.tipo == 0){
		this.aInsulti = this.getInsulti("mi1_",parseInt(Lng.ln("quanti_mi1")));
	}else if (this.tipo == 1){
		this.aInsulti = this.getInsulti("mi3_",parseInt(Lng.ln("quanti_mi3")));
	}else{
		this.aInsulti = this.getInsulti("mi1_",parseInt(Lng.ln("quanti_mi1")));
		this.aInsulti = this.aInsulti.concat(this.getInsulti("mi3_",parseInt(Lng.ln("quanti_mi3"))));
	}
	this.aInsulti = Pqp.shuffle(this.aInsulti);
	this.marcaInsultiImparati();
}

Partita.prototype.marcaInsultiImparati = function(){
	for (var x=0;x<this.aInsulti.length;x++){
		var n = this.hoImparato(this.aInsulti[x]);
		this.aInsulti[x].owned = n;
	}
}

Partita.prototype.hoImparato = function(o){
	for (var x=0;x<this.aInsultiImparati.length;x++){
		if (this.aInsultiImparati[x].attacco == o.attacco){
			return this.aInsultiImparati[x].owned;
		}
	}
	return 0;
}

Partita.prototype.getInsultoFromAttacco = function(s){
	var a = this.aInsulti;
	for (var x=0;x<a.length;x++){
		if (a[x].attacco == s){
			return a[x];
		}
	}
	trace("Error getInsultoFromAttacco!")
	return null;
}


Partita.prototype.getInsulti = function(pref,n){
	var aRet = new Array();
	for (var x=0;x<n;x++){
		aRet.push(new Insulto(Lng.ln(pref+"a"+x),Lng.ln(pref+"b"+x),Lng.ln(pref+"c"+x)));
	}
	return aRet;
}

Partita.prototype.getXpPerc = function(){
	var tot = this.aInsulti.length;
	var own = this.aInsultiImparati.length;
	// own : tot = x : 100
	var perc = own/tot;
	return perc;
}

Partita.prototype.getXpPercCompleti = function(){
	var tot = this.aInsulti.length;
	var own = 0
	for (var x=0;x<this.aInsultiImparati.length;x++){
		if (this.aInsultiImparati[x].owned == 2){
			own++;
		}
	}
	// own : tot = x : 100
	var perc = own/tot;
	return perc;
}


Partita.prototype.getRispostaGiusta = function(s){
	var a = this.aInsulti;
	for (var x=0;x<a.length;x++){
		if (a[x].attacco == s){
			return a[x].risposta;
		}
	}
	return "Error getRispostaGiusta!";
}

Partita.prototype.indexRispostaAttaccoStandard = function(s){
	var a = this.getInsultiStandardAttacco();
	for (var x=0;x<a.length;x++){
		if (a[x] == s){
			return x;
		}
	}
	return -1;
}

Partita.prototype.indexRispostaDifesaStandard = function(s){
	var a = this.getInsultiStandardDifesa();
	for (var x=0;x<a.length;x++){
		if (a[x] == s){
			return x;
		}
	}
	return -1;
}

Partita.prototype.imparaRisposta = function(s){
	// Controlla se la sa già
	var lFound = false;
	var a = this.aInsultiImparati;
	for (var x=0;x<a.length;x++){
		if (a[x].attacco == s){
			lFound = true;
			if (a[x].owned == 1){
				a[x].owned = 2; // conosce la risposta!
			}
		}
	}
	if (!lFound){
		trace("Error imparaRisposta!");
	}
}

Partita.prototype.imparaInsulto = function(s){
	var a = this.aInsulti;
	var lTrovato = false;
	for (var x=0;x<a.length;x++){
		if (a[x].attacco == s){
			var insulto = a[x];
			lTrovato = true;
			break;
		}
	}
	if (lTrovato){
		lTrovato = false;
		for (var y=0;y<this.aInsultiImparati.length;y++){
			if (this.aInsultiImparati[y].attacco == s){
				lTrovato = true;
				break;
			}
		}
		if (!lTrovato){
			// Lo aggiunge
			this.aInsultiImparati.push(new Insulto(insulto.attacco,insulto.carla,insulto.risposta,1));
		}
	}else{
		trace("Error imparaInsulto!");
	}

}

