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
		}
	},
	"webcam" : {
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
	},
	"informationScreen" : {
		"like" : {
			action : function() { like(); },
			selected : false,
			onRight : function() { select("dislike"); },
			onLeft : function() { select("arrowCloseInfo"); }
		},
		"dislike" : {
			action : function() { dislike(); },
			selected : false,
			onLeft : function() { select("like"); }
		},
		"arrowCloseInfo" : {
			action : function() { closeInformation(); },
			selected : false,
			onLeft : function() { closeInformation(); },
			onRight : function() { select("like") }
		}
	},
	"catalogScreen" : {
		"elements" : [
		// elements procedents de la bbdd
		],
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

		}
	}
};

var pantalla = "titleScreen";
var oldScreen = "titleScreen";
var currentSelected = "arrowLeft";

function select(element) {
	
	if(oldScreen != pantalla){
		document.getElementById(currentSelected + "-" + oldScreen).className = document.getElementById(currentSelected + "-" + oldScreen).className.replace(' selected', '');
	}else{
		document.getElementById(currentSelected + "-" + pantalla).className = document.getElementById(currentSelected + "-" + pantalla).className.replace(' selected', '');
	}
	
	currentSelected = element;

	document.getElementById(element+ "-" + pantalla).className += " selected";

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
}

function like() {
	console.log("like()");
}

function dislike() {
	console.log("dislike()");
}

function scrollDown() {
	console.log("scrollDown()");
}

function scrollUp() {
	console.log("scrollUp()");
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
	}
}

function doAction(element) {
	console.log("do action");
	actions[pantalla][element].action();
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

	webapis.avplay
			.open('https://video2archives.earthcam.com/archives/_definst_/MP4:network/485/2019/01/03/0800.mp4/playlist.m3u8');

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

};