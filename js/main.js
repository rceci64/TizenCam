var actions = {
	"titleScreen" : {
		"arrowLeft" : {
			action :  function() { goRegister(); },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onDown : function() { select("arrowDown"); },
			onLeft : function() { goRegister(); }
		},
		"arrowRight" : {
			action :  function() { goInformation(); },
			selected : false,
			onRight : function() { goInformation(); },
			onDown : function() { select("arrowDown"); },
			onLeft : function() { select("arrowLeft"); }
		},
		"arrowDown" : {
			action : function() { goCatalog() },
			selected : false,
			onUp : function() { select("arrowLeft"); },
			onRight : function() { select("arrowRight"); },
			onLeft : function() { select("arrowLeft") },
			onDown : function() { goCatalog() }
		}
	},
	"registerScreen" : {
		"arrowRight" : {
			action :  function() { goTitle(); },
			selected : false,
			onRight : function() { goTitle(); },
			onLeft : function() { select("userInput"); },
			onDown : function() { select("buttonSend"); }
		},
		"userInput" : {
			//action :  function() { goTitle(); },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onDown : function() { select("buttonSend") }
		},
		"buttonSend" : {
			//action :  function() { goTitle(); },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onUp: function() { select("userInput") }
		}
	},
	/*"webcam" : {
		"arrowRight" : {
			action : function() { goInformation(); },
			selected : false,
			onLeft : function() { select("arrowLeft"); },
			onRight : function() { goInformation(); }
		},
		"arrowDown" : {
			action : function() { goCatalog(); },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onLeft : function() { select("arrowLeft"); }
		}
	},*/
	"informationScreen" : {
		"thumbsUp" : {
			action : function() { like(); },
			selected : false,
			onRight : function() { select("thumbsDown"); },
			onLeft : function() { closeInformation(); }
		},
		"thumbsDown" : {
			action : function() { dislike(); },
			selected : false,
			onLeft : function() { select("thumbsUp"); }
		},
		"closeInfo" : {
			action : function() { closeInformation(); }
		}
	},
	"catalogScreen" : {
		"actualPage" : 1,
		"arrowDown" : {
			action : function() { scrollDown(); },
			selected : false,
			onUp : function() { select("element8"); },
			onDown : function() { scrollDown(); }
		},
		"arrowUp" : {
			action : function() { scrollUp(); },
			selected : false,
			onUp : function() { scrollUp(); },
			onDown : function() { select("element2"); }

		},
		"element1" : {
			action : function() { changeWebCam(1); },
			selected : false,
			onUp : function() { select("arrowUp"); },
			onDown : function() { select("element4"); },
			onRight : function() { select("element2"); }
		},
		"element2" : {
			action : function() { changeWebCam(2); },
			selected : false,
			onUp : function() { select("arrowUp"); },
			onDown : function() { select("element5"); },
			onLeft : function() { select("element1") },
			onRight : function() { select("element3") }
		},
		"element3" : {
			action : function() { changeWebCam(3); },
			selected : false,
			onUp : function() { select("arrowUp"); },
			onDown : function() { select("element6"); },
			onLeft : function() { select("element2") }
		},
		"element4" : {
			action : function() { changeWebCam(4); },
			selected : false,
			onUp : function() { select("element1"); },
			onDown : function() { select("element7"); },
			onRight : function() { select("element5"); }
		},
		"element5" : {
			action : function() { changeWebCam(5); },
			selected : false,
			onUp : function() { select("element2"); },
			onDown : function() { select("element8"); },
			onLeft : function() { select("element4") },
			onRight : function() { select("element6") }
		},
		"element6" : {
			action : function() { changeWebCam(6); },
			selected : false,
			onUp : function() { select("element3"); },
			onDown : function() { select("element9"); },
			onLeft : function() { select("element5") }
		},
		"element7" : {
			action : function() { changeWebCam(7); },
			selected : false,
			onUp : function() { select("element4"); },
			onDown : function() { select("arrowDown"); },
			onRight : function() { select("element8") }
		},
		"element8" : {
			action : function() { changeWebCam(8); },
			selected : false,
			onUp : function() { select("element5"); },
			onDown : function() { select("arrowDown"); },
			onLeft : function() { select("element7") },
			onRight : function() { select("element9") }
		},
		"element9" : {
			action : function() { changeWebCam(9); },
			selected : false,
			onUp : function() { select("element6"); },
			onDown : function() { select("arrowDown"); },
			onLeft : function() { select("element8") }
		}
		
	}
};

