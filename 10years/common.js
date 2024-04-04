window.addEventListener("load", function() {
	document.querySelector("#share-dialog-close").addEventListener("click", function() {
		document.querySelector("#share-dialog").style.display = "";
		document.querySelector("#share").style.display = "";
	});
	document.querySelector("#share").addEventListener("click", function() {
		document.querySelector("#share-dialog-url").textContent = window.location.href;
		document.querySelector("#share").style.display = "none";
		document.querySelector("#share-dialog").style.display = "block";
	});
});