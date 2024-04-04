//This file has different content for different platforms. This version represents the web version on our server

function followLink(input1,input2, input3){
	 if(input3 == LINK_STATE_INTERNAL_HTML && !(input1.endsWith("/")) && input1.indexOf("#") == -1)
		 input1 = input1 + "/";
	 window.open(input1, input2);
}

function placeOptions(state){
      var menu = {container: document.querySelector("#canvas-options"),containerMargin:0,help:document.querySelector("#canvas-help"), settings:document.querySelector("#canvas-settings")};
      if(state == "load") {
		menu.help.addEventListener("click", function(){followLink("help", "_blank", LINK_STATE_INTERNAL_HTML);}, false);
		menu.settings.addEventListener("click", function(){
			  var id = "settingsimport";
			  if(window.innerWidth > 500 + parseInt(window.getComputedStyle(document.querySelector("#" + id)).getPropertyValue("width"), 10)){
				menu.container.style.display = "none";
				openIframe(id);
				var elems = document.querySelector("iframe#" + id).contentWindow.document.querySelectorAll(".internal-link");
				for(var i = 0; i < elems.length; i++) {
					elems[i].style.display = "none";
				}
				document.querySelector("iframe#" + id).contentWindow.followLink = function(input1,input2, input3){
						window.open(input1, "_blank");
				}
				if(menu.help.style.display == "none"){
					var openHelpNode = document.querySelector("iframe#" + id).contentWindow.document.createElement("BUTTON");
					openHelpNode.innerHTML = getString("generalTitleHelpScreen","","upper"); openHelpNode.id = "openHelpNodeInSettingsIframe"; openHelpNode.className = " mdl-button mdl-js-button 	mdl-js-ripple-effect";
					document.querySelector("iframe#" + id).contentWindow.document.querySelector("main").appendChild(openHelpNode);
					document.querySelector("iframe#" + id).contentWindow.document.querySelector("#openHelpNodeInSettingsIframe").addEventListener("click", function(){followLink("./help","_blank",LINK_STATE_INTERNAL_HTML);});
					var brNode = document.querySelector("iframe#" + id).contentWindow.document.createElement("BR");
					document.querySelector("iframe#" + id).contentWindow.document.querySelector("main").appendChild(brNode);
				}
				var applySettingsNode = document.querySelector("iframe#" + id).contentWindow.document.createElement("BUTTON");
				applySettingsNode.innerHTML = getString("settingsScreenIframeApplyAndClose","","upper"); applySettingsNode.id = "applySettingsInIframe"; applySettingsNode.className = " mdl-button mdl-js-button 	mdl-js-ripple-effect";
				document.querySelector("iframe#" + id).contentWindow.document.querySelector("main").appendChild(applySettingsNode);
				document.querySelector("iframe#" + id).contentWindow.document.querySelector("#applySettingsInIframe").addEventListener("click", function(){settings = getSettings(); closeIframe(id); menu.container.style.display = ""; });
				document.querySelector("iframe#" + id).contentWindow.followLink = function(input1,input2, input3){
						window.open(input1, "_blank");
				}
			  } else {
				followLink("settings", "_self", LINK_STATE_INTERNAL_HTML);
			  }
		    }, false);
	  }
	  menu.settings.style.display = "inline";	  
	  menu.help.style.display = "none";
	  if(menu.container.offsetHeight < background.y && 2*background.y > background.height) {
          menu.help.style.display = "inline";
		  menu.containerMargin = (background.y-menu.container.offsetHeight)/2;
		  menu.container.style.top = "";
		  menu.container.style.right = client.width/2-menu.container.offsetWidth/2 + "px";
		  menu.container.style.bottom =  menu.containerMargin +  "px";
	  } else if (menu.container.offsetHeight < background.y) {
		  menu.containerMargin = (background.y- menu.container.offsetHeight)/2;
		  menu.container.style.top = "";
		  menu.container.style.right =  menu.containerMargin + "px";
		  menu.container.style.bottom =  menu.containerMargin +  "px";
	  } else {
		  menu.containerMargin = background.width/50;
		  menu.container.style.bottom = "";
		  menu.container.style.right = background.x +  menu.containerMargin + "px";
		  menu.container.style.top = background.y +  menu.containerMargin + "px";
	  }
	  menu.container.style.opacity = "1";
}

function openIframe(id) {
	document.querySelector("iframe#" + id).style.display = "block";	
}
function closeIframe(id) {
	document.querySelector("iframe#" + id).contentWindow.location.reload(true);
	document.querySelector("iframe#" + id).style.display = "none";
}

//Enable offline functionality
if ('serviceWorker' in navigator && window.location.href.indexOf("https://") == 0) {
  window.addEventListener('load', function() {
	  var url = "sw.js";
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url);
	  xhr.send();
	  xhr.addEventListener("load", goOnSW);
	  xhr.addEventListener("error", goOnSW);
	  function goOnSW() {
		if(xhr.status == 404) {
			url = "../sw.js"
		}
		navigator.serviceWorker.register(url).then(function(registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	 };
	});
}