var pantalla = "titleScreen";
var oldScreen = "titleScreen";
var currentSelected = "arrowLeft";

var webcams;
var showTitle = true;

function changeWebCam(camNumber){
	if (showTitle){
		document.getElementById("title-text").innerHTML = "";
		showTitle = false;
		$("#container-video").css('filter', 'blur(0px)');
		$(".title").css('background-color', 'transparent');
	}
	console.log("play: " + webcams[camNumber-1 + 9*(actions[pantalla]["actualPage"]-1)].url);
	samsungPlayUrl(webcams[camNumber-1 + 9*(actions[pantalla]["actualPage"]-1)].url);
	//closeCatalog();
	document.getElementById("webcamTitle").innerHTML = webcams[camNumber-1 + 9*(actions[pantalla]["actualPage"]-1)].nom;
}

function scrollUp(){

	if(actions[pantalla]["actualPage"] == 1){
		closeCatalog();
	} else {
		actions[pantalla]["actualPage"]--;
		console.log(actualPage);
		document.getElementById("actualPage").innerHTML = "Page: " + actions[pantalla]["actualPage"];
		updateThumbnails();
	}
	
}

function scrollDown(){
	actions[pantalla]["actualPage"]++;
	document.getElementById("actualPage").innerHTML = "Page: " + actions[pantalla]["actualPage"];
	updateThumbnails();
	select("element1");
}

function closeCatalog(){
	animate("catalogScreen", "titleScreen", "down");
	oldScreen = pantalla;
	pantalla = "titleScreen";
	select("arrowDown");
	oldScreen = pantalla;
	console.log("closeCatalog()");
}

function updateThumbnails(){
	for(i=0; i<9; i++){
		console.log(i);
		if (i + 9*(actions[pantalla]["actualPage"]-1) >= (webcams.length - 1)){
			console.log("i: " + i);
			document.getElementById("element" + (i+1) + "-catalogScreen").style = "background-image: none";
			document.getElementById("element" + (i+1) + "-catalogScreen").style = "background-color: grey";
			document.getElementById("title" + (i+1) + "-catalogScreen").innerHTML = "";
			document.getElementById("element" + (i+1) + "-catalogScreen").className = document.getElementById("element" + (i+1) + "-catalogScreen").className.replace('selectable ', '');
			
				document.getElementById("arrowDown-catalogScreen").childNodes[1].style = "color: grey !important";
				document.getElementById("arrowDown-catalogScreen").className = document.getElementById("arrowDown-catalogScreen").className.replace('selectable ', '');
			
		}else{
			document.getElementById("element" + (i+1) + "-catalogScreen").style = "background-image: url('" + webcams[i + 9*(actions[pantalla]["actualPage"]-1)].thumbnail + "');";
			document.getElementById("title" + (i+1) + "-catalogScreen").innerHTML = webcams[i + 9*(actions[pantalla]["actualPage"]-1)].nom;
			console.log("i: " + i);
			if(document.getElementById("element" + (i+1) + "-catalogScreen").className.search("selectable") == -1){
				document.getElementById("element" + (i+1) + "-catalogScreen").className = "selectable " + document.getElementById("element" + (i+1) + "-catalogScreen").className;
			}
			if (i == 8){
				document.getElementById("arrowDown-catalogScreen").childNodes[1].style = "color: white !important";
				document.getElementById("arrowDown-catalogScreen").className = "selectable " + document.getElementById("arrowDown-catalogScreen").className;
			}
		}
	}
}



function select(element) {
	if(document.getElementById(element + "-" + pantalla).className.search("selectable") != -1){
		if(oldScreen != pantalla){
			document.getElementById(currentSelected + "-" + oldScreen).className = document.getElementById(currentSelected + "-" + oldScreen).className.replace(' selected', '');
		}else{
			document.getElementById(currentSelected + "-" + pantalla).className = document.getElementById(currentSelected + "-" + pantalla).className.replace(' selected', '');
		}
		currentSelected = element;
		document.getElementById(element+ "-" + pantalla).className += " selected";
	}
	
}


