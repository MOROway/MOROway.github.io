window.onload = function(){
	document.querySelector("#whats-new").addEventListener("click", function(){followLink("whatsnew/#newest","_self", LINK_STATE_INTERNAL_HTML);}, false);
	document.querySelector("#legal-mdl-copyright").addEventListener("click", function(){followLink("src/others/open_source/open_code/google/mdl/COPYRIGHT","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-mdl-license").addEventListener("click", function(){followLink("src/others/open_source/open_code/google/mdl/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-pace-license").addEventListener("click", function(){followLink("src/others/open_source/open_code/hubspot/pace.js/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-fonts-roboto-copyright").addEventListener("click", function(){followLink("src/others/open_source/open_fonts/google/Roboto/COPYRIGHT","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-fonts-roboto-license").addEventListener("click", function(){followLink("src/others/open_source/open_fonts/google/Roboto/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-fonts-materialicons-license").addEventListener("click", function(){followLink("src/others/open_source/open_fonts/google/MaterialIcons/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-self-code-license").addEventListener("click", function(){followLink("src/jonathan_herrmann_engel/js/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-self-assets-copyright").addEventListener("click", function(){followLink("assets/COPYRIGHT","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);
	document.querySelector("#legal-self-assets-license").addEventListener("click", function(){followLink("assets/LICENSE","_self", LINK_STATE_INTERNAL_LICENSE_FILE);}, false);	
	var elem = document.createElement("p");
	elem.textContent = formatJSString(getString("helpScreenGeneralWelcomeVersion", "."), APP_DATA.version.major, APP_DATA.version.minor, APP_DATA.version.patch, APP_DATA.version.date.year, (APP_DATA.version.date.month < 10 ? "0" + APP_DATA.version.date.month : APP_DATA.version.date.month), (APP_DATA.version.date.day < 10 ? "0" + APP_DATA.version.date.day : APP_DATA.version.date.day));
	document.querySelector("#version").appendChild(elem);
	document.querySelector("#feedbacksend").addEventListener("click", function(){notify(getString("helpScreenContactFeedbackSendNotification", "."), false, 900, null, null, window.innerHeight); followLink( getServerHTMLLink("feedback") ,"_blank", LINK_STATE_NORMAL);}, false);
	document.querySelector("#imprintA").addEventListener("click", function(){notify(getString("helpScreenContactBackupLinkNotification", "."), false, 900, null, null, window.innerHeight); followLink( getServerHTMLLink("imprint"),"_blank", LINK_STATE_NORMAL);}, false);
	handleServerJSONValues("imprint", function(res){
		var imprint = document.querySelector("#imprint");
		imprint.innerHTML = "<b>"+getString("helpScreenContactImprintTitle")+"</b>";
		Object.keys(res).forEach(function(key){
			var span = document.createElement("span");
			span.textContent = res[key];
			imprint.innerHTML += "<br>";
			imprint.appendChild(span);
		});
	});
	

}
function init(){
	
	settings = getSettings ();
	
	document.querySelector("#backOption").addEventListener("click", function(){try {window.close();}catch(err) {}; followLink("./","_self", LINK_STATE_INTERNAL_HTML);}, false);
	
	var elems = document.querySelectorAll(".content");
	for (var i = 0; i < elems.length; i++) {
		var elemString = elems[i].dataset.stringidContent;
		var j = 0;
		do {
			if(getString([elemString,j]) != "undefined") {
				var selem = document.createElement("p");
				selem.setAttribute("data-stringid-content",elemString);
				selem.setAttribute("data-stringid-content-arrayno",j);
				elems[i].appendChild(selem);
				j++;
			} else {
				j = 0;
			}
		} while (j > 0);
		elems[i].removeAttribute("data-stringid-content");
	}
	setHTMLStrings();	
}