ImagesBuilder = function(callback,images){
	this.callback = callback;
	this.images = images;
	this.index = 0;
	this.imgTmp = undefined;
	this.built = new Array();
}

ImagesBuilder.prototype.init = function(){
	this.buildNextImage();
}

ImagesBuilder.prototype.buildNextImage = function(){
	if (this.index < this.images.length){
		this.imgTmp = new Image();
		this.imgTmp.onload = this.imageBuilt;
		this.imgTmp.onerror = this.errorBuilt;
		
		this.imgTmp.ct = this;
		this.imgTmp.src = this.images[this.index];
	}else{
		this.callback.call(null,this.built);
	}
}

ImagesBuilder.prototype.errorBuilt = function(){
	trace("Error loading "+this.src);

}
ImagesBuilder.prototype.imageBuilt = function(){
	this.ct.index++;
	this.ct.built.push(this);
	this.ct.buildNextImage();
}

ImagesBuilder.prototype.getImageAt = function(n){
	return this.built[n]
}

ImagesBuilder.prototype.getImageById = function(s){
	if (s.charAt(0) != "#"){
		s = "#"+s;
	}
	var path = jQuery(s).attr("src")
	for (var x=0;x<this.built.length;x++){
		if (this.built[x].src.indexOf(path) > -1){
			return this.built[x];
		}
	}
	return "Error! Can't find id " +s;
}