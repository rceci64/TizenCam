
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
    	box = document.querySelector('#textbox');
    	box.innerHTML = box.innerHTML == "Oof" ? "Lmao" : "E";
    });
    
    var objElem = document.createElement('object');
    objElem.type = 'application/avplayer';
    document.body.appendChild(objElem);
    
    webapis.avplay.open('https://hddn01.skylinewebcams.com/live.m3u8?a=14h4ih392toii30ped8v74rr02');
    
    var listener = {
    		onbufferingstart: function() {
    			console.log("Buffering start.");
    		},

    		onbufferingprogress: function(percent) {
    			console.log("Buffering progress data : " + percent);
    		},

    		onbufferingcomplete: function() {
    			console.log("Buffering complete.");
    		},
    		onstreamcompleted: function() {
    			console.log("Stream Completed");
    			webapis.avplay.stop();
    		},

    		oncurrentplaytime: function(currentTime) {
    			//console.log("Current playtime: " + currentTime);
    		},

    		onerror: function(eventType) {
    			console.log("event type error : " + eventType);
    		},

    		onevent: function(eventType, eventData) {
    			console.log("event type: " + eventType + ", data: " + eventData);
    		},

    		onsubtitlechange: function(duration, text, data3, data4) {
    			console.log("subtitleText: " + text);
    		},
    		ondrmevent: function(drmEvent, drmData) {
    			console.log("DRM callback: " + drmEvent + ", data: " + drmData);
    		}
    };

    webapis.avplay.setListener(listener);
    
    
    var avplayBaseWidth = 1366;

    // Calculate ratio to base resolution
    var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;

    // Convert rectangle to base resolution
    var newLeft = 100 * ratio;
    var newTop = 200 * ratio;
    var newWidth = 600 * ratio;
    var newHeight = 400 * ratio;

    webapis.avplay.setDisplayRect(newLeft,newTop,newWidth,newHeight);
    
    webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX')
    webapis.avplay.prepare();
    
    var successCallback = function() {
    	console.log('The media has finished preparing');
    }

   	var errorCallback = function() {
   		console.log('The media has failed to prepare');
   	}
    webapis.avplay.prepareAsync(successCallback,errorCallback);
    
    webapis.avplay.play();
    	
    
};