// Accions
function goRegister() {
	animate("titleScreen", "registerScreen", "left");
	oldScreen = pantalla;
	pantalla = "registerScreen";
	select("arrowRight");
	oldScreen = pantalla;
	console.log("goRegister()");
}

function goTitle() {
	animate("registerScreen", "titleScreen", "right");
	oldScreen = pantalla;
	pantalla = "titleScreen";
	select("arrowLeft");
	oldScreen = pantalla;
	console.log("goTitle()");
}

function goInformation() {
	console.log("goInformation()");
	animate("titleScreen", "informationScreen", "showInfo");
	oldScreen = pantalla;
	pantalla = "informationScreen";
	select("thumbsUp");
	oldScreen = pantalla;
	console.log("goInformation()");
}

function closeInformation() {
	console.log("closeInformation()");
	animate("informationScreen", "titleScreen", "hideInfo");
	oldScreen = pantalla;
	pantalla = "titleScreen";
	select("arrowRight");
	oldScreen = pantalla;
	console.log("closeInformation()");
}

function goCatalog() {
	animate("titleScreen", "catalogScreen", "up");
	oldScreen = pantalla;
	pantalla = "catalogScreen";
	select("arrowUp");
	oldScreen = pantalla;
	console.log("goCatalog()");
	updateThumbnails();	
}

function disableRegister(){
	document.getElementById("arrowLeft-titleScreen").className = document.getElementById("arrowLeft-titleScreen").className.replace("selectable ", '');
	document.getElementById("arrowLeft-titleScreen").childNodes[1].style = "color: grey !important";
	select("arrowDown");
}

function like() {
	var jsondata = {"usuari": localStorage.user, "webcam": document.getElementById("webcamTitle").innerHTML};
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tizencam-abfb.restdb.io/rest/usuariwebcam",
	  "method": "GET",
	  "headers": {
	    "content-type": "application/json",
	    "x-apikey": "5c2ddfe066292476821c9c82",
	    "cache-control": "no-cache"
	  }
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  if(response.length > 0){
		  
	  }else{
		  var jsondata = {"usuari": localStorage.user, "webcam": document.getElementById("webcamTitle").innerHTML, "puntuacio": 1};
		  var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://tizencam-abfb.restdb.io/rest/usuariwebcam",
		    "method": "POST",
		    "headers": {
		      "content-type": "application/json",
		      "x-apikey": "5c2ddfe066292476821c9c82",
		      "cache-control": "no-cache"
		    },
		    "processData": false,
		    "data": JSON.stringify(jsondata)
		  }

		  $.ajax(settings).done(function (response) {
		    console.log(response);
		  });
		  
		  //actualitzar vista
	  }
	});
	                    
	console.log("like()");
}

function dislike() {
	var jsondata = {"usuari": localStorage.user, "webcam": document.getElementById("webcamTitle").innerHTML};
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://tizencam-abfb.restdb.io/rest/usuariwebcam",
	  "method": "GET",
	  "headers": {
	    "content-type": "application/json",
	    "x-apikey": "5c2ddfe066292476821c9c82",
	    "cache-control": "no-cache"
	  }
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  if(response.length > 0){
		  console.log("Ja han respost subnormal");
	  }else{
		  var jsondata = {"usuari": localStorage.user, "webcam": document.getElementById("webcamTitle").innerHTML, "puntuacio": -1};
		  var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://tizencam-abfb.restdb.io/rest/usuariwebcam",
		    "method": "POST",
		    "headers": {
		      "content-type": "application/json",
		      "x-apikey": "5c2ddfe066292476821c9c82",
		      "cache-control": "no-cache"
		    },
		    "processData": false,
		    "data": JSON.stringify(jsondata)
		  }

		  $.ajax(settings).done(function (response) {
		    console.log(response);
		  });
		  
		  //actualitzar vista
	  }
	});
	console.log("dislike()");
}

