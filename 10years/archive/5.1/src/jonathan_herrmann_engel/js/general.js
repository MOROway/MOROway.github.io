//GLOBAL CONSTANTS
const LINK_STATE_NORMAL = 0;
const LINK_STATE_INTERNAL_HTML = 1;
const LINK_STATE_INTERNAL_LICENSE_FILE = 2

//NOTIFICATIONS
function notify(a, b, c, d, e, f){
   var notificationContainer = document.querySelector('#canvas-notifier');     
   var obj = {message: a, timeout: c};
   if(d!= null && e!= null){
   	obj.actionHandler = d;
    obj.actionText = e;
   }
   if(b || (f >= notificationContainer.offsetHeight && settings.showNotifications)){
    		notificationContainer.MaterialSnackbar.showSnackbar(obj);
   } else {
    		console.log(a);
   }
}

//LOCAL APP DATA COPY
function getLocalAppDataCopy (){
	
	var localAppDataCopy = {};
	
	if(typeof(Storage) != "undefined") {
    
		try{
			localAppDataCopy = JSON.parse(window.localStorage.getItem("morowayAppData") || "{}");
		} catch(e) {
			localAppDataCopy = {};
		}
      
	}

	return Object.keys(localAppDataCopy).length === 0 ? null : localAppDataCopy;
	
}

function setLocalAppDataCopy(){
 	
	window.localStorage.setItem("morowayAppData", JSON.stringify(APP_DATA));

}

//SETTINGS  
function getSettings (){
	
	var settings = {};
	
	if(typeof(Storage) != "undefined") {
    
		try{
			settings = JSON.parse(window.localStorage.getItem("morowayApp") || "{}");
		} catch(e) {
			settings = {};
		}
      
	}
	
  	if (typeof settings.showNotifications != "boolean") 
      settings.showNotifications = true;
  
  	if (typeof settings.classicUI != "boolean") 
      settings.classicUI = true;
  
	if (typeof settings.alwaysShowSelectedTrain != "boolean") 
      settings.alwaysShowSelectedTrain = true;
  
	if (typeof settings.showSwitches != "boolean") 
      settings.showSwitches = false;
  
	if (typeof settings.cursorascircle != "boolean") 
      settings.cursorascircle = true;
  
    if (typeof settings.burnTheTaxOffice != "boolean") 
      settings.burnTheTaxOffice = false;
  
	return settings;
	
}

function setSettings(){
 	
	window.localStorage.setItem("morowayApp", JSON.stringify(settings));

}

//WINDOW
function measureViewspace(a) {

    var b = [{hasTouch: ("ontouchstart" in document.documentElement)?true: false},{isSmallDevice: (window.innerWidth <= 750 || (window.innerWidth <= 1080 && window.innerHeight > window.innerWidth))?true:false }];
    return a == -1? b:a<b.length ? b[a]: false;

} 
