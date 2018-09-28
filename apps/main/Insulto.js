Insulto = function(attacco,carla,risposta,owned){
	this.attacco = attacco;
	this.carla = carla;
	this.risposta = risposta;
	this.owned = owned;
	if (Pqp.isNull(owned)){
		this.owned = 0;
	}
}