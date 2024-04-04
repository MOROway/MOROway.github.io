"use strict"

/**************
Variablen-Namen
**************/
var frameNo = 0;
var settings = {};
var scheduledTask;
var canvas;
var context;
var resized = false;
var movingTimeOut;

var konamistate = 0;
var konamiTimeOut;

var pics = new Array();

var background = {src: 8, secondLayer: 9, width: 0, height: 0, x:0,y:0};

var trains =  [{src: 0, fac: 0.051, width: 0, height: 0,x:0,y:0, name:"Dampflok", speedInPercent: 50, circle: {}, circleFamily: {}, move: false, state: 1, angle: 0, displayAngle: 0, standardDirection: true, currentCurveFac: 0, icon: "🚂", switchCircles: false, cars:[{src: 1, fac: 0.060, width: 0, height: 0,x:0,y:0, state: 1, angle: 0, displayAngle: 0, currentCurveFac: 0, icon: "🚃"},{src: 1, fac: 0.060, width: 0, height: 0,x:0,y:0, state: 1, angle: 0, displayAngle: 0, currentCurveFac: 0, icon: "🚃"},{src: 1, fac: 0.060, width: 0, height: 0,x:0,y:0, state: 1, angle: 0, displayAngle: 0, currentCurveFac: 0, icon: "🚃"},{src: 2, fac: 0.044, width: 0, height: 0,x:0,y:0, state: 1, angle: 0, displayAngle: 0, currentCurveFac: 0, icon: "🚃"}]},{src:3,fac: 0.093,width: 0, height: 0,x:0,y:0,  name:"TGV Duplex", speedInPercent: 50, circle: {}, circleFamily: {}, move: false, state: 3, angle: Math.PI, displayAngle: Math.PI,standardDirection: false, currentCurveFac: 0, icon: "🚅", switchCircles: false, cars:[{src: 4, fac: 0.11, width: 0, height: 0,x:0,y:0, state: 3, angle: Math.PI, displayAngle: Math.PI, currentCurveFac: 0, icon: "🚃"},{src: 5, fac: 0.11, width: 0, height: 0,x:0,y:0, state: 3, angle: Math.PI, displayAngle: Math.PI, currentCurveFac: 0, icon: "🚃"}, {src: 6, fac: 0.093, width: 0, height: 0,x:0,y:0, state: 3, angle: Math.PI, displayAngle: Math.PI, currentCurveFac: 0, icon: "🚃"}]},{src:7, fac: 0.068,width: 0, height: 0,x:0,y:0,   name:"Schi-Stra-Bus", speedInPercent: 50, circle: {}, circleFamily: {}, move: false, state: 1, angle: 0, displayAngle: 0,standardDirection: true, currentCurveFac: 0, icon: "🚋", switchCircles: false, cars:[]}];
var selectedTrain = Math.floor(Math.random()*trains.length);
var trainMarginNumber = 25;
var rotationPoints = {inner:{narrow:{x:[0,0,0,0],y:[0,0,0,0]}, wide:{x:[0,0,0,0],y:[0,0,0,0]}},outer:{narrow:{x:[0,0,0,0],y:[0,0,0,0]}, altState3:{x:[0,0],y:[0,0]} },inner2outer:{left:{x:[0,0],y:[0,0]}, right:{x:[0,0],y:[0,0]}}};
var switches = {inner2outer: {left: {turned: false, x: 0, y: 0}, right: {turned: false, x: 0, y: 0}}, innerWide: {left: {turned: false, x: 0, y: 0}, right: {turned: false, x: 0, y: 0}}, outerAltState3: {left: {turned: false, x: 0, y: 0}, right: {turned: false, x: 0, y: 0}}};
              
var cars = [{src: 15, fac: 0.02, width: 0, height: 0, x: 0.275, y: 0.227, name: "Rotes Auto", speed: 0.001, move: false, state: 0, angle: 0, displayAngle: 0, standardDirection: true, icon: "🏎️"},{src: 16, fac: 0.02, width: 0, height: 0, x: 0.575, y: 0.419, name: "Weißes Auto", speed: 0.0015, move: false, state: 0, angle: 0, displayAngle:0, standardDirection: true, icon: "🚗"}];
var carPaths = [[{type: "linear", x:[0.225,0.29], y:[0.227,0.227]},{type: "curve_hright", x:[0.29,0.29],y:[0.227,0.347]},{type: "linear_vertical", x:[0,0], y: [0.287,0.342]},{type: "curve_hright2", x:[0,0], y: [0.282,0.402]},{type: "curve_l2r", x:[0,0.25], y: [0.402,0.412]},{type: "linear", x: [0.25,0.225], y: [0.412,0.412]},{type: "curve_right", x: [0.225,0.225], y: [0.412,0.227]}],[{type: "linear", x:[0.46,0.651], y:[0.419,0.419]},{type: "curve_left", x:[0.651,0.651], y: [0.419,0.322]},{type: "curve_l2r", x:[0.651,0.583], y: [0.322,0.39]},{type: "linear", x:[0.583,0.339], y:[0.39,0.39]},{type: "curve_hright", x:[0.339,0.339], y: [0.39,0.32]},{type: "linear_vertical", x:[0,0], y: [0.355,0.272]},{type: "curve_hleft2", x:[0,0], y: [0.347,0.197]},{type: "linear", x:[0,0.216], y:[0.197,0.197]},{type: "curve_left", x:[0.216,0.216], y: [0.197,0.419]},{type: "linear", x:[0.216,0.246], y:[0.419,419]},{type: "curve_r2l", x:[0.246,0.286], y:[0.419,0.43]},{type: "linear", x:[0.286,0.31], y:[0.43,0.43]},{type: "curve_hleft", x:[0.31,0.31], y: [0.43,0.33]},{type: "linear_vertical", x:[0,0], y: [0.38,0.272]},{type: "curve_hleft2", x:[0,0], y: [0.347,0.197]},{type: "linear", x:[0,0.216], y:[0.197,0.197]},{type: "curve_left", x:[0.216,0.216], y: [0.197,0.419]},{type: "linear", x:[0.216,0.246], y:[0.419,419]},{type: "curve_r2l", x:[0.246,0.276], y:[0.419,0.434]},{type: "linear", x:[0.276,0.38], y:[0.434,434]},{type: "curve_l2r", x:[0.38,0.46], y:[0.434,0.419]}]]; 

var taxOffice = {"isset": [], "fire": {"color": [], "x": [], "y": [], "size": []}, "smoke": {"color": [], "x": [], "y": [], "size": []}};

var classicUI = {trainSwitch: {src: 10, width: 0, height: 0, x: 0, y: 0, selectedTrainDisplay: {font: "0", width: 0, height: 0}}, transformer: {src:12, asrc: 11, angle:(Math.PI/5),input:{src:13,width: 0, height: 0, angle:0,maxAngle:1.5*Math.PI, diffY: 0},directionInput:{src:14,width: 0, height: 0, diffX: 0, diffY: 0}}, switches: {display: false}};

var hardware = {mouse: {moveX:0, moveY:0,downX:0, downY:0,upX:0, upY:0, isMoving: false, isHold: false, cursor: "default"}};
var client = {width:0,height:0,isSmall:false,chosenInputmethod:""};

var debug = false;

/******************************************
Window Event Listeners + helper functions
******************************************/

window.onresize = function() {
	 
  resized = true;

}

window.onload = function() {
    settings = getSettings();
    canvas = document.querySelector("canvas");
    context = canvas.getContext('2d');
	
    document.addEventListener("keydown", onKeyDown);
        
    canvas.addEventListener("touchstart",chooseInputMethod);
    canvas.addEventListener("mousemove",chooseInputMethod);
    Pace.on("hide", function(){
			var timeWait = 0.5;
			var timeLoad = 0.5;
			var toDestroy = document.querySelectorAll(".pace");
			for (var i = 0; i < toDestroy.length; i++) {
					toDestroy[i].style.transition = "opacity "+ timeWait + "s";
					toDestroy[i].style.opacity = "0";
			}
			setTimeout(function(){
					var toHide = document.querySelectorAll("#branding");
					for (var i = 0; i < toHide.length; i++) {
						toHide[i].style.transition = "opacity "+ timeLoad + "s";
						toHide[i].style.opacity = "0";
					}
					setTimeout(function(){
						var localAppData = getLocalAppDataCopy();
						if(settings.classicUI && !settings.alwaysShowSelectedTrain){ 
							notify( trains[selectedTrain].name + ' automatisch ausgewählt.', true,3000,null,null, background.y);
						} else if(localAppData !== null && (localAppData.version.major < APP_DATA.version.major || localAppData.version.minor < APP_DATA.version.minor)) { 
							notify('NEUE VERSION!', false, 4000, function(){followLink("whatsnew/#newest", "_blank", LINK_STATE_INTERNAL_HTML)}, 'Mehr Informationen', background.y);
						} else {
							notify('Anwendung geladen.', false, 4000, function(){followLink("help", "_blank", LINK_STATE_INTERNAL_HTML)}, 'Hilfe & Informationen', background.y);
						}
						setLocalAppDataCopy(); 
						for (var i = 0; i < toHide.length; i++) {
							toHide[i].style.display = "none";
						}
						canvas.style.transition = "opacity " + timeLoad + "s";
						canvas.style.opacity = "1";
						setTimeout(function(){
							document.querySelector("body").style.backgroundImage = "url('assets/asset_background_body.png')";
							document.querySelector("body").style.backgroundRepeat = "no-repeat";
							document.querySelector("body").style.backgroundAttachment = "fixed";
							document.querySelector("body").style.backgroundPosition = "center";
							document.querySelector("body").style.backgroundSize = "cover";
						}, timeLoad*1000);
					}, timeLoad*1000);
			}, timeWait*1000);
	}
)

    extendedMeasureViewspace();
        
    loadPictures();
    
    function chooseInputMethod(event){
      var type = event.type;           
      canvas.removeEventListener("touchstart",chooseInputMethod);
      canvas.removeEventListener("mousemove",chooseInputMethod);
      canvas.addEventListener('touchmove', getTouchMove, false);
      canvas.addEventListener('touchstart', getTouchStart, false);
      canvas.addEventListener('touchleave', getTouchLeave, false);
      canvas.addEventListener('touchend', getTouchEnd, false); 
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("mousedown", onMouseDown, false);
      canvas.addEventListener("mouseout", onMouseOut, false);
      canvas.addEventListener("mouseup", onMouseUp, false); 
	  if(type == "touchstart"){
		client.chosenInputMethod = "touch";
        getTouchStart(event);
      } else {
		client.chosenInputMethod = "mouse";
		onMouseMove(event);
      }
    }
    function loadPictures() {
      var finalPicNo = 17; //CHANGE HERE
      var loadNo = 0;
      for (var picNumber = 0; picNumber < finalPicNo; picNumber++) {
        pics[picNumber] = new Image;
        pics[picNumber].src = "assets/asset" + (picNumber + 1) + ".png";
        pics[picNumber].onload = function() {
            loadNo++;
            if (loadNo == finalPicNo) {
                Pace.stop();
                
                initialDisplay();
                
            } else {
                context.clearRect(0, 0, canvas.width, canvas.height);
                var currentText = Math.round(100 * (loadNo / finalPicNo)) + "%";
                context.save();
                styleTheProcentCounter();
                context.fillText(currentText, canvas.width / 2, canvas.height / 2);
                context.restore();
            }
        };
        pics[picNumber].onerror = function() {
             console.log("Fail ); - Mindestens ein Bild konnte nicht geladen werden!");
             notify('FAIL - WE GONNA FIX IT ASAP!', true, 60000, function(){followLink("error", "_blank", LINK_STATE_INTERNAL_HTML)}, 'Mehr Informationen', background.y);
        };
      }
      function styleTheProcentCounter() {
              context.textAlign = 'center';
              context.fillStyle = 'white';
              context.font = "300% Arial";
      }
      function initialDisplay() {
		
		context.clearRect(0, 0, canvas.width, canvas.height);
        
		placeBackground();
		placeOptions("load");
        
        defineTrainParams();
        defineCarParams();
        placeTrainsAtInitialPositions();
        placeCarsAtInitialPositions();
        if(settings.classicUI){
    	    placeClassicUIElements();
        }
        animateObjects();
        
        function placeTrainsAtInitialPositions() {
		        trains[0].circleFamily = rotationPoints.inner;
            trains[0].circle = rotationPoints.inner.wide;
	
            trains[1].circleFamily = rotationPoints.outer;
	          trains[1].circle = rotationPoints.outer.narrow;

	          trains[2].circleFamily = rotationPoints.inner;
	          trains[2].circle = rotationPoints.inner.narrow;
	        for (var i = 0; i < trains.length; i++){
		        trains[i].width = trains[i].fac * background.width;
		        trains[i].height = trains[i].fac *(pics[trains[i].src].height * (background.width / pics[trains[i].src].width)); 
		        var currentTrainMargin = trains[i].width/trainMarginNumber;
		        var currentTrainWidth = trains[i].width;
		        for(var j = 0; j < trains[i].cars.length; j++){
			        trains[i].cars[j].width = trains[i].cars[j].fac * background.width;
			        trains[i].cars[j].height = trains[i].cars[j].fac *(pics[trains[i].cars[j].src].height * (background.width / pics[trains[i].cars[j].src].width));
			        currentTrainWidth += trains[i].cars[j].width + currentTrainMargin;
		        }
		        if(trains[i].state == 1){
    		      trains[i].angle = Math.asin((trains[i].circle.y[1]-trains[i].circle.y[0])/(trains[i].circle.x[1]-trains[i].circle.x[0]));
    		      var hypotenuse = Math.sqrt(Math.pow(trains[i].circle.x[1] - trains[i].circle.x[0],2)+Math.pow((trains[i].circle.y[1]) - trains[i].circle.y[0],2),2);
			        trains[i].x = background.x + trains[i].circle.x[0] + (hypotenuse/2)*Math.cos(trains[i].angle) + (currentTrainWidth/2-trains[i].width/2)*Math.cos(trains[i].angle);
			        trains[i].y = background.y + trains[i].circle.y[0] + (hypotenuse/2)*Math.sin(trains[i].angle) + (currentTrainWidth/2-trains[i].width/2)*Math.sin(trains[i].angle);
			        for(var j = 0; j < trains[i].cars.length; j++){
				        trains[i].cars[j].angle = trains[i].angle;
				        if(j >= 1){
					        trains[i].cars[j].x = trains[i].cars[j-1].x - Math.cos(trains[i].cars[j].angle)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].cars[j-1].width/2);
					        trains[i].cars[j].y = trains[i].cars[j-1].y - Math.sin(trains[i].cars[j].angle)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].cars[j-1].width/2);
				        } else {
					        trains[i].cars[j].x = trains[i].x - Math.cos(trains[i].cars[j].angle)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].width/2);
					        trains[i].cars[j].y = trains[i].y - Math.sin(trains[i].cars[j].angle)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].width/2);
				        }
			        }
		        } else if(trains[i].state == 3){
			        trains[i].angle = Math.PI+Math.asin((trains[i].circle.y[2]-trains[i].circle.y[3])/(trains[i].circle.x[2]-trains[i].circle.x[3]));
    		      var hypotenuse = Math.sqrt((Math.pow(((trains[i].circle.x[2]) - trains[i].circle.x[3]),2)+(Math.pow(((trains[i].circle.y[2]) - trains[i].circle.y[3]),2))),2);
    		      trains[i].x = background.x + trains[i].circle.x[2] - (hypotenuse/2)*Math.cos(trains[i].angle-Math.PI) - (currentTrainWidth/2-trains[i].width/2)*Math.cos(trains[i].angle-Math.PI);
			        trains[i].y = background.y + trains[i].circle.y[2] - (hypotenuse/2)*Math.sin(trains[i].angle-Math.PI) - (currentTrainWidth/2-trains[i].width/2)*Math.sin(trains[i].angle-Math.PI);
			        for(var j = 0; j < trains[i].cars.length; j++){
				        trains[i].cars[j].angle = trains[i].angle;
				        if(j >= 1){
					        trains[i].cars[j].x = trains[i].cars[j-1].x + Math.cos(trains[i].cars[j].angle-Math.PI)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].cars[j-1].width/2);
					        trains[i].cars[j].y = trains[i].cars[j-1].y + Math.sin(trains[i].cars[j].angle-Math.PI)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].cars[j-1].width/2);
				        } else {
					      trains[i].cars[j].x = trains[i].x + Math.cos(trains[i].cars[j].angle-Math.PI)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].width/2);
					      trains[i].cars[j].y = trains[i].y + Math.sin(trains[i].cars[j].angle-Math.PI)*(trains[i].cars[j].width/2+currentTrainMargin+trains[i].width/2);
				        }
			        }
		        }
	        }
	
        }  
      }
    }

   function placeCarsAtInitialPositions() {
	        for (var i = 0; i < cars.length; i++){
		        cars[i].width = Math.floor( cars[i].fac * background.width );
		        cars[i].height = Math.floor( cars[i].fac *(pics[cars[i].src].height * (background.width / pics[cars[i].src].width)) ); 
		        cars[i].x = cars[i].x * background.width; 
		        cars[i].y = cars[i].y * background.height; 
          }  
   }
}

