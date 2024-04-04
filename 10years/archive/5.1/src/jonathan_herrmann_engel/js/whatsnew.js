window.onload = function(){
	settings = getSettings ();
	document.querySelector("#backOption").addEventListener("click", function(){try {window.close();}catch(err) {}; followLink("./","_self", LINK_STATE_INTERNAL_HTML);}, false);
	var hash = window.location.hash.replace(/[^a-zA-Z0-9\-\_]/i, "");
	var versions = document.getElementsByClassName("version");
	var newest = versions[versions.length-1];
	newest.id = "newest";
	if(hash == "newest"){
		var elem = document.querySelector("#newest");
		if(elem){ 
			elem.scrollIntoView();
		}
	}
}