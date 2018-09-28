function initPreloaderApp(){
/*  var mc = $("#preloaderApp #mcClip");
  var div = $("#preloaderApp");
  var newx = Math.floor((div.width()-mc.width())/2);
  var newy = Math.floor((div.height()-mc.height())/2);
	trace(newx);
	trace(newy);
  mc.css({position:"absolute"});
  mc.css({left:newx,top:newy});*/
  Global._preloaderApp = $(".preloaderApp");
}

function hidePreloaderapp(){
  Global._preloaderApp.hide();
}

function showPreloaderapp(){
  Global._preloaderApp.show();
}