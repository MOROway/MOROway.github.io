////Required code (needs to be set on each platform)
function followLink(input1,input2, input3){
	 if(input3 == LINK_STATE_INTERNAL_HTML && !(input1.endsWith("/")) && input1.indexOf("#") == -1 && input1.indexOf("?") == -1)
		 input1 = input1 + "/";
	 window.open(input1, input2);
}

////Optional code (app works without it)
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