function animate(from, to, direction){
	switch (direction){
	
		case "left":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'left': '+=1920px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'left': '+=1920px'},1200);
			});
			break;
			
		case "right":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'left': '-=1920px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'left': '-=1920px'},1200);
			});
			break;
			
		case "up":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080'},1200);
			});
			break;
			
		case "down":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'top': '+=1080px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'top': '+=1080px'},1200);
			});
			break;
			
		case "showInfo":
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'left': '-=620px'},1200);
				document.getElementById("returnFromInfo").style.left = '0px';
			});
			break;
		case "hideInfo":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'left': '+=620px'},1200);
				document.getElementById("returnFromInfo").style.left = '1920px';
			});
			break;
			
		case "scrollUp":
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080'},1200);
			});
			break;
		case "scrollDown":
			
			var newPage = document.getElemenById("catalogScreen");
			newPage.style("top : 1080px");
			
			
			$("."+from).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080px'},1200);
			});
			$("."+to).fadeIn('slow',function(){
				$(this).animate({'top': '-=1080'},1200);
			});
			break;
	}
}

function doAction(element) {
	if(document.getElementById(element + "-" + pantalla).className.search("selected") != -1){
		console.log("do action");
		actions[pantalla][element].action();
	}
}

function openKeyboard(){
	console.log('openkeyboard');
}

function closeKeyboard(){
	console.log('closekeyboard');
}

function setUsername(nom){
	document.getElementById("usrLogged").innerHTML = "Welcome, " + nom;
}

window.onload = function() {
	// TODO:: Do your initialization job
	// add eventListener for tizenhwkey

	select("arrowLeft");
	tizen.tvinputdevice.registerKey('KEY_LEFT');
	tizen.tvinputdevice.registerKey('KEY_RIGHT');
	tizen.tvinputdevice.registerKey('KEY_UP');
	tizen.tvinputdevice.registerKey('KEY_DOWN');
	document.addEventListener('tizenhwkey', function(e) {
		console.log(e);
		if (e.keyName == "back")
			try {
				// tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}

	});
	
	if (localStorage.getItem("user") != null){
		setUsername(localStorage.getItem("user"));
		disableRegister();
	}
	
	
	//Carregar base de dades de WebCams
	var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://tizencam-abfb.restdb.io/rest/webcam",
		    "method": "GET",
		    "headers": {
		      "content-type": "application/json",
		      "x-apikey": "5c2ddfe066292476821c9c82",
		      "cache-control": "no-cache"
		    }
	}
		                  
	$.ajax(settings).done(function (response) {
	    console.log(response);
	    webcams = response;
	});
	
	$("form").submit(function(e){
	    e.preventDefault();
	    
	    var userName = document.getElementById("userInput-registerScreen").value;
	    //Comprovar que no existeixi
	    var settings = {
    	    "async": true,
    	    "crossDomain": true,
    	    "url": "https://tizencam-abfb.restdb.io/rest/usuari?q={\"nom\":\"" + userName + "\"}",
    	    "method": "GET",
    	    "headers": {
    	      "content-type": "application/json",
    	      "x-apikey": "5c2ddfe066292476821c9c82",
    	      "cache-control": "no-cache"
    	    }
    	}
	    	                  
    	$.ajax(settings).done(function (response) {
    	    console.log(response);
    	    if(response.length > 0){
    	    	document.getElementById("messageForm").innerHTML = "Username already taken"
    	    }else{
    	    	var jsondata = {"nom": userName};
    	    	var settings = {
    	    	  "async": true,
    	    	  "crossDomain": true,
    	    	  "url": "https://tizencam-abfb.restdb.io/rest/usuari",
    	    	  "method": "POST",
    	    	  "headers": {
    	    	    "content-type": "application/json",
    	    	    "x-apikey": "5c2ddfe066292476821c9c82",
    	    	    "cache-control": "no-cache"
    	    	  },
    	    	  "processData": false,
    	    	  "data": JSON.stringify(jsondata)
    	    	}

    	    	$.ajax(settings).done(function (response) {
    	    	  console.log(response);
    	    	});
    	    	                    
    	    	document.getElementById("messageForm").innerHTML = "Registered successfully"
    		    localStorage.setItem("user", userName);
    		    document.getElementById("userInput-registerScreen").value = '';
    		    setUsername(localStorage.getItem("user"));
    		    goTitle();
    		    disableRegister();
    	    }
    	});
	    	                    
	    
	    //Guardar el nou usuari
	    
	    
	});                   
	
	document.body.addEventListener('keydown', handleKeyDown);

	function handleKeyDown(e) {
		console.log(e);
		switch (e.keyCode) {
		case 40: // 10252
			actions[pantalla][currentSelected].onDown();
			console.log("avall");
			break;

		case 38: // 403
			actions[pantalla][currentSelected].onUp();
			console.log("amunt");
			break;

		case 37: // 403
			actions[pantalla][currentSelected].onLeft();
			console.log("left");
			break;

		case 39: // 403
			actions[pantalla][currentSelected].onRight();
			console.log("right");
			break;
		case 13: // 403
			actions[pantalla][currentSelected].action();
			break;
		
		}
	}
	
	$('.selectable').hover(function(event){
		console.log("hovered over " + this.id);
		if((this.id).split('-')[1] == pantalla){
			select((this.id).substring(0, (this.id).indexOf('-')));
		}
	});
	
	// Sample code
	// var textbox = document.querySelector('.contents');
	/*
	 * textbox.addEventListener("click", function(){ box =
	 * document.querySelector('#textbox'); box.innerHTML = box.innerHTML ==
	 * "Oof" ? "Lmao" : "Eggfhfhg"; });
	 */

	var objElem = document.createElement('object');
	objElem.type = 'application/avplayer';

	document.getElementById("container-video").appendChild(objElem);

	samsungPlayUrl('https://video2archives.earthcam.com/archives/_definst_/MP4:network/485/2019/01/03/0800.mp4/playlist.m3u8')
};