function extendedMeasureViewspace() {
    client.isSmall = measureViewspace(1).isSmallDevice;
    canvas.width = client.width = window.innerWidth;
    canvas.height = client.height = window.innerHeight;
}


function defineTrainParams(){
 defineRotationPoints();
 defineTrainSpeeds();
 
 function defineRotationPoints(){
	var circles = [];
	//INNER/NARROW (ID 0)
	rotationPoints.inner.narrow.x[0] = rotationPoints.inner.narrow.x[3] = 0.17 * background.width;//gekoppelt, s.u.
	rotationPoints.inner.narrow.x[1] = 0.75 * background.width; //gekoppelt, s.u. //TODO
	rotationPoints.inner.narrow.x[2] = 0.77 * background.width; //gekoppelt, s.u. //TODO
	rotationPoints.inner.narrow.x[4] = 0.945 * background.width;
	rotationPoints.inner.narrow.x[5] = 0.962 * background.width;
	rotationPoints.inner.narrow.x[6] = 0.004 * background.width;
	rotationPoints.inner.narrow.x[7] = -0.025 * background.width;
	rotationPoints.inner.narrow.y[0] = background.height / 7.9;
	rotationPoints.inner.narrow.y[1] = background.height / 7.47;
	rotationPoints.inner.narrow.y[2] = background.height / 1.22;
	rotationPoints.inner.narrow.y[3] = background.height / 1.24;
	rotationPoints.inner.narrow.y[4] = background.height / 7.9;
	rotationPoints.inner.narrow.y[5] = background.height / 1.15;
	rotationPoints.inner.narrow.y[6] = background.height / 1.17;
	rotationPoints.inner.narrow.y[7] = background.height / 9;
	circles[0] = rotationPoints.inner.narrow;
	
	//INNER/WIDE (ID 1)
	switches.innerWide.left.x = 0.07 * background.width;
	switches.innerWide.left.y =  background.height / 4.2;
	switches.innerWide.right.x = 0.89 * background.width;
	switches.innerWide.right.y =  background.height / 3;
	rotationPoints.inner.wide.x[0] = rotationPoints.inner.wide.x[3] = 0.17 * background.width; //gekoppelt, s.u.
	rotationPoints.inner.wide.x[1] = 0.75 * background.width; //gekoppelt, s.u. //TODO
	rotationPoints.inner.wide.x[2] = 0.77 * background.width; //gekoppelt, s.u. //TODO
	rotationPoints.inner.wide.x[4] = 0.94 * background.width;
	rotationPoints.inner.wide.x[5] = 0.97 * background.width;
	rotationPoints.inner.wide.y[0] = background.height / 12.1;
	rotationPoints.inner.wide.y[1] = background.height / 12.1;
	rotationPoints.inner.wide.y[2] = background.height / 1.22;
	rotationPoints.inner.wide.y[3] = background.height / 1.24;
	rotationPoints.inner.wide.y[4] = background.height / 12.1;
	rotationPoints.inner.wide.y[5] = background.height / 1.18;
	circles[1] = rotationPoints.inner.wide;
	
	
	//OUTER/NARROW (ID 2)
	rotationPoints.outer.narrow.x[0] = rotationPoints.outer.narrow.x[3] = 0.17 * background.width; //gekoppelt, s.u.
	rotationPoints.outer.narrow.x[1] = rotationPoints.outer.narrow.x[2] = 0.77 * background.width; //gekoppelt, s.u.
	rotationPoints.outer.narrow.x[4] = 1.00 * background.width;
	rotationPoints.outer.narrow.x[5] = 0.97 * background.width;
	rotationPoints.outer.narrow.y[0] = background.height / 43;
	rotationPoints.outer.narrow.y[1] = background.height / 58;
	rotationPoints.outer.narrow.y[2] = background.height / 1.13;
	rotationPoints.outer.narrow.y[3] = background.height / 1.13;
	rotationPoints.outer.narrow.y[4] = background.height / 15.015;
	rotationPoints.outer.narrow.y[5] = background.height / 1.09;
	circles[2] = rotationPoints.outer.narrow;

   	for (var i = 0; i < circles.length; i++) {
		circles[i].bezierLength = {};
		var repNo = 1000;
		if(circles[i].x[4] != undefined && circles[i].x[5] != undefined) {
			var bezierPoints = {x:[circles[i].x[1],circles[i].x[4],circles[i].x[5],circles[i].x[2]], y:[circles[i].y[1],circles[i].y[4],circles[i].y[5],circles[i].y[2]]};
			circles[i].bezierLength.right = getBezierLength(bezierPoints,repNo);
		}
		if(circles[i].x[6] != undefined && circles[i].x[7] != undefined) {
			var bezierPoints = {x:[circles[i].x[3],circles[i].x[6],circles[i].x[7],circles[i].x[0]], y:[circles[i].y[3],circles[i].y[6],circles[i].y[7],circles[i].y[0]]};
			circles[i].bezierLength.left = getBezierLength(bezierPoints,repNo);
		}
	}
	
  /*------------------------------------------------------------------------------------------------------------------*
   *  0---------------------------------------------------------1                                                     *
   *  -      ___       ___                                      -                                                     *
   *  -     |   \      |   \   ________  _____   _______        -        0-3: required                                *
   *  7    |    \     |    \   | __   |  ||__|  | __   |        4        4-7: optional                                *
   *  -   |  / \ \   |  / \ \  | |__| |  ||\    | |__| |        -                                                     *
   *  6  |  /   \ \ |  /   \ \ |______|  ||\\   |______|        5                   Es muss gelten:                   *
   *  -  ______________________________________________         -                   x0 = x3 bzw. x1 = x2              *
   *  -  _______________________________________________        -                                                     *
   *  3---------------------------------------------------------2                                                     *
   *------------------------------------------------------------------------------------------------------------------*/ 
   
   
 	//INNER2OUTER/LEFT
	switches.inner2outer.left.x = 0.04 * background.width;
	switches.inner2outer.left.y =  background.height / 1.5;
	rotationPoints.inner2outer.left.x[1] = -0.035 * background.width;
	rotationPoints.inner2outer.left.x[2] = -0.061 * background.width;
	rotationPoints.inner2outer.left.y[1] = background.height / 1.25;
	rotationPoints.inner2outer.left.y[2] = background.height / 10.55;
	var bezierPoints = {x:[rotationPoints.inner.narrow.x[3],rotationPoints.inner2outer.left.x[1],rotationPoints.inner2outer.left.x[2],rotationPoints.outer.narrow.x[0]], y:[rotationPoints.inner.narrow.y[3],rotationPoints.inner2outer.left.y[1],rotationPoints.inner2outer.left.y[2],rotationPoints.outer.narrow.y[0]]};
	rotationPoints.inner2outer.left.bezierLength = getBezierLength(bezierPoints,repNo);
	
	//INNER2OUTER/RIGHT
	switches.inner2outer.right.x = 0.91 * background.width;
	switches.inner2outer.right.y = background.height / 1.5;
	rotationPoints.inner2outer.right.x[1] = 0.99 * background.width;
	rotationPoints.inner2outer.right.x[2] = 0.98 * background.width;
	rotationPoints.inner2outer.right.y[1] = background.height / 15.5;
	rotationPoints.inner2outer.right.y[2] = background.height / 1.1;
	var bezierPoints = {x:[rotationPoints.outer.narrow.x[1],rotationPoints.inner2outer.right.x[1],rotationPoints.inner2outer.right.x[2],rotationPoints.inner.narrow.x[2]], y:[rotationPoints.outer.narrow.y[1],rotationPoints.inner2outer.right.y[1],rotationPoints.inner2outer.right.y[2],rotationPoints.inner.narrow.y[2]]};
	rotationPoints.inner2outer.right.bezierLength = getBezierLength(bezierPoints,repNo);
	
  /*------------------------------------------------------------------------------------------------------------------*
   *  left--------------------------------------------------right                                                     *
   *  -      ___       ___                                      -                                                     *
   *  -     |   \      |   \   ________  _____   _______        -                                                     *
   *  2    |    \     |    \   | __   |  ||__|  | __   |        1        1-2: required                                *
   *  -   |  / \ \   |  / \ \  | |__| |  ||\    | |__| |        -                                                     *
   *  1  |  /   \ \ |  /   \ \ |______|  ||\\   |______|        2                                                     *
   *  -  ______________________________________________         -                                                     *
   *  -  _______________________________________________        -                                                     *
   *  -----------------------------------------------------------                                                     *
   *------------------------------------------------------------------------------------------------------------------*/
   
   
   //OUTER/ALTSTATE3
	switches.outerAltState3.left.x = 0.21 * background.width;
	switches.outerAltState3.left.y =  background.height / 1.12;
	switches.outerAltState3.right.x =  0.75 * background.width;
	switches.outerAltState3.right.y =  background.height / 1.12;
	
	rotationPoints.outer.altState3.right = {x: [], y: []};
	rotationPoints.outer.altState3.right.x[0] = rotationPoints.outer.narrow.x[2];
	rotationPoints.outer.altState3.right.x[1] = 0.66 * background.width;
	rotationPoints.outer.altState3.right.x[2] = rotationPoints.outer.altState3.right.x[0] - ( rotationPoints.outer.altState3.right.x[0] - rotationPoints.outer.altState3.right.x[1])/2;
	rotationPoints.outer.altState3.right.x[3] = rotationPoints.outer.altState3.right.x[0] - ( rotationPoints.outer.altState3.right.x[0] - rotationPoints.outer.altState3.right.x[1])/4;
	rotationPoints.outer.altState3.right.x[4] = rotationPoints.outer.altState3.right.x[1] + ( rotationPoints.outer.altState3.right.x[0] - rotationPoints.outer.altState3.right.x[1])/4;
	rotationPoints.outer.altState3.right.y[0] = rotationPoints.outer.narrow.y[2]
	rotationPoints.outer.altState3.right.y[1] = background.height / 1.04;
	rotationPoints.outer.altState3.right.y[2] = rotationPoints.outer.altState3.right.y[0] + ( rotationPoints.outer.altState3.right.y[1] - rotationPoints.outer.altState3.right.y[0])/2;	
	rotationPoints.outer.altState3.right.y[3] = rotationPoints.outer.altState3.right.y[0] + ( rotationPoints.outer.altState3.right.y[1] - rotationPoints.outer.altState3.right.y[0])/8;
	rotationPoints.outer.altState3.right.y[4] = rotationPoints.outer.altState3.right.y[1] - ( rotationPoints.outer.altState3.right.y[1] - rotationPoints.outer.altState3.right.y[0])/8;
		
	rotationPoints.outer.altState3.left = {x: [], y: []};
	rotationPoints.outer.altState3.left.x[0] = rotationPoints.outer.narrow.x[3];
	rotationPoints.outer.altState3.left.x[1] = 0.28 * background.width;
	rotationPoints.outer.altState3.left.x[2] = rotationPoints.outer.altState3.left.x[0] + (  rotationPoints.outer.altState3.left.x[1] - rotationPoints.outer.altState3.left.x[0] )/2
	rotationPoints.outer.altState3.left.x[3] = rotationPoints.outer.altState3.left.x[0] + ( rotationPoints.outer.altState3.left.x[1] -  rotationPoints.outer.altState3.left.x[0] )/4;
	rotationPoints.outer.altState3.left.x[4] = rotationPoints.outer.altState3.left.x[1] - ( rotationPoints.outer.altState3.left.x[1] -  rotationPoints.outer.altState3.left.x[0] )/4;
	rotationPoints.outer.altState3.left.y[0] = rotationPoints.outer.narrow.y[3];
	rotationPoints.outer.altState3.left.y[1] = background.height / 1.04;
	rotationPoints.outer.altState3.left.y[2] = rotationPoints.outer.altState3.left.y[0] + ( rotationPoints.outer.altState3.left.y[1] - rotationPoints.outer.altState3.left.y[0] )/2;
	rotationPoints.outer.altState3.left.y[3] = rotationPoints.outer.altState3.left.y[0] + ( rotationPoints.outer.altState3.left.y[1] - rotationPoints.outer.altState3.left.y[0] )/8;
	rotationPoints.outer.altState3.left.y[4] = rotationPoints.outer.altState3.left.y[1] - ( rotationPoints.outer.altState3.left.y[1] - rotationPoints.outer.altState3.left.y[0] )/8;

	var bezierPoints = {x:[rotationPoints.outer.altState3.right.x[0],rotationPoints.outer.altState3.right.x[3],rotationPoints.outer.altState3.right.x[3],rotationPoints.outer.altState3.right.x[2]], y:[rotationPoints.outer.altState3.right.y[0],rotationPoints.outer.altState3.right.y[3],rotationPoints.outer.altState3.right.y[3],rotationPoints.outer.altState3.right.y[2]]};
	var templenright = getBezierLength(bezierPoints,100);
	var bezierPoints = {x:[rotationPoints.outer.altState3.right.x[2],rotationPoints.outer.altState3.right.x[4],rotationPoints.outer.altState3.right.x[4],rotationPoints.outer.altState3.right.x[1]], y:[rotationPoints.outer.altState3.right.y[2],rotationPoints.outer.altState3.right.y[4],rotationPoints.outer.altState3.right.y[4],rotationPoints.outer.altState3.right.y[1]]};
	rotationPoints.outer.altState3.right.bezierLength = templenright + getBezierLength(bezierPoints,100);	
	
	var bezierPoints = {x:[rotationPoints.outer.altState3.left.x[0],rotationPoints.outer.altState3.left.x[3],rotationPoints.outer.altState3.left.x[3],rotationPoints.outer.altState3.left.x[2]], y:[rotationPoints.outer.altState3.left.y[0],rotationPoints.outer.altState3.left.y[3],rotationPoints.outer.altState3.left.y[3],rotationPoints.outer.altState3.left.y[2]]};
	var templenleft = getBezierLength(bezierPoints,100);
	var bezierPoints = {x:[rotationPoints.outer.altState3.left.x[2],rotationPoints.outer.altState3.left.x[4],rotationPoints.outer.altState3.left.x[4],rotationPoints.outer.altState3.left.x[1]], y:[rotationPoints.outer.altState3.left.y[2],rotationPoints.outer.altState3.left.y[4],rotationPoints.outer.altState3.left.y[4],rotationPoints.outer.altState3.left.y[1]]};
	rotationPoints.outer.altState3.left.bezierLength = templenleft + getBezierLength(bezierPoints,100);

	
  /*------------------------------------------------------------------------------------------------------------------*
   *  -----------------------------------------------------------                                                     *
   *  -      ___       ___                                      -                                                     *
   *  -     |   \      |   \   ________  _____   _______        -                                                     *
   *  -    |    \     |    \   | __   |  ||__|  | __   |        -        0-1: required                                *
   *  -   |  / \ \   |  / \ \  | |__| |  ||\    | |__| |        -                                                     *
   *  -  |  /   \ \ |  /   \ \ |______|  ||\\   |______|        -                                                     *
   *  -  ______________________________________________         -                                                     *
   *  - 3_3__4_4________________________________________4 4 3 3 -                                                     *
   *  0----2----1-------------------------------------1----2----0                                                     *
   *------------------------------------------------------------------------------------------------------------------*/
   
   
   function getBezierLength(bezierPoints,repNo){
		var x = [];
		var y = [];
		for(var i = 0; i <= repNo; i++){
			x[i] = getBezierPoints(i/repNo,bezierPoints.x[0],bezierPoints.x[1],bezierPoints.x[2],bezierPoints.x[3]);
			y[i] = getBezierPoints(i/repNo,bezierPoints.y[0],bezierPoints.y[1],bezierPoints.y[2],bezierPoints.y[3]);
		}
		var dis = 0;
		for(var i = 0; i < x.length-1; i++){
			dis += Math.sqrt(Math.pow(Math.abs(x[i]-x[i+1]),2)+Math.pow(Math.abs(Math.abs(y[i]-y[i+1]),2),2));
		}
		return dis;
	}
   
	function getBezierPoints(fac, a,b,c,d) {
		  return Math.pow((1-fac),3)*a+3*fac*Math.pow((1-fac),2)*b+3*Math.pow((fac),2)*(1-fac)*c+Math.pow(fac,3)*d;
	 }
   
 }
 
 function defineTrainSpeeds(){
  trains[0].speed = (1/500)*background.width;
  trains[1].speed = (1/250)*background.width;
  trains[2].speed = (1/375)*background.width;
  
 } 
}
  
