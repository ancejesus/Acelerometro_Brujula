//actions {} <>
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});
//Podemos usar $(function()
$(document).ready(function() { //Preguntamos si las librerias de Phonegap ya estan cargadas
    document.addEventListener("deviceready",function(){
		$('ul.individual li').tap(function(){accion($(this));});
	},false);	
//alert($(this).parents('.page').attr('id')); //Obtenemos el id del padre del boton pulsado
});

function accion(obj){
	var i = obj.index();
	var p = obj.parents('.page').attr('id');
	
	if(i==0){ //Si fue el boton iniciar
		iniciar(p);
	}else if(i==1){ //Si fue el boton detener
		detener(p);
	} 
//	alert(i+'\n'+p); //Imprimimos lo pulsado
}

function iniciar(p){
	if(p=='acelerometro'){
	function onSuccess(acceleration) {
		$('#'+p+' h2').html('X: '+acceleration.x+' <br>'+
							'Y: '+acceleration.y+' <br>'+
							'Z: '+acceleration.z);
		};
		
		function onError() {
			alert('onError!');
		};
		
			var options = { frequency: 500 };  // Update every 3 seconds
		
			watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	}else if(p=='brujula'){
		function onBrujula(heading) {
			$('#'+p+' h2').html('Posición Magnetica: '+heading.magneticHeading+' <br>'+
								'Posición Real: '+heading.trueHeading+' <br>'+
								'Precisión: '+heading.headingAccuracy);
		};
		watchID = navigator.compass.watchHeading(onBrujula, onError, options);
		}		
}

function detener(p){
	if(watchID){
		if(p=='acelerometro'){
		navigator.accelerometer.clearWatch(watchID);
		}else if (p=='brujula'){
		navigator.compass.clearWatch(watchID);
		}
		watchID=null;
		$('#'+p+' h2').html('Detenido');
	}
}