function samsungPlayUrl(url){
	webapis.avplay
	.open(url);

	var listener = {
	onbufferingstart : function() {
		console.log("Buffering start.");
	},
	
	onbufferingprogress : function(percent) {
		console.log("Buffering progress data : " + percent);
	},
	
	onbufferingcomplete : function() {
		console.log("Buffering complete.");
		setTimeout(function(){
			$(".titleScreen").fadeIn('slow',function(){
				  $(this).animate({'opacity': '+=1'},4000);
			});
			$("#container-video").fadeIn('slow',function(){
				  $(this).animate({'opacity': '+=1'},4000);
			});
		},500);
		$(".loading").fadeIn('slow',function(){
			  $(this).animate({'opacity': '-=1'},800);
		});
		//Fer loading
	},
	onstreamcompleted : function() {
		console.log("Stream Completed");
		webapis.avplay.stop();
	},
	
	oncurrentplaytime : function(currentTime) {
		// console.log("Current playtime: " + currentTime);
	},
	
	onerror : function(eventType) {
		console.log("event type error : " + eventType);
	},
	
	onevent : function(eventType, eventData) {
		console.log("event type: " + eventType + ", data: " + eventData);
	},
	
	onsubtitlechange : function(duration, text, data3, data4) {
		console.log("subtitleText: " + text);
	},
	ondrmevent : function(drmEvent, drmData) {
		console.log("DRM callback: " + drmEvent + ", data: " + drmData);
	}
	};
	
	webapis.avplay.setListener(listener);
	
	var avplayBaseWidth = 1920;
	
	// Calculate ratio to base resolution
	var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;
	
	// Convert rectangle to base resolution
	var newLeft = 0 * ratio;
	var newTop = 0 * ratio;
	var newWidth = 1920 * ratio;
	var newHeight = 1080 * ratio;
	
	webapis.avplay.setDisplayRect(newLeft, newTop, newWidth, newHeight);
	
	webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX')
	webapis.avplay.prepare();
	
	var successCallback = function() {
	console.log('The media has finished preparing');
	}
	
	var errorCallback = function() {
	console.log('The media has failed to prepare');
	}
	webapis.avplay.prepareAsync(successCallback, errorCallback);
	
	webapis.avplay.play();
}