function defineCarParams(){ 
  for(var i = 0; i < cars.length; i++){
    cars[i].speed = cars[i].speed*background.width;
  }
  for(var i = 0; i < carPaths.length; i++){
    for(var j = 0; j < carPaths[i].length; j++){
      for(var k = 0; k < carPaths[i][j].x.length; k++){
          carPaths[i][j].x[k]*=background.width;
      }
      for(var k = 0; k < carPaths[i][j].y.length; k++){
          carPaths[i][j].y[k]*=background.height;
      }
    }
  }
} 

function placeBackground() {
    if (client.width / client.height < pics[background.src].width / pics[background.src].height) {
        background.width = client.width;
        background.height = pics[background.src].height * (client.width / pics[background.src].width);
        background.x = 0;
        background.y = client.height / 2 - background.height / 2;
    } else {
    	  background.width = pics[background.src].width * (client.height / pics[background.src].height);
        background.height = client.height;
        background.x = client.width / 2 - background.width / 2;
        background.y = 0;
    }
}

function placeClassicUIElements(){
	var fac = 0.04;
	classicUI.trainSwitch.width = fac * (background.width);
  classicUI.trainSwitch.height = fac * (pics[classicUI.trainSwitch.src].height * (background.width / pics[classicUI.trainSwitch.src].width));
	fac = 0.07;
	classicUI.transformer.width = fac * (background.width);
  classicUI.transformer.height = fac * (pics[classicUI.transformer.src].height * (background.width / pics[classicUI.transformer.src].width));
  fac = 0.7;
  classicUI.transformer.input.width = classicUI.transformer.input.height = fac * classicUI.transformer.width;
  fac = 0.17;
  classicUI.transformer.directionInput.width = fac * classicUI.transformer.width;
  classicUI.transformer.directionInput.height = fac * (pics[classicUI.transformer.directionInput.src].height * ( classicUI.transformer.width/ pics[classicUI.transformer.directionInput.src].width));
	
  classicUI.trainSwitch.x = background.x + background.width / 30;
	classicUI.trainSwitch.y = background.y + background.height/1.2;
	classicUI.transformer.x = background.x + background.width / 1.1;
	classicUI.transformer.y = background.y + background.height/1.4;
	classicUI.transformer.input.diffY = classicUI.transformer.height/6;
	classicUI.transformer.directionInput.diffX = classicUI.transformer.width*0.46-classicUI.transformer.directionInput.width;
	classicUI.transformer.directionInput.diffY = classicUI.transformer.height*0.46-classicUI.transformer.directionInput.height;
	
	var cwidth =  background.width*0.07;
 	context.textBaseline = "middle";
	var longestName = 0;
	for (var i = 1; i < trains.length; i++){
			if ( trains[i].name.length > trains[i-1].name.length){
					longestName = i;
			}
	}
	classicUI.trainSwitch.selectedTrainDisplay.font = measureFontSize(trains[longestName].name,"sans-serif",background.height*cwidth/background.width,cwidth, 5, background.height/100,0);
	context.font = classicUI.trainSwitch.selectedTrainDisplay.font;
	classicUI.trainSwitch.selectedTrainDisplay.width = 1.2*context.measureText(trains[longestName].name).width;
	classicUI.trainSwitch.selectedTrainDisplay.height = 1.6*getFontSize(classicUI.trainSwitch.selectedTrainDisplay.font, "px");
}
                                                         
