var actions = {
	"inicial" : {
		"arrowLeft" : {
			action :  function() { goRegister(); },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onLeft : function() { goRegister(); }
		},
		"arrowDown" : {
			action : function() { goWebCams() },
			selected : false,
			onRight : function() { select("arrowRight"); },
			onLeft : function() { select("arrowLeft") }
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
	"information" : {
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
		}
	},
	"catalog" : {
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

var pantalla;
var currentSelected;
pantalla = "inicial";
currentSelected = "arrowLeft";

function select(element) {
	
	document.getElementById(currentSelected).className.replace(' selected', '');
	currentSelected = element;

	document.getElementById(element).className += " selected";

}


// Accions
function goRegister() {
	console.log("goRegister()");
}

function goWebCams() {
	console.log("goWebCams()");
}

function goInformation() {
	console.log("goInformation()");
}

function goCatalog() {
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



function doAction(element) {
	console.log("do action");
	actions[pantalla][element].action();
}

window.onload = function() {
	// TODO:: Do your initialization job
	// add eventListener for tizenhwkey

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
			console.log("avall");
			break;

		case 38: // 403
			console.log("amunt");
			break;

		case 37: // 403
			console.log("left");
			break;

		case 39: // 403
			console.log("right");
			break;
		}
	}

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