/******************************************
             animate_ functions
******************************************/
function animateObjects() {

	if(!settings.cursorascircle) {
		canvas.style.cursor = "default";
	} else {
		canvas.style.cursor = "none";
	}

	frameNo++;
	  if(frameNo % 1000000 == 0){
	    notify(frameNo/1000000 + ' Millionen Frames gezeigt.', false, 500, null, null, background.y);
	  }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(pics[background.src], background.x, background.y, background.width, background.height);
	
    for(var i = 0; i < trains.length; i++) {
      animateTrains(i);
    } 
    for(var i = 0; i < cars.length; i++) {
      animateCars(i);
    }
	
	context.drawImage(pics[background.secondLayer], background.x, background.y, background.width, background.height);
	
	if(settings.burnTheTaxOffice){
		animateTaxOffice();
	}
    if(settings.classicUI) {
		animateTrafo();
	}
	context.save();
    context.fillStyle = "rgba(0,0,0,0.85)";
	context.fillRect(0,0,background.x,canvas.height);
    context.fillRect(0,0,canvas.width,background.y);
    context.fillRect(canvas.width-background.x,0,background.x,canvas.height);
    context.fillRect(0,canvas.height-background.y,canvas.width,background.y);
    context.restore();
	
	if(konamistate < 0) {
		context.save();
		var bgGradient = context.createRadialGradient(0,canvas.height/2,canvas.height/2,canvas.width+canvas.height/2,canvas.height/2,canvas.height/2);
		bgGradient.addColorStop(0, "red");
		bgGradient.addColorStop(0.2,"orange");
		bgGradient.addColorStop(0.4,"yellow");
		bgGradient.addColorStop(0.6,"lightgreen");
		bgGradient.addColorStop(0.8,"blue");
		bgGradient.addColorStop(1,"violet");
		context.fillStyle = bgGradient;
		context.fillRect(0,0,background.x,canvas.height);
		context.fillRect(0,0,canvas.width,background.y);
		context.fillRect(canvas.width-background.x,0,background.x,canvas.height);
		context.fillRect(0,canvas.height-background.y,canvas.width,background.y);
		if(konamistate == -1) {
			context.fillStyle = "black";
			context.fillRect(background.x,background.y,background.width,background.height);
			context.textAlign = 'center';
			context.fillStyle = bgGradient;
			var konamiText = "Super - Sie haben den Konamicode geknackt!";
			context.font = measureFontSize(konamiText,"monospace",100,background.width/1.1,5, background.width/300, 0);
			context.fillText(konamiText,background.x+background.width/2,background.y+background.height/2); 
			context.fillText("🚂🚂🚂",background.x+background.width/2,background.y+background.height/4); 
			context.fillText("🚂🚂🚂",background.x+background.width/2,background.y+background.height/2+background.height/4); 
		}
		context.restore();
		context.save();
		var imgData = context.getImageData(background.x, background.y, background.width, background.height);
		var data = imgData.data;
		for (var i = 0; i < data.length; i += 8) {
			data[i] = data[i+4] = Math.min(255,data[i] < 120 ? data[i]/1.3 : data[i]*1.1);
			data[i+1] = data[i+5] = Math.min(255,data[i+1] < 120 ? data[i+1]/1.3 : data[i+1]*1.1);
			data[i+2] = data[i+6] = Math.min(255,data[i+2] < 120 ? data[i+2]/1.3 : data[i+2]*1.1);
		}
		context.putImageData(imgData, background.x, background.y);
		context.restore();
	}
	
	if(settings.cursorascircle && client.chosenInputMethod == "mouse" && (hardware.mouse.isMoving || hardware.mouse.isHold) && hardware.mouse.cursor != "none") {
		context.save();
		context.translate(hardware.mouse.moveX, hardware.mouse.moveY);
		context.fillStyle = hardware.mouse.isHold && hardware.mouse.cursor == "pointer" ? "rgba(65,56,65," + (Math.random() * (0.3) + 0.6) + ")" : hardware.mouse.isHold ? "rgba(144,64,64," + (Math.random() * (0.3) + 0.6) + ")" : hardware.mouse.cursor == "pointer" ? "rgba(127,111,127," + (Math.random() * (0.3) + 0.6) + ")" : "rgba(255,250,240,0.5)";
		var rectsize = canvas.width / 75;
		context.beginPath();
		context.arc(0,0,rectsize/2,0,2*Math.PI);
		context.fill();
		context.fillStyle = hardware.mouse.isHold && hardware.mouse.cursor == "pointer" ? "rgba(50,45,50,1)" : hardware.mouse.isHold ? "rgba(200,64,64,1)" : hardware.mouse.cursor == "pointer" ? "rgba(100,90,100,1)" : "rgba((255,250,240,0.5)";
		context.beginPath();
		context.arc(0,0,rectsize/4,0,2*Math.PI);
		context.fill();
		context.restore();
	}
		
	
    if(resized) {
      var oldbackground = {x:background.x,y:background.y,width:background.width,height:background.height};
        
      extendedMeasureViewspace();
    
    
      placeBackground();
      for(var i = 0; i < trains.length; i++){
		  for(var j = 0; j < trains[i].circle.x.length; j++) {
			trains[i].circle.x[j] *= background.width/oldbackground.width;
			trains[i].circle.y[j] *= background.height/oldbackground.height;
		  }
      }	  
      defineTrainParams();
      for(var i = 0; i < cars.length; i++){
          cars[i].speed *= background.width/oldbackground.width;
      }
      for(var i = 0; i < carPaths.length; i++){
          for(var j = 0; j < carPaths[i].length; j++){
            for(var k = 0; k < carPaths[i][j].x.length; k++){
                carPaths[i][j].x[k]*=background.width/oldbackground.width;
            }
            for(var k = 0; k < carPaths[i][j].y.length; k++){
                carPaths[i][j].y[k]*=background.height/oldbackground.height;
            }
          }
      }
      
      placeTrainsAtNewPositions();
      placeCarsAtNewPositions();
      if(settings.classicUI){
        placeClassicUIElements();
      }
      placeOptions("resize");
    
      resized = false;
    
      // Größe ändern
      function placeTrainsAtNewPositions() {
        for(var i = 0; i < trains.length; i++){  
      	  trains[i].x = background.x+((trains[i].x-oldbackground.x) * background.width/oldbackground.width);
          trains[i].y = background.y+((trains[i].y-oldbackground.y) * background.height/oldbackground.height);
          trains[i].width = trains[i].width * background.width/oldbackground.width;
          trains[i].height = trains[i].height * background.height/oldbackground.height;
          for(var j = 0; j < trains[i].cars.length; j++){
          	  trains[i].cars[j].x = background.x+((trains[i].cars[j].x-oldbackground.x) * background.width/oldbackground.width);
              trains[i].cars[j].y = background.y+((trains[i].cars[j].y-oldbackground.y) * background.height/oldbackground.height);
              trains[i].cars[j].width = trains[i].cars[j].width * background.width/oldbackground.width;
              trains[i].cars[j].height = trains[i].cars[j].height * background.height/oldbackground.height;
          }
        } 
       
      }  
    
      function placeCarsAtNewPositions() {
        for(var i = 0; i < cars.length; i++){    
			cars[i].x *= background.width/oldbackground.width;
			cars[i].y *= background.height/oldbackground.height;
			cars[i].width *= background.width / oldbackground.width;
			cars[i].height *= background.height / oldbackground.height;
        } 
      
      }
      
      
    }
    scheduledTask = window.requestAnimationFrame(animateObjects);
    
    
 function animateTrains(input1){
  for(var i = -1; i < trains[input1].cars.length; i++){
    var currentObject = (i < 0)?trains[input1]:trains[input1].cars[i];

    if(trains[input1].standardDirection){ //Wechseln des Streckenabschnittes
      if (currentObject.state == 1 && Math.round(currentObject.x - background.x) >= Math.round(trains[input1].circle.x[1]) && Math.round(currentObject.y - background.y) <= background.height/2) {
        if(classicUI.switches.display && i == -1 && trains[input1].circleFamily == rotationPoints.outer && switches.inner2outer.right.turned){
			  	trains[input1].switchCircles = true;
		}  
		if(trains[input1].switchCircles){
				currentObject.x = background.x + Math.round(rotationPoints.outer.narrow.x[1]);
				currentObject.y = background.y + Math.round(rotationPoints.outer.narrow.y[1]);
				currentObject.state = -2; 
				currentObject.angle = 0;
				currentObject.currentCurveFac = 0;
				if(i == -1) {
					trains[input1].circle = JSON.parse(JSON.stringify(trains[input1].circle)); //
					trains[input1].circle.x[2] = rotationPoints.inner.narrow.x[2];
					trains[input1].circle.y[2] = rotationPoints.inner.narrow.y[2];
					trains[input1].circle.x[3] = rotationPoints.inner.narrow.x[3];
					trains[input1].circle.y[3] = rotationPoints.inner.narrow.y[3];
					trains[input1].circle.x[4] = rotationPoints.inner2outer.right.x[1];
					trains[input1].circle.y[4] = rotationPoints.inner2outer.right.y[1];
					trains[input1].circle.x[5] = rotationPoints.inner2outer.right.x[2];
					trains[input1].circle.y[5] = rotationPoints.inner2outer.right.y[2];
					trains[input1].circleFamily = null;
				}
		  } else {
				currentObject.x = background.x + Math.round(trains[input1].circle.x[1]);
				currentObject.y = background.y + Math.round(trains[input1].circle.y[1]);
				currentObject.state++;
				currentObject.angle = 0; 
				currentObject.currentCurveFac = 0;
		  }
      } else if (Math.abs(currentObject.state) == 2 && Math.round(currentObject.x - background.x) <= Math.round(trains[input1].circle.x[2]) && Math.round(currentObject.y - background.y) >= background.height/2) {
    	if(currentObject.state == -2 && i == trains[input1].cars.length-1) {
				trains[input1].circle = rotationPoints.inner.narrow;
				trains[input1].circleFamily = rotationPoints.inner;
				trains[input1].switchCircles = false;
		}
		currentObject.x = background.x + Math.round(trains[input1].circle.x[2]);
        currentObject.y = background.y + Math.round(trains[input1].circle.y[2]);
		currentObject.currentCurveFac=0;
        currentObject.state = ((trains[input1].circleFamily == rotationPoints.outer && switches.outerAltState3.right.turned && i == -1) || trains[input1].state == -3) ? -3 : 3;
      } else if (Math.abs(currentObject.state) == 3 && Math.round(currentObject.x - background.x) <= Math.round(trains[input1].circle.x[3]) && Math.round(currentObject.y - background.y) >= background.height/2) {
		  if(classicUI.switches.display && i == -1 && trains[input1].circleFamily == rotationPoints.inner && switches.inner2outer.left.turned){
			  	trains[input1].switchCircles = true;
		  } else if (classicUI.switches.display && i == -1 && trains[input1].circleFamily == rotationPoints.inner && switches.innerWide.left.turned) {
			  trains[input1].circle = rotationPoints.inner.wide;
		  } else if (classicUI.switches.display && i == -1 && trains[input1].circleFamily == rotationPoints.inner) {
			  trains[input1].circle = rotationPoints.inner.narrow;  
		  }
		  if(trains[input1].switchCircles){
				currentObject.x = background.x + Math.round(rotationPoints.inner.narrow.x[3]);
				currentObject.y = background.y + Math.round(rotationPoints.inner.narrow.y[3]);
				currentObject.state = -4; 
				currentObject.angle = Math.PI;
				currentObject.currentCurveFac = 0;
				if(i == -1) {
					trains[input1].circle = JSON.parse(JSON.stringify(trains[input1].circle)); //
					trains[input1].circle.x[0] = rotationPoints.outer.narrow.x[0];
					trains[input1].circle.y[0] = rotationPoints.outer.narrow.y[0];
					trains[input1].circle.x[1] = rotationPoints.outer.narrow.x[1];
					trains[input1].circle.y[1] = rotationPoints.outer.narrow.y[1];
					trains[input1].circle.x[6] = rotationPoints.inner2outer.left.x[1];
					trains[input1].circle.y[6] = rotationPoints.inner2outer.left.y[1];
					trains[input1].circle.x[7] = rotationPoints.inner2outer.left.x[2];
					trains[input1].circle.y[7] = rotationPoints.inner2outer.left.y[2];
					trains[input1].circleFamily = null;
				}
		  } else {
				currentObject.x = background.x + Math.round(trains[input1].circle.x[3]);
				currentObject.y = background.y + Math.round(trains[input1].circle.y[3]);
				currentObject.state=4;
				currentObject.angle = Math.PI;
				currentObject.currentCurveFac = 0;
		  }
      } else if (Math.abs(currentObject.state) == 4 && Math.round(currentObject.x - background.x) >= Math.round(trains[input1].circle.x[0]) && Math.round(currentObject.y - background.y) <= background.height/2) {
			if(currentObject.state == -4 && i == trains[input1].cars.length-1) {
				trains[input1].circle = rotationPoints.outer.narrow;
				trains[input1].circleFamily = rotationPoints.outer;
				trains[input1].switchCircles = false;
			}
			currentObject.x = background.x + Math.round(trains[input1].circle.x[0]);
			currentObject.y = background.y + Math.round(trains[input1].circle.y[0]);
			currentObject.state = 1;
			
      }
    } else {
      if (currentObject.state == 1 && Math.round(currentObject.x - background.x) <= Math.round(trains[input1].circle.x[0]) && Math.round(currentObject.y - background.y) <= background.height/2) {
        
		if(classicUI.switches.display && i == trains[input1].cars.length-1 && trains[input1].circleFamily == rotationPoints.outer && switches.inner2outer.left.turned){
			  	trains[input1].switchCircles = true;
		  }
		  if(trains[input1].switchCircles){
				currentObject.x = background.x + Math.round(rotationPoints.outer.narrow.x[0]);
				currentObject.y = background.y + Math.round(rotationPoints.outer.narrow.y[0]);
				currentObject.state = -4; 
				currentObject.angle = 2*Math.PI;
				currentObject.currentCurveFac = 1;
				if(i == trains[input1].cars.length-1) {
					trains[input1].circle = JSON.parse(JSON.stringify(trains[input1].circle)); //
					trains[input1].circle.x[3] = rotationPoints.inner.narrow.x[3];
					trains[input1].circle.y[3] = rotationPoints.inner.narrow.y[3];
					trains[input1].circle.x[2] = rotationPoints.inner.narrow.x[2];
					trains[input1].circle.y[2] = rotationPoints.inner.narrow.y[2];
					trains[input1].circle.x[6] = rotationPoints.inner2outer.left.x[1];
					trains[input1].circle.y[6] = rotationPoints.inner2outer.left.y[1];
					trains[input1].circle.x[7] = rotationPoints.inner2outer.left.x[2];
					trains[input1].circle.y[7] = rotationPoints.inner2outer.left.y[2];
					trains[input1].circleFamily = null;
				}
		  } else {
					currentObject.x = background.x + Math.round(trains[input1].circle.x[0]);
					currentObject.y = background.y + Math.round(trains[input1].circle.y[0]);
					currentObject.state = 4;
					currentObject.angle = 2*Math.PI; 
					currentObject.currentCurveFac = 1;
		  }
      } else if (Math.abs(currentObject.state) == 2 && Math.round(currentObject.x - background.x) <= Math.round(trains[input1].circle.x[1]) && Math.round(currentObject.y - background.y) <= background.height/2) {
    	if(currentObject.state == -2 && i == -1) {
				trains[input1].circle = rotationPoints.outer.narrow;
				trains[input1].circleFamily = rotationPoints.outer;
				trains[input1].switchCircles = false;
		}
		currentObject.x = background.x + Math.round(trains[input1].circle.x[1]);
        currentObject.y = background.y + Math.round(trains[input1].circle.y[1]);
        currentObject.state=1;
      } else if (Math.abs(currentObject.state) == 3 && Math.round(currentObject.x - background.x) >= Math.round(trains[input1].circle.x[2]) && Math.round(currentObject.y - background.y) >= background.height/2) {
		  if(classicUI.switches.display && i == trains[input1].cars.length-1 && trains[input1].circleFamily == rotationPoints.inner && switches.inner2outer.right.turned){
			  	trains[input1].switchCircles = true;
		  } else if(classicUI.switches.display && i == trains[input1].cars.length-1 && trains[input1].circleFamily == rotationPoints.inner && switches.innerWide.right.turned){
			  	trains[input1].circle = rotationPoints.inner.wide;
		  } else if(classicUI.switches.display && i == trains[input1].cars.length-1 && trains[input1].circleFamily == rotationPoints.inner){
			  	trains[input1].circle = rotationPoints.inner.narrow;
		  }
		  if(trains[input1].switchCircles){
				currentObject.x = background.x + Math.round(rotationPoints.inner.narrow.x[2]);
				currentObject.y = background.y + Math.round(rotationPoints.inner.narrow.y[2]);
				currentObject.state = -2; 
				currentObject.angle = Math.PI;
				currentObject.currentCurveFac = 1;
				if(i == trains[input1].cars.length-1) {
					trains[input1].circle = JSON.parse(JSON.stringify(trains[input1].circle)); //
					trains[input1].circle.x[1] = rotationPoints.outer.narrow.x[1];
					trains[input1].circle.y[1] = rotationPoints.outer.narrow.y[1];
					trains[input1].circle.x[0] = rotationPoints.outer.narrow.x[0];
					trains[input1].circle.y[0] = rotationPoints.outer.narrow.y[0];
					trains[input1].circle.x[4] = rotationPoints.inner2outer.right.x[1];
					trains[input1].circle.y[4] = rotationPoints.inner2outer.right.y[1];
					trains[input1].circle.x[5] = rotationPoints.inner2outer.right.x[2];
					trains[input1].circle.y[5] = rotationPoints.inner2outer.right.y[2];
					trains[input1].circleFamily = null;
				}
		  } else {
					currentObject.x = background.x + Math.round(trains[input1].circle.x[2]);
					currentObject.y = background.y + Math.round(trains[input1].circle.y[2]);
					currentObject.state = 2;
					currentObject.angle = Math.PI;
					currentObject.currentCurveFac = 1;
		  }
        
      } else if (Math.abs(currentObject.state) == 4 && Math.round(currentObject.x - background.x) >= Math.round(trains[input1].circle.x[3]) && Math.round(currentObject.y - background.y) >= background.height/2) {
        if(currentObject.state == -4 && i == -1) {
				trains[input1].circle = rotationPoints.inner.narrow;
				trains[input1].circleFamily = rotationPoints.inner;
				trains[input1].switchCircles = false;
		}
		currentObject.x = background.x + Math.round(trains[input1].circle.x[3]);
        currentObject.y = background.y + Math.round(trains[input1].circle.y[3]);
		currentObject.currentCurveFac=0;
		currentObject.state = ((trains[input1].circleFamily == rotationPoints.outer && switches.outerAltState3.left.turned && (trains[input1].cars.length > 0 || i == trains[input1].cars.length-1)) || (trains[input1].cars.length > 0 && trains[input1].cars[trains[input1].cars.length-1].state == -3)) ? -3 : 3;

      }
    }	
			
    if (trains[input1].move) { //Position des Objektes berechenen
    	if(currentObject.state == 1){
        var linearPoints = {x:[trains[input1].circle.x[0] + background.x,trains[input1].circle.x[1] + background.x],y:[trains[input1].circle.y[0] + background.y,trains[input1].circle.y[1] + background.y]};
    		if(!trains[input1].standardDirection){linearPoints.x.reverse();linearPoints.y.reverse();}
        calcLinear(linearPoints, !trains[input1].standardDirection, false) ;
    	} else if(Math.abs(currentObject.state) == 2)  { 
        if(typeof trains[input1].circle.x[4] == "undefined" || typeof trains[input1].circle.x[5] == "undefined" || typeof trains[input1].circle.y[4] == "undefined" || typeof trains[input1].circle.y[5] == "undefined"){
    		  var circlePoints ={x:[trains[input1].circle.x[1]+background.x],y:[trains[input1].circle.y[1]+background.y,trains[input1].circle.y[2]+background.y]};
          calcCircle(circlePoints, !trains[input1].standardDirection);
        } else { 
          var bezierPoints ={x:[trains[input1].circle.x[1] + background.x,trains[input1].circle.x[4] + background.x,trains[input1].circle.x[5] + background.x,trains[input1].circle.x[2] + background.x],y:[trains[input1].circle.y[1] + background.y,trains[input1].circle.y[4] + background.y,trains[input1].circle.y[5] + background.y,trains[input1].circle.y[2] + background.y]};
          calcBezier(bezierPoints, !trains[input1].standardDirection, currentObject.state == -2 ? rotationPoints.inner2outer.right.bezierLength : trains[input1].circle.bezierLength.right);
        }
    	} else if ((currentObject.state) == 3) {
    		var linearPoints =  {x:[trains[input1].circle.x[2] + background.x,trains[input1].circle.x[3] + background.x],y:[trains[input1].circle.y[2] + background.y,trains[input1].circle.y[3] + background.y]};
    		if(!trains[input1].standardDirection){linearPoints.x.reverse();linearPoints.y.reverse();}
			calcLinear(linearPoints,!trains[input1].standardDirection, true);
    	} else if (currentObject.state == -3) {
    		if(trains[input1].circleFamily == rotationPoints.outer) {
				if(currentObject.x > rotationPoints.outer.altState3.right.x[1]+background.x) {
					if(currentObject.x-background.x > rotationPoints.outer.altState3.right.x[2]){
						var bezierPoints ={x:[background.x+rotationPoints.outer.altState3.right.x[0],background.x+rotationPoints.outer.altState3.right.x[3],background.x+rotationPoints.outer.altState3.right.x[3],background.x+rotationPoints.outer.altState3.right.x[2]],y:[background.y+rotationPoints.outer.altState3.right.y[0],background.y+rotationPoints.outer.altState3.right.y[3],background.y+rotationPoints.outer.altState3.right.y[3],background.y+rotationPoints.outer.altState3.right.y[2]]};
						calcBezier(bezierPoints, !trains[input1].standardDirection, 0.5*rotationPoints.outer.altState3.right.bezierLength);
					} else {
						var bezierPoints ={x:[background.x+rotationPoints.outer.altState3.right.x[2],background.x+rotationPoints.outer.altState3.right.x[4],background.x+rotationPoints.outer.altState3.right.x[4],background.x+rotationPoints.outer.altState3.right.x[1]],y:[background.y+rotationPoints.outer.altState3.right.y[2],background.y+rotationPoints.outer.altState3.right.y[4],background.y+rotationPoints.outer.altState3.right.y[4],background.y+rotationPoints.outer.altState3.right.y[1]]};
						bezierPoints.x.reverse();
						bezierPoints.y.reverse();
						calcBezier(bezierPoints, trains[input1].standardDirection, 0.5*rotationPoints.outer.altState3.right.bezierLength);
						currentObject.displayAngle += Math.PI;
						currentObject.angle += Math.PI;
					}
				} else if(currentObject.x > rotationPoints.outer.altState3.left.x[1]+background.x) {
					var linearPoints =  {x:[rotationPoints.outer.altState3.right.x[1] + background.x, rotationPoints.outer.altState3.left.x[1] + background.x],y:[rotationPoints.outer.altState3.right.y[1] + background.y,rotationPoints.outer.altState3.left.y[1] + background.y]};
					if(!trains[input1].standardDirection){linearPoints.x.reverse();linearPoints.y.reverse();}
					calcLinear(linearPoints,!trains[input1].standardDirection, true);
					currentObject.currentCurveFac = 0;
				} else {
					if(currentObject.x-background.x > rotationPoints.outer.altState3.left.x[2]){
						var x1 = rotationPoints.outer.altState3.left.x[1] + background.x;
						var x2 = rotationPoints.outer.altState3.left.x[2] + background.x;
						var x3 = rotationPoints.outer.altState3.left.x[4] + background.x;
						var y1 = rotationPoints.outer.altState3.left.y[1] + background.y;
						var y2 = rotationPoints.outer.altState3.left.y[2] + background.y;
						var y3 = rotationPoints.outer.altState3.left.y[4] + background.y;
						var bezierPoints ={x:[x1,x3,x3,x2],y:[y1,y3,y3,y2]};
						calcBezier(bezierPoints, !trains[input1].standardDirection,0.5*rotationPoints.outer.altState3.left.bezierLength);					
					} else {
						var x1 = rotationPoints.outer.altState3.left.x[2] + background.x;
						var x2 = rotationPoints.outer.altState3.left.x[0] + background.x;
						var x3 = rotationPoints.outer.altState3.left.x[3] + background.x;
						var y1 = rotationPoints.outer.altState3.left.y[2] + background.y;
						var y2 = rotationPoints.outer.altState3.left.y[0] + background.y;
						var y3 = rotationPoints.outer.altState3.left.y[3] + background.y;
						var bezierPoints ={x:[x1,x3,x3,x2],y:[y1,y3,y3,y2]};
						bezierPoints.x.reverse();
						bezierPoints.y.reverse();
						calcBezier(bezierPoints, trains[input1].standardDirection,0.5*rotationPoints.outer.altState3.left.bezierLength);
						currentObject.displayAngle += Math.PI;
						currentObject.angle += Math.PI;		

					}
				}
			}
    	} else if(Math.abs(currentObject.state) == 4 ){
        if(typeof trains[input1].circle.x[6] == "undefined" || typeof trains[input1].circle.x[7] == "undefined" || typeof trains[input1].circle.y[6] == "undefined" || typeof trains[input1].circle.y[7] == "undefined"){
          var circlePoints = {x:[trains[input1].circle.x[0]+background.x],y:[trains[input1].circle.y[0]+background.y,trains[input1].circle.y[3]+background.y]};
          calcCircle(circlePoints, !trains[input1].standardDirection);
        } else {
          var bezierPoints ={x:[trains[input1].circle.x[3] + background.x,trains[input1].circle.x[6] + background.x,trains[input1].circle.x[7] + background.x,trains[input1].circle.x[0] + background.x],y:[trains[input1].circle.y[3] + background.y,trains[input1].circle.y[6] + background.y,trains[input1].circle.y[7] + background.y,trains[input1].circle.y[0] + background.y]};
          calcBezier(bezierPoints, !trains[input1].standardDirection, currentObject.state == -4 ? rotationPoints.inner2outer.left.bezierLength : trains[input1].circle.bezierLength.left);       
        }
    	}
      	 currentObject.displayAngle = currentObject.angle;

    }
	
	if(i > -1  && trains[input1].move ){ //Korrektur der angezeigten Wagenposition und des angezeigten Wagenwinkels
      var prevCurrentObject = i > 0 ? trains[input1].cars[i-1] : trains[input1];
      var distance =  Math.round(Math.sqrt(Math.pow(currentObject.x - prevCurrentObject.x,2)+Math.pow(currentObject.y - prevCurrentObject.y,2),2));
      var supposedDistance =  Math.round(trains[input1].width/trainMarginNumber + currentObject.width/2 + prevCurrentObject.width/2);
                  
                  currentObject.x-= (supposedDistance-distance)*Math.cos(currentObject.angle);
                  currentObject.y-= (supposedDistance-distance)*Math.sin(currentObject.angle);
				  
                   if(currentObject.state == 1){
					   
                    currentObject.displayAngle =  Math.asin((trains[input1].circle.y[1]-trains[input1].circle.y[0])/(trains[input1].circle.x[1]-trains[input1].circle.x[0]))
                   
				   } else if(Math.abs(currentObject.state) == 2){
                    
					if(typeof trains[input1].circle.x[4] == "undefined" || typeof trains[input1].circle.x[5] == "undefined" || typeof trains[input1].circle.y[4] == "undefined" || typeof trains[input1].circle.y[5] == "undefined"){
                     var radius = Math.abs(trains[input1].circle.y[2]-trains[input1].circle.y[1])/2;    
                     var chord =   Math.sqrt(Math.pow(currentObject.x-background.x-trains[input1].circle.x[1],2)+Math.pow(currentObject.y-background.y-trains[input1].circle.y[1],2));
                     var arc = (chord/2/radius) <= 1 ? (chord/2/radius) >= 0 ? Math.asin((chord/2/radius))*2*radius : 0 : Math.asin(1)*2*radius ;
                     currentObject.displayAngle = (arc / radius) > Math.PI? Math.PI:(arc / radius);
                    } else {
                      var a = {x:trains[input1].circle.x[1] +background.x,y:trains[input1].circle.y[1] +background.y};
                      var b = {x:trains[input1].circle.x[4] +background.x,y:trains[input1].circle.y[4] +background.y};
                      var c = {x:trains[input1].circle.x[5] +background.x,y:trains[input1].circle.y[5] +background.y};
                      var d = {x:trains[input1].circle.x[2] +background.x,y:trains[input1].circle.y[2] +background.y};
                      var x =  [trains[input1].circle.x[1],trains[input1].circle.x[4],trains[input1].circle.x[5],trains[input1].circle.x[2]];
                      var y =  [trains[input1].circle.y[1],trains[input1].circle.y[4],trains[input1].circle.y[5],trains[input1].circle.y[2]];
					  setNewBezierDisplayAngle(a,b,c,d,0,0.01,x,y);
                    }
					
                   } else if(currentObject.state == 3){
                    
					currentObject.displayAngle =  Math.PI+Math.asin((trains[input1].circle.y[3]-trains[input1].circle.y[2])/(trains[input1].circle.x[3]-trains[input1].circle.x[2]))
                  
				   } else if(currentObject.state == -3){//TODO
					   
						if(currentObject.x > rotationPoints.outer.altState3.right.x[1]+background.x) {
							if(currentObject.x-background.x > rotationPoints.outer.altState3.right.x[2]){
								var a ={x:background.x+rotationPoints.outer.altState3.right.x[0],y:background.y+rotationPoints.outer.altState3.right.y[0]};
								var b ={x:background.x+rotationPoints.outer.altState3.right.x[3],y:background.y+rotationPoints.outer.altState3.right.y[3]};
								var c ={x:background.x+rotationPoints.outer.altState3.right.x[3],y:background.y+rotationPoints.outer.altState3.right.y[2]};
								var d ={x:background.x+rotationPoints.outer.altState3.right.x[2],y:background.y+rotationPoints.outer.altState3.right.y[2]};
								var x = [rotationPoints.outer.altState3.right.x[0],rotationPoints.outer.altState3.right.x[3],rotationPoints.outer.altState3.right.x[3],rotationPoints.outer.altState3.right.x[2]];
								var y = [rotationPoints.outer.altState3.right.y[0],rotationPoints.outer.altState3.right.y[3],rotationPoints.outer.altState3.right.y[3],rotationPoints.outer.altState3.right.y[2]];
							} else {
								var bezierPoints ={x:[background.x+rotationPoints.outer.altState3.right.x[2],background.x+rotationPoints.outer.altState3.right.x[4],background.x+rotationPoints.outer.altState3.right.x[4],background.x+rotationPoints.outer.altState3.right.x[1]],y:[background.y+rotationPoints.outer.altState3.right.y[2],background.y+rotationPoints.outer.altState3.right.y[4],background.y+rotationPoints.outer.altState3.right.y[4],background.y+rotationPoints.outer.altState3.right.y[1]]};
							}
						} else if(currentObject.x > rotationPoints.outer.altState3.left.x[1]+background.x) {
							currentObject.displayAngle =  Math.PI+Math.asin((rotationPoints.outer.altState3.left.y[1]-rotationPoints.outer.altState3.right.y[1])/(rotationPoints.outer.altState3.left.x[1]-rotationPoints.outer.altState3.right.x[1]))
						} else {
							if(currentObject.x-background.x > rotationPoints.outer.altState3.left.x[2]){
								var x1 = rotationPoints.outer.altState3.left.x[1] + background.x;
								var x2 = rotationPoints.outer.altState3.left.x[2] + background.x;
								var x3 = rotationPoints.outer.altState3.left.x[4] + background.x;
								var y1 = rotationPoints.outer.altState3.left.y[1] + background.y;
								var y2 = rotationPoints.outer.altState3.left.y[2] + background.y;
								var y3 = rotationPoints.outer.altState3.left.y[4] + background.y;
								var bezierPoints ={x:[x1,x3,x3,x2],y:[y1,y3,y3,y2]};
							} else {
								var x1 = rotationPoints.outer.altState3.left.x[2] + background.x;
								var x2 = rotationPoints.outer.altState3.left.x[0] + background.x;
								var x3 = rotationPoints.outer.altState3.left.x[3] + background.x;
								var y1 = rotationPoints.outer.altState3.left.y[2] + background.y;
								var y2 = rotationPoints.outer.altState3.left.y[0] + background.y;
								var y3 = rotationPoints.outer.altState3.left.y[3] + background.y;
							}
						}			
					  
				   } else if(Math.abs(currentObject.state) == 4){
                    
					if(typeof trains[input1].circle.x[6] == "undefined" || typeof trains[input1].circle.x[7] == "undefined" || typeof trains[input1].circle.y[6] == "undefined" || typeof trains[input1].circle.y[7] == "undefined"){
                     var radius = Math.abs(trains[input1].circle.y[3]-trains[input1].circle.y[0])/2;    
                     var chord =   Math.sqrt(Math.pow(currentObject.x-background.x-trains[input1].circle.x[3],2)+Math.pow(currentObject.y-background.y-trains[input1].circle.y[0],2));
                     var arc = (chord/2/radius) <= 1 ? (chord/2/radius) >= 0 ? Math.asin((chord/2/radius))*2*radius : 0 : Math.asin(1)*2*radius ;
                     currentObject.displayAngle = 2*Math.PI- (arc / radius) > 2*Math.PI ? 2*Math.PI : 2*Math.PI- (arc / radius) ;
                    } else {
                      var a = {x:trains[input1].circle.x[3] +background.x,y:trains[input1].circle.y[3] +background.y};
                      var b = {x:trains[input1].circle.x[6] +background.x,y:trains[input1].circle.y[6] +background.y};
                      var c = {x:trains[input1].circle.x[7] +background.x,y:trains[input1].circle.y[7] +background.y};
                      var d = {x:trains[input1].circle.x[0] +background.x,y:trains[input1].circle.y[0] +background.y};
					  var x =  [trains[input1].circle.x[3],trains[input1].circle.x[6],trains[input1].circle.x[7],trains[input1].circle.x[0]];
                      var y =  [trains[input1].circle.y[3],trains[input1].circle.y[6],trains[input1].circle.y[7],trains[input1].circle.y[0]];
					  setNewBezierDisplayAngle(a,b,c,d,0,0.01,x,y);
					}
					
                   }
				  
				function setNewBezierDisplayAngle(a,b,c,d,fac,step,x,y){
					 var disx = getBezierPoints(fac, a.x,b.x,c.x,d.x)-currentObject.x;
                     var disy = getBezierPoints(fac, a.y,b.y,c.y,d.y)-currentObject.y;
                     var realDis = Math.sqrt(Math.pow(disx,2)+Math.pow(disy,2),2);
                     var disx = getBezierPoints(fac+step, a.x,b.x,c.x,d.x)-currentObject.x;
                     var disy = getBezierPoints(fac+step, a.y,b.y,c.y,d.y)-currentObject.y;
					 var newDis = Math.sqrt(Math.pow(disx,2)+Math.pow(disy,2),2);
					 if (newDis < realDis && fac < 1){
                        currentObject.displayAngle = getBezierAngle(fac+step,x,y);
                        setNewBezierDisplayAngle(a,b,c,d,fac+step,step,x,y);
					 }
				}
        
 
    }
    
    if(currentObject.state % 2 == 0){ //Korrektur des angezeigten Winkels
            while(currentObject.displayAngle  < 0) {
              currentObject.displayAngle  += Math.PI*2;
            }

            while (currentObject.displayAngle  > Math.PI*2){
              currentObject.displayAngle -= Math.PI*2;
            }
          if(Math.abs(currentObject.state) == 2){
            if( currentObject.displayAngle < 0 || currentObject.displayAngle > Math.PI){
              if(currentObject.y > background.y+background.height/2){
                currentObject.displayAngle = Math.PI;
              } else {
                currentObject.displayAngle = 0;
              }
            }
          } else {
            if( currentObject.displayAngle < Math.PI || currentObject.displayAngle > 2*Math.PI){
              if(currentObject.y < background.y+background.height/2){
                currentObject.displayAngle = 2*Math.PI;
              } else {
                currentObject.displayAngle = Math.PI;
              }
            }
          }
    }
    
	if(debug) {
	    context.fillRect(background.x+trains[input1].circle.x[0], background.y+trains[input1].circle.y[0], 5, 5);
		context.fillRect(background.x+trains[input1].circle.x[1], background.y+trains[input1].circle.y[1], 5, 5);
	    context.fillRect(background.x+trains[input1].circle.x[2], background.y+trains[input1].circle.y[2], 5, 5);
	    context.fillRect(background.x+trains[input1].circle.x[3], background.y+trains[input1].circle.y[3], 5, 5);
    }
    
    context.save();        
    context.translate(currentObject.x, currentObject.y);
    context.rotate(currentObject.displayAngle);
	if (konamistate < 0) {
	    context.scale(-1,1);
		context.textAlign = "center";
		context.font = measureFontSize(currentObject.icon,"sans-serif",100,currentObject.width, 5, currentObject.width/100, 0);
		context.fillStyle = "white";
		context.scale(1,currentObject.height/getFontSize(context.font,"px"));
		context.fillText(currentObject.icon,0,0); 
	} else {
		context.drawImage(pics[currentObject.src], -currentObject.width/2,-currentObject.height/2, currentObject.width, currentObject.height);
    }
	if(!collisionCourse(input1, true)){
      context.beginPath();
      context.rect(-currentObject.width/2, -currentObject.height/2, currentObject.width, currentObject.height);
      if (context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY) && hardware.mouse.isHold ) {
              hardware.mouse.isHold = false;
              if(trains[input1].move){ 
            		notify(trains[input1].name + " hält an.",  false, 500 ,null,  null, background.y);
            	} else {
            		notify(trains[input1].name + " fährt los.",  false, 500,null, null, background.y);
            	}
            	trains[input1].speedInPercent = 50;
              trains[input1].move = !trains[input1].move
  
      }
      if(debug){context.stroke();  }
    }
    context.restore();
  } 
  
   function calcLinear(linearPoints, isBackwards, isRotated){
    var angleCorr = isRotated? Math.PI:0;
    var calcCorr = 1;
    if((isRotated && !isBackwards) || (!isRotated && isBackwards)){
      calcCorr = -1;
    }
    currentObject.angle = Math.asin((linearPoints.y[1]-linearPoints.y[0])/(linearPoints.x[1]-linearPoints.x[0]));
    var hypotenuse = Math.sqrt(Math.pow((currentObject.x) - linearPoints.x[0],2)+Math.pow((currentObject.y) - linearPoints.y[0],2),2);
    hypotenuse += trains[input1].speed*trains[input1].speedInPercent/100;
    currentObject.x = linearPoints.x[0]+calcCorr * (Math.cos(currentObject.angle)*hypotenuse);
    currentObject.y = linearPoints.y[0]+calcCorr * (Math.sin(currentObject.angle)*hypotenuse);
    currentObject.angle += angleCorr;
  } 
  function calcCircle(circlePoints, isBackwards){ 
    var backwardsCorr = isBackwards ? -1:1;
    var radius = Math.abs(circlePoints.y[0]-circlePoints.y[1])/2;    
    var arc = Math.abs(currentObject.angle)*radius;
    arc += backwardsCorr*trains[input1].speed*trains[input1].speedInPercent/100; 
    currentObject.angle = (arc / radius);
    
    var chord = 2* radius * Math.sin((currentObject.angle)/2);
    var gamma = Math.PI/2-(Math.PI-(currentObject.angle))/2;
    var x = Math.cos(gamma)*chord;
    var y = Math.sin(gamma)*chord;
    currentObject.x = x + circlePoints.x[0];
    currentObject.y = y + circlePoints.y[0];
  }
  function calcBezier(bezierPoints, isBackwards, length){
     var backwardsCorr = isBackwards? -1 :1;
     currentObject.currentCurveFac = currentObject.currentCurveFac+backwardsCorr*((trains[input1].speed*trains[input1].speedInPercent/100)/length);
     var fac =  currentObject.currentCurveFac;  
     currentObject.x = getBezierPoints((fac),bezierPoints.x[0],bezierPoints.x[1],bezierPoints.x[2],bezierPoints.x[3]);
     currentObject.y = getBezierPoints((fac),bezierPoints.y[0],bezierPoints.y[1],bezierPoints.y[2],bezierPoints.y[3]);
     currentObject.angle = getBezierAngle((fac),bezierPoints.x,bezierPoints.y);
     if(debug) {
            context.save(); 
            context.strokeStyle="floralWhite";
            context.beginPath();
            context.moveTo(bezierPoints.x[0], bezierPoints.y[0] );
            context.bezierCurveTo(bezierPoints.x[1], bezierPoints.y[1],bezierPoints.x[2], bezierPoints.y[2],bezierPoints.x[3], bezierPoints.y[3]);
            context.stroke();
            context.closePath();
            context.restore();
     }
  }

  function getBezierPoints(fac, a,b,c,d) {
            return Math.pow((1-fac),3)*a+3*fac*Math.pow((1-fac),2)*b+3*Math.pow((fac),2)*(1-fac)*c+Math.pow(fac,3)*d;

  }
  function getBezierPointsDifferential(fac, a,b,c,d) {
            return 3*Math.pow((1-fac),2)*(b-a)+6*fac*(1-fac)*(c-b)+3*Math.pow(fac,2)*(d-c);

  }
  function getBezierAngle(fac,a,b) { 
            var dxdt = getBezierPointsDifferential(fac, a[0],a[1],a[2],a[3]);
            var dydt = getBezierPointsDifferential(fac, b[0],b[1],b[2],b[3]);
            return Math.atan2(dydt ,dxdt);
  } 
 }       
 
  function animateCars(input1){
		var currentObject = cars[input1];
		var collision = carCollisionCourse(input1,true);
		context.save();        
		context.translate(background.x, background.y);
		context.translate(currentObject.x, currentObject.y);
		context.rotate(currentObject.displayAngle);
		if (konamistate < 0) {
			context.scale(-1,1);
			context.textAlign = "center";
			context.font = measureFontSize(currentObject.icon,"sans-serif",100,currentObject.width, 5, currentObject.width/100, 0);
			context.fillStyle = "white";
			context.scale(1,currentObject.height/getFontSize(context.font,"px"));
			context.fillText(currentObject.icon,0,0); 
		} else {
			context.drawImage(pics[currentObject.src], -currentObject.width/2,-currentObject.height/2, currentObject.width, currentObject.height);
		}
		context.beginPath();
		context.rect(-currentObject.width/2, -currentObject.height/2, currentObject.width, currentObject.height);
		if (!collision && context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY) && hardware.mouse.isHold ) {
			hardware.mouse.isHold = false;
			if(currentObject.move){ 
            		notify(currentObject.name + " hält an.",  false, 500 ,null,  null, background.y);
            } else {
            		notify(currentObject.name + " fährt los.",  false, 500,null, null, background.y);
            }
			currentObject.move = !currentObject.move; 
		}
		context.closePath();
		context.restore(); 
	if(currentObject.move) {
     switch(carPaths[input1][currentObject.state].type){
      case "linear": 
            currentObject.x += currentObject.speed*(Math.PI-currentObject.angle > Math.PI/2 ? 1 : -1)*(currentObject.standardDirection ? 1: -1); 
            if(currentObject.angle < Math.PI/2) {  
              if(currentObject.standardDirection && currentObject.x >= carPaths[input1][currentObject.state].x[1]){
                currentObject.x = carPaths[input1][currentObject.state].x[1];
                currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
              } else if (currentObject.x <= carPaths[input1][currentObject.state].x[0]){
                currentObject.x = carPaths[input1][currentObject.state].x[0];
                currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
              }
            } else {           
              if(currentObject.standardDirection && currentObject.x <= carPaths[input1][currentObject.state].x[1]){
                currentObject.x = carPaths[input1][currentObject.state].x[1];
                currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
              } else if (currentObject.x >= carPaths[input1][currentObject.state].x[0]){
                currentObject.x = carPaths[input1][currentObject.state].x[0];
                currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;          
              }
            }
            currentObject.displayAngle = currentObject.angle;
      break;
      case "linear_vertical":
			currentObject.y += currentObject.speed*(Math.PI-currentObject.angle > Math.PI/4 ? 1 : -1)*(currentObject.standardDirection ? 1: -1); 
            currentObject.displayAngle = currentObject.angle;	  
           if(currentObject.angle < Math.PI) {  
              if(currentObject.standardDirection) {
				if(currentObject.y >= carPaths[input1][currentObject.state].y[1]){
					currentObject.y = carPaths[input1][currentObject.state].y[1];
					currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
				}
				break;
			  }/* else if (!currentObject.standardDirection){
			    if(currentObject.x <= carPaths[input1][currentObject.state].x[0]){
					currentObject.x = carPaths[input1][currentObject.state].x[0];
					currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
				}
			  }*///TODO
            } else {     
              if(currentObject.standardDirection) {
				if(currentObject.y <= carPaths[input1][currentObject.state].y[1]){
					currentObject.y = carPaths[input1][currentObject.state].y[1];
					currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
				}
				break;
			}/*   else if (!currentObject.standardDirection){
				if(currentObject.x >= carPaths[input1][currentObject.state].x[0]){
					currentObject.x = carPaths[input1][currentObject.state].x[0];
					currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;          
				}
			  }*///TODO
			}
	  case "curve_right":
		curve_right(carPaths[input1][currentObject.state]);
	  break;
	  case "curve_left":
		curve_left(carPaths[input1][currentObject.state]);
      break;
	  case "curve_r2l":
		if(currentObject.standardDirection){
			if(carPaths[input1][currentObject.state].y[0] < carPaths[input1][currentObject.state].y[1]) {
				if(currentObject.angle <= Math.PI){
					var dx = (carPaths[input1][currentObject.state].x[1]-carPaths[input1][currentObject.state].x[0])/2;
					var dy = (carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.y[1] = carPaths[input1][currentObject.state].y[0]+2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_right(p);
					if(currentObject.y >= carPaths[input1][currentObject.state].y[0]+(carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2) {
						var diff = currentObject.angle-Math.PI*45/180;
						currentObject.angle = Math.PI*315/180-diff;
						currentObject.x = carPaths[input1][currentObject.state].x[0]-(carPaths[input1][currentObject.state].x[0]-carPaths[input1][currentObject.state].x[1])/2;
						currentObject.y = carPaths[input1][currentObject.state].y[0]+(carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					}
				} else {
					var dx = (carPaths[input1][currentObject.state].x[1]-carPaths[input1][currentObject.state].x[0])/2;
					var dy = (carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.x[0] = carPaths[input1][currentObject.state].x[1];
					p.y[0] = carPaths[input1][currentObject.state].y[1]-2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_left(p);
				}
				break;
			}
		}
		case "curve_l2r":
		if(currentObject.standardDirection){
			if(carPaths[input1][currentObject.state].y[0] < carPaths[input1][currentObject.state].y[1]) {
				if(currentObject.angle >= Math.PI){
					var dx = (carPaths[input1][currentObject.state].x[0]-carPaths[input1][currentObject.state].x[1])/2;
					var dy = (carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.y[1] = carPaths[input1][currentObject.state].y[0]+2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_left(p);
					if(currentObject.y >= carPaths[input1][currentObject.state].y[0]+(carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2) {
						var diff = currentObject.angle-Math.PI*225/180;
						currentObject.angle = Math.PI*135/180-diff;
						currentObject.x = carPaths[input1][currentObject.state].x[0]-(carPaths[input1][currentObject.state].x[0]-carPaths[input1][currentObject.state].x[1])/2;
						currentObject.y = carPaths[input1][currentObject.state].y[0]+(carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					}
				} else {
					var dx = (carPaths[input1][currentObject.state].x[0]-carPaths[input1][currentObject.state].x[1])/2;
					var dy = (carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.x[0] = carPaths[input1][currentObject.state].x[1];
					p.y[0] = carPaths[input1][currentObject.state].y[1]-2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_right(p);
				}
				break;
			} else {
				if(currentObject.angle <= Math.PI){
					var dx = (carPaths[input1][currentObject.state].x[1]-carPaths[input1][currentObject.state].x[0])/2;
					var dy = (carPaths[input1][currentObject.state].y[0]-carPaths[input1][currentObject.state].y[1])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.y[1] = carPaths[input1][currentObject.state].y[0]-2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_left(p);
					if(currentObject.y <= carPaths[input1][currentObject.state].y[0]-(carPaths[input1][currentObject.state].y[0]-carPaths[input1][currentObject.state].y[1])/2) {
						var diff = currentObject.angle-Math.PI*45/180;
						currentObject.angle = Math.PI*315/180-diff;
						currentObject.x = carPaths[input1][currentObject.state].x[0]+(carPaths[input1][currentObject.state].x[1]-carPaths[input1][currentObject.state].x[0])/2;
						currentObject.y = carPaths[input1][currentObject.state].y[0]-(carPaths[input1][currentObject.state].y[0]-carPaths[input1][currentObject.state].y[1])/2;
					}
				} else {
					var dx = (carPaths[input1][currentObject.state].x[1]-carPaths[input1][currentObject.state].x[0])/2;
					var dy = (carPaths[input1][currentObject.state].y[0]-carPaths[input1][currentObject.state].y[1])/2;
					var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
					p.x[0] = carPaths[input1][currentObject.state].x[1];
					p.y[0] = carPaths[input1][currentObject.state].y[1]+2*((Math.pow(dy,2)+Math.pow(dx,2))/(2*dy));
					curve_right(p);
				}
				break;
			}
		}
	  case "curve_hright":
		 var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
		 curve_right(p);
		 if(currentObject.standardDirection == 1 && p.y[1] > p.y[0]) {  
          if(currentObject.angle >= Math.PI/2){
            currentObject.x = p.x[1]+(p.y[1]-p.y[0])/2
            currentObject.y = p.y[1]-(p.y[1]-p.y[0])/2; 
            currentObject.angle = currentObject.displayAngle = Math.PI/2; 
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }  
		  		  break;
         } else if (currentObject.standardDirection == 1 && p.y[1] < p.y[0]) {  
          if( currentObject.angle >= 1.5*Math.PI){
            currentObject.x = p.x[1]-(p.y[0]-p.y[1])/2;
            currentObject.y = p.y[1]+(p.y[0]-p.y[1])/2;
            currentObject.angle = currentObject.displayAngle = 1.5*Math.PI;   
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
		  }
		  break;
         } /* else if(currentObject.standardDirection == 0 && p.y[1] > p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0]; 
            currentObject.angle = 0; 
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 0 && p.y[1] < p.y[0]) {  
          if(arc >= Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0];
            currentObject.angle = Math.PI;             
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }
         }*///TODO
		case "curve_hleft":
		 var p = JSON.parse(JSON.stringify(carPaths[input1][currentObject.state]));
		 curve_left(p);
		/* if(currentObject.standardDirection == 1 && p.y[1] > p.y[0]) {  
          if(currentObject.angle >= Math.PI/2){
            currentObject.x = p.x[1]+(p.y[1]-p.y[0])/2
            currentObject.y = p.y[1]-(p.y[1]-p.y[0])/2; 
            currentObject.angle = Math.PI/2; 
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }  
		  		  break;
         } else */if (currentObject.standardDirection == 1 && p.y[1] < p.y[0]) {  
          if(currentObject.angle >= 0.5*Math.PI){
            currentObject.x = p.x[1]+(p.y[0]-p.y[1])/2;
            currentObject.y = p.y[1]+(p.y[0]-p.y[1])/2;
            currentObject.angle = currentObject.displayAngle = 1.5*Math.PI;   
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
		  }
		  break;
         } /* else if(currentObject.standardDirection == 0 && p.y[1] > p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0]; 
            currentObject.angle = 0; 
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 0 && p.y[1] < p.y[0]) {  
          if(arc >= Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0];
            currentObject.angle = Math.PI;             
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }
         }*///TODO
	 case "curve_hright2":
		if(currentObject.standardDirection){
		 if(carPaths[input1][currentObject.state].y[0]<carPaths[input1][currentObject.state].y[1]){
			if(currentObject.angle == 90/180*Math.PI){
				var x0 = currentObject.x-(carPaths[input1][currentObject.state].y[1]-carPaths[input1][currentObject.state].y[0])/2;
				carPaths[input1][currentObject.state].x =[x0,x0];
				carPaths[input1][currentObject.state+1 >= carPaths[input1].length ? 0 : currentObject.state+1].x[0]=x0;
			} 
			curve_right(carPaths[input1][currentObject.state]);
		 	break;
		 }
		}
	  case "curve_hleft2":
		if(currentObject.standardDirection){
		 if(carPaths[input1][currentObject.state].y[0]>carPaths[input1][currentObject.state].y[1]){
			if(currentObject.angle == 270/180*Math.PI ){
				var x0 = currentObject.x-(carPaths[input1][currentObject.state].y[0]-carPaths[input1][currentObject.state].y[1])/2;
				carPaths[input1][currentObject.state].x =[x0,x0];
				currentObject.angle = 90/180*Math.PI; 
				carPaths[input1][currentObject.state+1 >= carPaths[input1].length ? 0 : currentObject.state+1].x[0]=x0;
			} 
			curve_left(carPaths[input1][currentObject.state]);
		 	break;
		 }
		}
	 default:
		if(currentObject.standardDirection) {
			currentObject.x = carPaths[input1][currentObject.state].x[1];
            currentObject.y = carPaths[input1][currentObject.state].y[1];
			currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
			
		} else {
			currentObject.x = carPaths[input1][currentObject.state].x[0];
            currentObject.y = carPaths[input1][currentObject.state].y[0];
			currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
		}
	  break;
	  function curve_right(p){
		if(p.x[0]!=p.x[1]){
			p.x[1]=p.x[0];
		}
		var radius = Math.abs(p.y[0]-p.y[1])/2;
        var arc = Math.abs(currentObject.angle)*radius;
        arc += currentObject.speed; 
        currentObject.angle = (arc / radius);
         var chord = 2* radius * Math.sin((currentObject.angle)/2);
         var gamma = Math.PI/2-(Math.PI-(currentObject.angle))/2;
         var x = Math.cos(gamma)*chord;
         var y = Math.sin(gamma)*chord;
         currentObject.x = ( currentObject.standardDirection == 1 ) ? ( p.y[1] < p.y[0] ) ? x + p.x[1] : x + p.x[0] : ( p.y[1] < p.y[0] ) ? p.x[1] - x : p.x[0] - x;
         currentObject.y = ( currentObject.standardDirection == 1 ) ? ( p.y[1] < p.y[0] ) ? y + p.y[1] : y + p.y[0] : ( p.y[1] < p.y[0] ) ? p.y[1] + y : p.y[0] + y;
        if(currentObject.standardDirection == 1 && p.y[1] > p.y[0]) {  
          if(arc >= Math.PI*radius){
            currentObject.x = p.x[1];
            currentObject.y = p.y[1]; 
            currentObject.angle = Math.PI; 
			currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 1 && p.y[1] < p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[1];
            currentObject.y = p.y[1];
            currentObject.angle = 0;             
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }
         } else if(currentObject.standardDirection == 0 && p.y[1] > p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0]; 
            currentObject.angle = 0; 
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 0 && p.y[1] < p.y[0]) {  
          if(arc >= Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0];
            currentObject.angle = Math.PI;             
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }
         }
         if(currentObject.standardDirection) {
             currentObject.displayAngle = currentObject.angle;
         } else {
             currentObject.displayAngle = -currentObject.angle;
         }  
	  }
	  function curve_left(p){
		if(p.x[0]!=p.x[1]){
			p.x[1]=p.x[0];
		}
		var radius = Math.abs(p.y[0]-p.y[1])/2;    
        var arc = Math.abs(currentObject.angle)*radius;
        arc += currentObject.speed; 
        currentObject.angle = (arc / radius);
         var chord = 2* radius * Math.sin((currentObject.angle)/2);
         var gamma = Math.PI/2-(Math.PI-(currentObject.angle))/2;
         var x = Math.cos(gamma)*chord;
         var y = Math.sin(gamma)*chord;
         currentObject.x = ( currentObject.standardDirection == 1 ) ? ( p.y[1] < p.y[0] ) ? p.x[0] + x : p.x[1] + x : ( p.y[1] < p.y[0] ) ? p.x[0] - x : p.x[1] - x;
         currentObject.y = ( currentObject.standardDirection == 1 ) ? ( p.y[1] < p.y[0] ) ? p.y[0] - y : p.y[1] - y : ( p.y[1] < p.y[0] ) ? p.y[0] - y : p.y[1] - y;        
         if(currentObject.standardDirection == 1 && p.y[1] > p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[1];
            currentObject.y = p.y[1]; 
            currentObject.angle = 0; 
            currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 1 && p.y[1] < p.y[0]) {  
          if(arc >= Math.PI*radius){
			currentObject.x = p.x[1];
            currentObject.y = p.y[1];
            currentObject.angle = Math.PI;
			currentObject.state = ++currentObject.state >= carPaths[input1].length ? 0 : currentObject.state;
          }
         } else if(currentObject.standardDirection == 0 && p.y[1] > p.y[0]) {  
          if(arc >= Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0]; 
            currentObject.angle = Math.PI; 
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }  
         } else if (currentObject.standardDirection == 0 && p.y[1] < p.y[0]) {  
          if(arc >= 2*Math.PI*radius){
            currentObject.x = p.x[0];
            currentObject.y = p.y[0];
            currentObject.angle = 0;             
            currentObject.state = --currentObject.state < 0 ? carPaths[input1].length-1 : currentObject.state;
          }
         }
         if(currentObject.standardDirection) {
             currentObject.displayAngle = -currentObject.angle;
         } else {
             currentObject.displayAngle = currentObject.angle;
         }
	  
         if(currentObject.standardDirection) {
             currentObject.displayAngle = -currentObject.angle;
         } else {
             currentObject.displayAngle = currentObject.angle;
         }
	  }
	 }
	 cars[input1] = currentObject;	 
	}
 }
  
  function animateTaxOffice() {
	 context.save();
	 context.translate(background.x,background.y);
	 context.translate(background.width/7.4-background.width*0.07, background.height/3.1-background.height*0.06);
	 
	 var taxOfficeNo = 45;
	 
	for (var i = 0; i < taxOfficeNo; i++) {
		if(taxOffice.isset[i] != true || (frameNo % 6 == 0 && Math.random() > 0.6)) {
			taxOffice.isset[i] = true;
			if ( Math.random() > 0.05) {
			taxOffice.fire.color[i] = "rgba(200,0,0," + (0.4 * Math.random()) + ")";
			} else {
			taxOffice.fire.color[i] = "rgba(255, 160,0" + (0.2 * Math.random()) + ")";			
			}
			taxOffice.fire.x[i] = Math.random()*background.width*0.07;
			taxOffice.fire.y[i] = Math.random()*background.height*0.06;
			taxOffice.fire.size[i] = Math.random()* background.width / 1200;
			taxOffice.smoke.color[i] = "rgba(130,120,130," + (Math.random()/3) + ")";
			taxOffice.smoke.x[i] = Math.random()*background.width*0.07;
			taxOffice.smoke.y[i] = Math.random()*background.height*0.06;
			taxOffice.smoke.size[i] = Math.random()* background.width / 50;
		}
		context.fillStyle = taxOffice.fire.color[i];
		
		context.save();
		context.translate(taxOffice.fire.x[i], taxOffice.fire.y[i]);
		context.beginPath();
		context.arc(0,0, taxOffice.fire.size[i], 0, 2*Math.PI);
		context.closePath();
		context.fill();
		context.restore();
		context.save();
		context.fillStyle = taxOffice.smoke.color[i];
		context.translate(taxOffice.smoke.x[i], taxOffice.smoke.y[i]);
		context.beginPath();
		context.arc(0,0, taxOffice.smoke.size[i], 0, 2*Math.PI);
		context.closePath();
		context.fill();
		context.restore();
	  }

		context.save();
	  if((frameNo) % 13 < 4) {
		context.fillStyle = "rgba(0, 0,255,1)";
	  } else if ((frameNo) % 13 < 6 || (frameNo) % 13 > 10) {
		context.fillStyle = "rgba(0, 0,255,0.5)";		  
	  } else {
		context.fillStyle = "rgba(0, 0,255,0.2)";		  
	  }
	  context.translate(-background.width*0.0105,background.height*0.177);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();
	  context.translate(-background.width*0.0026,background.height*0.0047);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();
	  context.restore();
	  context.save();
	  if((frameNo + 3) % 13 < 4) {
		context.fillStyle = "rgba(0, 0,255,1)";
	  } else if ((frameNo + 3) % 13 < 6 || (frameNo + 3) % 13 > 10) {
		context.fillStyle = "rgba(0, 0,255,0.5)";		  
	  } else {
		context.fillStyle = "rgba(0, 0,255,0.2)";		  
	  }
	  context.translate(background.width*0.0275,background.height*0.1472);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();	
	  context.translate(-background.width*0.00275,background.height*0.0092);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();	
	  context.restore();
	  context.save();
	  if((frameNo + 5) % 13 < 4) {
		context.fillStyle = "rgba(0, 0,255,1)";
	  } else if ((frameNo + 5) % 13 < 6 || (frameNo + 5) % 13 > 10) {
		context.fillStyle = "rgba(0, 0,255,0.5)";		  
	  } else {
		context.fillStyle = "rgba(0, 0,255,0.2)";		  
	  }
	  context.translate(background.width*0.056,background.height*0.18);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();
	  context.translate(background.width*0.0005,background.height*0.015);
	  context.beginPath();
	  context.arc(0,0, background.width / 1000, 0, 2*Math.PI);
	  context.closePath();
	  context.fill();
	  context.restore();
	  
	  context.restore();

  }
 
 function animateTrafo (){
  var textStart = "fährt los";
  var textEnd = "hält an";
	var step = Math.PI/30;
	if(trains[selectedTrain].move){
			if(classicUI.transformer.input.angle < trains[selectedTrain].speedInPercent/100 * classicUI.transformer.input.maxAngle){
				classicUI.transformer.input.angle += step;
				if(classicUI.transformer.input.angle >= trains[selectedTrain].speedInPercent/100 * classicUI.transformer.input.maxAngle){
					classicUI.transformer.input.angle = trains[selectedTrain].speedInPercent/100 * classicUI.transformer.input.maxAngle;
				}
			} else {
        classicUI.transformer.input.angle -= step;
				if(classicUI.transformer.input.angle <= trains[selectedTrain].speedInPercent/100 * classicUI.transformer.input.maxAngle){
				  classicUI.transformer.input.angle = trains[selectedTrain].speedInPercent/100 * classicUI.transformer.input.maxAngle;
				}
      }
	} else {
				if(classicUI.transformer.input.angle > 0){
					classicUI.transformer.input.angle -= step;
					if(classicUI.transformer.input.angle < 0){
						classicUI.transformer.input.angle = 0;
					}
				}
	}	
  context.save();
  context.drawImage(pics[classicUI.trainSwitch.src], classicUI.trainSwitch.x, classicUI.trainSwitch.y, classicUI.trainSwitch.width, classicUI.trainSwitch.height);
  context.beginPath();
  context.rect(classicUI.trainSwitch.x, classicUI.trainSwitch.y, classicUI.trainSwitch.width, classicUI.trainSwitch.height);
  if (context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY)) {
    hardware.mouse.cursor = "pointer";
	if(typeof movingTimeOut !== "undefined"){
		clearTimeout(movingTimeOut);
	}
    if(hardware.mouse.isHold){
        selectedTrain++;
		if(selectedTrain >= trains.length)
			selectedTrain=0;
		hardware.mouse.isHold = false;//
		if (!settings.alwaysShowSelectedTrain)
				notify (trains[selectedTrain].name + " ausgewählt.", true, 1250,null, null, background.y);
      }
    
  }
 	if(settings.alwaysShowSelectedTrain){
		var fontSize = getFontSize(classicUI.trainSwitch.selectedTrainDisplay.font, "px");
		context.font = classicUI.trainSwitch.selectedTrainDisplay.font;
		context.fillStyle="#000";		
		context.strokeStyle="#eee";		
 		context.fillRect(classicUI.trainSwitch.x+classicUI.trainSwitch.width,classicUI.trainSwitch.y+classicUI.trainSwitch.height/2, classicUI.trainSwitch.selectedTrainDisplay.width, classicUI.trainSwitch.selectedTrainDisplay.height);
 		context.strokeRect(classicUI.trainSwitch.x+classicUI.trainSwitch.width,classicUI.trainSwitch.y+classicUI.trainSwitch.height/2, classicUI.trainSwitch.selectedTrainDisplay.width, classicUI.trainSwitch.selectedTrainDisplay.height);
		context.fillStyle="#eee";	
		context.translate(classicUI.trainSwitch.x+classicUI.trainSwitch.width+classicUI.trainSwitch.selectedTrainDisplay.width/2,0);	
 		context.fillText(trains[selectedTrain].name, -context.measureText(trains[selectedTrain].name).width/2,classicUI.trainSwitch.y+1.3*classicUI.trainSwitch.height/2);
 	}
	
    context.restore();
	context.save();
	context.translate(classicUI.transformer.x+classicUI.transformer.width/2, classicUI.transformer.y+classicUI.transformer.height/2);
	context.rotate(classicUI.transformer.angle);
	if(trains[selectedTrain].move){
		context.drawImage(pics[classicUI.transformer.src], -classicUI.transformer.width/2, -classicUI.transformer.height/2 , classicUI.transformer.width, classicUI.transformer.height);
	} else {
		context.drawImage(pics[classicUI.transformer.asrc], -classicUI.transformer.width/2, -classicUI.transformer.height/2 , classicUI.transformer.width, classicUI.transformer.height);
	}
  if(!client.isSmall){
  context.save();
	context.translate( classicUI.transformer.directionInput.diffX, classicUI.transformer.directionInput.diffY);
	context.drawImage(pics[classicUI.transformer.directionInput.src], -classicUI.transformer.directionInput.width/2, -classicUI.transformer.directionInput.height/2, classicUI.transformer.directionInput.width, classicUI.transformer.directionInput.height);
  context.beginPath();
  context.rect(-classicUI.transformer.directionInput.width/2, -classicUI.transformer.directionInput.height/2, classicUI.transformer.directionInput.width, classicUI.transformer.directionInput.height);
  if (context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY) && !trains[selectedTrain].move) {
         if(hardware.mouse.isHold){
          hardware.mouse.isHold = false;//
          trains[selectedTrain].standardDirection = !trains[selectedTrain].standardDirection;
          notify(trains[selectedTrain].name + ": Richtung gewechselt.", false, 750,null,null, background.y);
         }  
         hardware.mouse.cursor = "pointer";
		 if(typeof movingTimeOut !== "undefined"){
			clearTimeout(movingTimeOut);
		 }
  }
    context.restore();  
  }
	context.save();
	context.translate(0, -classicUI.transformer.input.diffY);
	context.rotate(classicUI.transformer.input.angle);
	context.drawImage(pics[classicUI.transformer.input.src], -classicUI.transformer.input.width/2, -classicUI.transformer.input.height/2, classicUI.transformer.input.width, classicUI.transformer.input.height);
  if(debug){
   context.fillRect(-classicUI.transformer.input.width/2, classicUI.transformer.input.height/2,6,6);
   context.fillRect(-3,-3,6,6);
  }
   context.beginPath();
	 context.rect(-classicUI.transformer.input.width/2, -classicUI.transformer.input.height/2, classicUI.transformer.input.width, classicUI.transformer.input.height);
  if (context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY)) {
    context.restore();
	  context.restore();
    var x=classicUI.transformer.x+classicUI.transformer.width/2+ classicUI.transformer.input.diffY*Math.sin(classicUI.transformer.angle);
    var y=classicUI.transformer.y+classicUI.transformer.height/2- classicUI.transformer.input.diffY*Math.cos(classicUI.transformer.angle);
    
       hardware.mouse.cursor = "pointer";
	   if(typeof movingTimeOut !== "undefined"){
			clearTimeout(movingTimeOut);
	   }
   if(!collisionCourse(selectedTrain, true)){
     if(client.isSmall){  
      if(hardware.mouse.isHold){
       trains[selectedTrain].move =  ! trains[selectedTrain].move;
            trains[selectedTrain].speedInPercent = trains[selectedTrain].move?50:0;  
            hardware.mouse.isHold = false;//
        if(!trains[selectedTrain].move){
					notify (trains[selectedTrain].name + " " + textEnd + ".",false, 500,null, null, background.y);
				} else {
					notify  (trains[selectedTrain].name + " " + textStart + ".",false, 500,null, null, background.y);
			  } 
      }
     } else if(!(hardware.mouse.moveY>y&& hardware.mouse.moveX < x ) ) {
      var angle;
      if (hardware.mouse.moveY>y){
        angle = Math.PI + Math.abs(Math.atan(((hardware.mouse.moveY-y)/(hardware.mouse.moveX-x))));
      } else if (hardware.mouse.moveY<y && hardware.mouse.moveX > x){
        angle = Math.PI - Math.abs(Math.atan(((hardware.mouse.moveY-y)/(hardware.mouse.moveX-x))));  
      } else {
        angle = Math.abs(Math.atan(((hardware.mouse.moveY-y)/(hardware.mouse.moveX-x))));
      }  
      if(hardware.mouse.isHold){
        classicUI.transformer.input.angle = angle >= 0 ? angle <= classicUI.transformer.input.maxAngle ? angle : classicUI.transformer.input.maxAngle :0;
        trains[selectedTrain].speedInPercent =classicUI.transformer.input.angle/classicUI.transformer.input.maxAngle*100;
        var wasmoving = trains[selectedTrain].move;
        trains[selectedTrain].move = trains[selectedTrain].speedInPercent > 10 ? true : false;
        if(wasmoving != trains[selectedTrain].move){ 
          if(!trains[selectedTrain].move){
					  notify (trains[selectedTrain].name + " " + textEnd + ".",false, 500,null, null, background.y);
				  } else {
					  notify (trains[selectedTrain].name + " " + textStart + ".",false, 500,null, null, background.y);
			    } 
        }
      }
     } else {
        hardware.mouse.isHold = false;//
     }
   } else {
      classicUI.transformer.input.angle = 0;
      trains[selectedTrain].speedInPercent = 0;
      trains[selectedTrain].move =  false;
      hardware.mouse.isHold = false;//
   }
 
  } else {
  context.restore();
	context.restore();
  }
  classicUI.switches.display = (settings.classicUI && settings.showSwitches && !client.isSmall) ? true: false;
  if(hardware.mouse.isHold && classicUI.switches.display){
	  Object.keys(switches).forEach(function(key) {
			var switchOpts = ["left","right"];
			for(var i = 0; i < switchOpts.length; i++) {
				context.save();
				context.beginPath();
				context.arc(background.x+switches[key][switchOpts[i]].x, background.y+switches[key][switchOpts[i]].y, background.width/50, 0, 2*Math.PI);
				if (context.isPointInPath(hardware.mouse.moveX, hardware.mouse.moveY)) {
					switches[key][switchOpts[i]].turned = !switches[key][switchOpts[i]].turned;
					hardware.mouse.isHold = false;
					context.closePath();
					context.fillStyle = switches[key][switchOpts[i]].turned ? "lightgreen" : "red";
					context.fill();
					notify ("Weiche gestellt.",false, 500,null, null, background.y);
				} else {
					context.closePath();
					context.strokeStyle = switches[key][switchOpts[i]].turned ? "lightgreen" : "red";
					context.stroke();
				}
				context.restore(); 

			}
	  });
  }
  if(debug){
    context.save();
    var x = classicUI.transformer.x+classicUI.transformer.width/2+ classicUI.transformer.input.diffY*Math.sin(classicUI.transformer.angle);
    var y = classicUI.transformer.y+classicUI.transformer.height/2- classicUI.transformer.input.diffY*Math.cos( classicUI.transformer.angle);
    context.fillStyle = "red";
    context.fillRect(x-2,y-2,4,4);
    var a = -(classicUI.transformer.input.diffY-classicUI.transformer.input.height/2); var b = classicUI.transformer.width/2-(classicUI.transformer.width/2-classicUI.transformer.input.width/2);
    var c = classicUI.transformer.input.diffY+classicUI.transformer.input.height/2; var d = b;
    var x1 = classicUI.transformer.x+classicUI.transformer.width/2; var y1 =classicUI.transformer.y+classicUI.transformer.height/2;
    var x =[x1+c*Math.sin(classicUI.transformer.angle)-d*Math.cos(classicUI.transformer.angle),x1+c*Math.sin(classicUI.transformer.angle), x1+c*Math.sin(classicUI.transformer.angle)+d*Math.cos(classicUI.transformer.angle), x1 -(a+b)*Math.cos(classicUI.transformer.angle),x1-a*Math.cos(classicUI.transformer.angle),x1 -(a-b)*Math.cos(classicUI.transformer.angle)];
    var y =[y1-c*Math.cos(classicUI.transformer.angle)-d*Math.sin(classicUI.transformer.angle),y1-c*Math.cos(classicUI.transformer.angle),y1-c*Math.cos(classicUI.transformer.angle)+d*Math.sin(classicUI.transformer.angle), y1+(a-b)*Math.sin(classicUI.transformer.angle),y1+a*Math.sin(classicUI.transformer.angle),y1+(a+b)*Math.sin(classicUI.transformer.angle)];
    context.fillRect(x[0],y[0],4,4);
    context.fillRect(x[1],y[1],4,4);
    context.fillRect(x[2],y[2],4,4);
    context.fillRect(x[3],y[3],4,4);
    context.fillRect(x[4],y[4],4,4);
    context.fillRect(x[5],y[5],4,4);
    context.fillStyle = "black";
    var x=x1+ classicUI.transformer.input.diffY*Math.sin(classicUI.transformer.angle);
    var y=y1- classicUI.transformer.input.diffY*Math.cos(classicUI.transformer.angle);
    context.beginPath();
    context.arc(x,y,classicUI.transformer.input.width/2,Math.PI,Math.PI+classicUI.transformer.input.maxAngle,false);
    context.stroke();
    context.restore();
  }
  
 } 
 
 
function collisionCourse(input1, input2){
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		var collision = false;
		var currentObject; var fac;
		if(trains[input1].standardDirection){
		  fac = 1;
		  currentObject = trains[input1];
		} else {
			fac = -1;
			if(trains[input1].cars.length > 0) {
		       currentObject = trains[input1].cars[trains[input1].cars.length-1];
			} else {
		       currentObject = trains[input1];
			}
		}                                    
		var x1 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2+Math.cos(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var x2 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2-Math.cos(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var x3 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2;
		var y1 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2-Math.sin(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var y2 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2+Math.sin(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var y3 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2;
		if(debug) {
		  context.fillRect(x1,y1,5,5);
		  context.fillRect(x2,y2,5,5);
		  context.fillRect(x3,y3,5,5);
		}
		for(var i = 0; i < trains.length; i++){
			if(input1 != i && (trains[input1].circleFamily == null || trains[i].circleFamily == null || trains[input1].circleFamily == trains[i].circleFamily)){
				for(var j = -1; j < trains[i].cars.length; j++){
					var currentObject = j >= 0 ? trains[i].cars[j] : trains[i];
					context.save();
					context.translate(currentObject.x, currentObject.y); 
					context.rotate(currentObject.displayAngle);
					context.beginPath();
					context.rect(-currentObject.width/2, -currentObject.height/2, currentObject.width, currentObject.height);
					if (context.isPointInPath(x1, y1) || context.isPointInPath(x2, y2) || context.isPointInPath(x3, y3)){
						if(input2 && trains[input1].move){
							notify("Crash zwischen " + trains[input1].name + " und " + trains[i].name+".", true, 2000,null,null, background.y);
						}
						collision = true;
						trains[input1].move = false;

					}
					if(debug) {
						context.fillStyle = "blue";
						context.fill();
					}
					context.restore();
			  }
			}
		}
		context.restore();
		return(collision);
 } 
 
 function carCollisionCourse(input1, input2){
	context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    var collision = false;
	var currentObject;
	var fac;
    if(cars[input1].standardDirection){
		  fac = 1;
		} else {
      fac = -1;
		}                                    
      currentObject = cars[input1];
		var x1 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2+Math.cos(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var x2 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2-Math.cos(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var x3 = currentObject.x+fac*Math.sin(Math.PI/2-currentObject.displayAngle)*currentObject.width/2;
		var y1 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2-Math.sin(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var y2 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2+Math.sin(-Math.PI/2-currentObject.displayAngle)*currentObject.height/2;
		var y3 = currentObject.y+fac*Math.cos(Math.PI/2-currentObject.displayAngle)*currentObject.width/2;
		if(debug) {
		  context.fillRect(background.x+x1,background.y+y1,5,5);
		  context.fillRect(background.x+x2,background.y+y2,5,5);
		  context.fillRect(background.x+x3,background.y+y3,5,5);
		}
		for(var i = 0; i < cars.length; i++){
			if(input1 != i){
				currentObject = cars[i];
				context.save();
			    context.translate(currentObject.x, currentObject.y); 
			    context.rotate(currentObject.displayAngle);
			    context.beginPath();
			    context.rect(-currentObject.width/2, -currentObject.height/2, currentObject.width, currentObject.height);
				if (context.isPointInPath(x1, y1) || context.isPointInPath(x2, y2) || context.isPointInPath(x3, y3)){
					if(input2 && cars[input1].move){
						notify("Crash zwischen " + cars[input1].name + " und " + cars[i].name+".", true, 2000,null,null, background.y);
					}
					collision = true;
					cars[input1].move = false;
				}
			    context.restore();
			}
		
	
	  }
    context.restore();
	return(collision);
 }


 
}

function measureFontSize(t,f,a,b,c, d, r){
		context.save();
		var font = (a) + "px " + f;
		context.font = font;
		var twidth = context.measureText(t).width;
		context.restore();
		if(twidth != b && (Math.abs(twidth-b) > d && r < 100)){
			a *= (twidth > b) ? (1-c/100) : (1+c/100);
			return measureFontSize(t,f,a,b,c,d, ++r);
		} else {
			return font;
		}
}
function getFontSize(f, a){
		return parseInt(f.substr(0,f.length-(f.length-f.indexOf(a))), 10);
}

/******************************************
             mouse touch functions
******************************************/

function onMouseMove(event) {
	hardware.mouse.moveX = event.pageX;
	hardware.mouse.moveY = event.pageY;
	hardware.mouse.cursor = "default";   
	hardware.mouse.isMoving = true;
	if(typeof movingTimeOut !== "undefined"){
		clearTimeout(movingTimeOut);
	}
	movingTimeOut = setTimeout(function(){hardware.mouse.isMoving = false;}, 5000);
}
function onMouseDown(event) {
  
    hardware.mouse.moveX =  hardware.mouse.downX = event.pageX;
	hardware.mouse.moveY = hardware.mouse.downY = event.pageY; 
  	hardware.mouse.isHold = true;	
}
 function onMouseUp(event) {
	hardware.mouse.upX = event.pageX;
	hardware.mouse.upY = event.pageY;
  	hardware.mouse.isHold = false;	
}
function onMouseOut(event) {
  	hardware.mouse.isHold = false; 
	hardware.mouse.cursor = "none";

}


function getTouchMove(event) {              

	hardware.mouse.moveX = event.changedTouches[0].clientX;
	hardware.mouse.moveY = event.changedTouches[0].clientY;
	hardware.mouse.isMoving = true;
	if(typeof movingTimeOut !== "undefined"){
		clearTimeout(movingTimeOut);
	}
	movingTimeOut = setTimeout(function(){hardware.mouse.isMoving = false;}, 5000);
	

}
function getTouchStart(event) {
	hardware.mouse.moveX = hardware.mouse.downX = event.changedTouches[0].clientX;
	hardware.mouse.moveY = hardware.mouse.downY = event.changedTouches[0].clientY; 
	hardware.mouse.isHold = true; 
}

function getTouchEnd(event) {           

	hardware.mouse.upX = event.changedTouches[0].clientX;
	hardware.mouse.upY = event.changedTouches[0].clientY;
	hardware.mouse.isHold = false; 

}
function getTouchLeave(event) {
  	hardware.mouse.isHold = false; 
}

function onKeyDown(event) {

  if ((event.key == "ArrowUp" && (konamistate == 0 || konamistate == 1)) || (event.key == "ArrowDown" && (konamistate == 2 || konamistate == 3)) || (event.key == "ArrowLeft" && (konamistate == 4 || konamistate == 6)) || (event.key == "ArrowRight" && (konamistate == 5 || konamistate == 7)) || (event.key == "b" && konamistate == 8)){ 
	if(typeof konamiTimeOut !== "undefined"){
		clearTimeout(konamiTimeOut);
	}
	konamistate +=1;
	konamiTimeOut = setTimeout(function(){konamistate = 0;}, 1000);
  } else if (event.key == "a" && konamistate == 9){
    if(typeof konamiTimeOut !== "undefined"){
		clearTimeout(konamiTimeOut);
	}
	konamistate = -1;
  } else {
	if(typeof konamiTimeOut !== "undefined"){
		clearTimeout(konamiTimeOut);
	}
    konamistate = (konamistate < 0 && konamistate > -2) ? --konamistate : 0;
  }

}