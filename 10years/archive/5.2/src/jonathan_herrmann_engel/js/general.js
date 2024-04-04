//GLOBAL CONSTANTS
const LINK_STATE_NORMAL = 0;
const LINK_STATE_INTERNAL_HTML = 1;
const LINK_STATE_INTERNAL_LICENSE_FILE = 2

const DEFAULT_LANG = "de";
const CURRENT_LANG = typeof(Storage) != "undefined" && typeof window.localStorage.getItem("morowayAppLang") == "string" ? window.localStorage.getItem("morowayAppLang") : DEFAULT_LANG;
const STRINGS = {de:{generalTitle: "MOROway App", generalBack: "Zurück", generalTitleSettingsScreen: "Einstellungen", generalTitleHelpScreen: "Hilfe & Informationen", generalTitleErrorScreen: "Bekannte Fehler", generalTitleWhatsNewScreen: "Versionsgeschichte", appScreenNoCanvas: "Ihr Browser wird nicht unterstützt. UPDATE HILFT!", appScreenFurtherInformation: "Mehr Informationen", appScreenHasLoaded:"Anwendung geladen", appScreenHasUpdated:"Neue Version", appScreenIsFail: "FAIL - WE GONNA FIX IT ASAP", appScreenTrainSelected: "{{0}} {{1}}ausgewählt", appScreenTrainSelectedAuto: "automatisch", appScreenSwitchTurns: "Weiche gestellt", appScreenObjectStops: "{{0}} hält an", appScreenObjectStarts: "{{0}} fährt los", appScreenObjectChangesDirection: "{{0}}: Richtung gewechselt", appScreenObjectHasCrashed: "Crash zwischen {{0}} und {{1}}", appScreenAMillionFrames: "{{0}} Millionen Frames gezeigt", appScreenKonami: "Super - Sie haben den Konamicode geknackt", appScreenKonamiIconRow: "🚂🚂🚂", appScreenTrainNames: ["Dampflok", "TGV Duplex", "Schi-Stra-Bus"], appScreenTrainIcons:  ["🚂","🚅","🚋"], appScreenTrainCarIcon: "🚃", appScreenCarNames: ["Rotes Auto", "Weißes Auto"], appScreenCarIcons: ["🏎️", "🚗"], appScreenCarStepsBack: "{{0}} setzt zurück", appScreenCarAutoModeChange: "Automatische Autosteuerung  {{0}}", appScreenCarAutoModeInit: "gestartet", appScreenCarAutoModePause: "gestoppt", settingsScreenOptNotificationsTitle: "Benachrichtigungen", settingsScreenOptNotificationsDesc: "Zeigt Texteinblendungen bei verschiedenen Aktionen an.", settingsScreenOptNotificationsInfo: "Funktioniert nicht auf kleinen Bildschirmen. Einige Benachrichtigungen werden trotz Deaktivierung dieser Option angezeigt.",settingsScreenOptClassicUITitle: "Klassische Steuerelemente", settingsScreenOptClassicUIDesc: "Zeigt die klassischen Steuerelemente wie Trafo und Zugauswahlbutton.", settingsScreenOptSelectedTrainTitle: "Ausgewählter Zug", settingsScreenOptSelectedTrainDesc: "Zeigt den Namen des ausgewählten Zuges immer an.", settingsScreenOptSelectedTrainInfo: "Erfodert aktivierte \"Klassische Steuerelemente\".", settingsScreenOptSwitchesTitle: "Weichen aktivieren", settingsScreenOptSwitchesDesc: "Ermöglicht das Stellen einiger Weichen.", settingsScreenOptCursorTitle: "Cursor als Farbe darstellen", settingsScreenOptCursorDesc: "Zeigt statt dem Maussymbol einen Farbkreis.", settingsScreenOptCursorInfo: "Funktioniert nicht auf Touchscreens.", settingsScreenOptTaxOfficeTitle: "Brennendes Finanzamt animieren", settingsScreenOptTaxOfficeDesc: "Zeigt Animationen zum brennenden Finanzamt.", settingsScreenIframeApplyAndClose: "Anwenden und schließen", helpScreenGeneral: "Allgemeines",  helpScreenGeneralWelcome: "Welcome {{0}}",  helpScreenGeneralWelcomeIcon: "🏡", helpScreenGeneralWelcomePs: ["Hallo! Sie benutzen die MOROway App. Der Hintergrund stellt eine Luftaufnahme der Modellbahn MOROway aus dem Jahre 2011 dar. Viel Fahrspaß!"], helpScreenGeneralWelcomeButtonWhatsNew:  "Neuigkeiten", helpScreenGeneralTrains: "Eisenbahnen {{0}}", helpScreenGeneralTrainsIcon: "🚂", helpScreenGeneralTrainsPs : ["Zur Zeit lassen sich drei Züge steuern; eine Dampflok, ein TGV Duplex und ein Schienen-Straßen-Bus. Das Starten bzw. Stoppen eines Zuges erfolgt durch Klick bzw. Touch auf eben diesen oder mit Hilfe der ausblendbaren klassischen Steuerelemente. Um einen Zug zu wenden, halten Sie den Zug an und doppelklicken Sie ihn.", "Um mittels der klassischen Steuerelemente zu fahren, wählen Sie zunächst einen Zug aus, indem Sie den Schalter unten links im Appbildschirm betätigen, bis der Name des gewünschten Zuges eingeblendet wird. Durch Anklicken des Transformators unten rechts im Appbildschirm wird der jeweils ausgewählte Zug gestartet und gestoppt. Wenn Sie einen größeren Bildschirm (Computer, Tablet u.ä.) verwenden, so können Sie die Geschwindigkeit des Zuges beeinflussen, indem Sie den Regler des Transformators an die gewünschte Position ziehen bzw. ihn an unterschiedlichen Stellen anklicken. Auf kleineren Bildschirmen (Smartphone u.ä.) wird unabhängig hiervon eine mittlere Geschwindigkeit eingestellt. Um auf größeren Bildschirmen die Richtung des jeweils ausgewählten Zuges am Transformator zu ändern, halten Sie den Zug an und klicken dann das Symbol mit den gespiegelten Pfeilen unten rechts im Transformator an. Auf kleineren Bildschirmen kann die Richtung hier nicht verändert werden.", "Auch können Sie einige Weichen stellen. Hierfür ist die entsprechende Option in den Einstellungen zu aktivieren. Das Stellen einer Weiche erfolgt durch Klick auf das farbige Kreissymbol der jeweiligen Weiche. Die Position der Symbole kann durch langen Klick bzw. Touch auf den Hintergrund der Anlage ermittelt werden. Ein roter Kreis bedeutet, dass die Weiche nicht gestellt worden ist, ein grüner das Gegenteil. Nicht gestellt (roter Kreis) gilt für die Weichen vom Innen- zum Außenkreis, dass der Zug den Kreis nicht wechselt und für die Ausweichweichen oben im Innen- bzw. unten im Außenkreis, dass der engere Kreis befahren wird."], helpScreenGeneralCars: "Autos {{0}}", helpScreenGeneralCarsIcon: "🚗", helpScreenGeneralCarsPs: ["Sie können das rote Cabrio links neben dem Bahnhof oder den weißen VW-Bus über dem Güterbahnhof jeweils per Klick auf das Fahrzeug zum Fahren bringen. Um beide Autos automatisch fahren zu lassen, aktivieren Sie durch Doppelklicken eines Autos den automatischen Modus.", "Sofern sie den automatischen Modus nicht aktiviert haben lassen sich die Autos getrennt per Klick starten und stoppen. Starten Sie beide Autos, riskieren Sie einen Frontalzusammenstoß. Um die Autos hiernach erneut starten zu können, setzten Sie ein Auto durch Doppelklick auf das Auto zurück."], helpScreenLegal: "Lizenzen",  helpScreenLegalLibraries: "Eingebaute Libraries {{0}}",  helpScreenLegalLibrariesIcon: "🏗️", helpScreenLegalStrCopyright: "Copyright",helpScreenLegalStrLicense: "Lizenz", helpScreenLegalLibrariesMDL: "Material Design Lite", helpScreenLegalLibrariesMDLPs: ["Wir verwenden das Designframework \"Material Design Lite\" der Google Inc."],helpScreenLegalLibrariesPace: "Pace.js", helpScreenLegalLibrariesPacePs: ["Wir verwenden die Ladeanimation \"Pace.js\" der HubSpot Inc."],helpScreenLegalFonts: "Verwendete Schriften {{0}}", helpScreenLegalFontsIcon: "🌐", helpScreenLegalFontsRoboto: "Roboto", helpScreenLegalFontsRobotoPs: ["Wir verwenden an einigen Stellen die Schriftart \"Roboto\" der Google Inc."], helpScreenLegalFontsMaterialIcons: "Material Icon Font", helpScreenLegalFontsMaterialIconsPs: ["Wir verwenden an einigen Stellen die \"Material Icons\" der Google Inc."],helpScreenLegalOwn: "MOROway App {{0}}",helpScreenLegalOwnIcon: "✌️", helpScreenLegalOwnCode: "Source Code", helpScreenLegalOwnCodePs: ["Sie dürfen unseren Source-Code (js, html, ...) unter der Zwei-Klausel-BSD-Lizenz verwenden."], helpScreenLegalOwnPics: "Grafiken", helpScreenLegalOwnPicsPs: ["Sie dürfen unsere Grafiken unter der Creative Commons Attribution 4.0 International-Lizenz verwenden."], helpScreenContact: "Noch Fragen?",  helpScreenContactFeedback: "Feedback {{0}}",  helpScreenContactFeedbackIcon: "📫", helpScreenContactFeedbackPs: ["Sie kennen uns unbekannte Bugs? Sie haben Vorschläge, Feedback, Lob, Kritik, Fragen oder ein anderes Anliegen, dass Sie kommunizieren möchten? Bitte rufen Sie dazu den Kontaktdaten-Link zur MOROway-Webseite auf!"], helpScreenContactFeedbackBugs: "Bugreport", helpScreenContactFeedbackButtonContact: "Zu den Kontaktdaten", whatsNewScreenVersionNumber: "Version {{0}}", whatsNewScreenVersionNumberMinor: "Neu in Version {{0}}.{{1}}", whatsNewScreenVersionIsNew: "Neu", whatsNewScreenByVersionMa1Mi0: ["2011", "Die animierte Dampflok stellt den Beginn der MOROway App dar."], whatsNewScreenByVersionMa2Mi0: ["2011", "Ein neuer Zug, der TGV, wurde hinzugefügt.", "Erstes animiertes Auto."], whatsNewScreenByVersionMa3Mi0: ["2011", "Verbesserter TGV-Pfad in umgekehrter Richtung.","Verbesserter Pfad für das erste Auto.","Zweites Auto wurde hinzugefügt.","Beide Autos sind nun steuerbar."], whatsNewScreenByVersionMa3Mi1: ["2011", "Erste Version eines Infotextes."], whatsNewScreenByVersionMa3Mi2: ["2011", "Ein Intro mit dem MOROway Logo wurde eingebaut.", "Beide Züge sind individuell steuerbar.", "Steuerung des Infotext wurde ergänzt."], whatsNewScreenByVersionMa4Mi0: ["2015", "{{0}}Update von Action-Script 2 auf Action-Script 3.", "{{0}}Einfügen von Wagen für die Dampflok.", "{{0}}Zweiter Zug im Innenkreis (Schi-Stra-Bus).", "{{0}}Steuerung durch Klick auf Zug ist nun möglich.", "Überarbeiteter Hintergrund.", "Überarbeitete Kreisführung für die Autos.", "Veränderter Vorspann.", "Veränderte Bedienelemente und neuer Hilfetext.", "Fehlerkorrekturen."], whatsNewScreenByVersionMa5Mi0: ["2018", "{{0}}Neuer Hintergrund (u.a. verbesserter Bildausschnitt).", "{{0}}Variable Zuggeschwindigkeit.", "{{0}}Richtungswechsel für alle Züge möglich.", "{{0}}Kurzzeitig eingeblendete Benachrichtigungen informieren über Events.", "{{0}}Basiseinstellungen.", "{{0}}Neuer Vorspann.", "{{0}}Animation des brennenden Finanzamtes.", "Optimierte Objekte (Züge, Autos, Trafo,...).", "Optimierte Objektpfade (\"Zugstrecken\", \"Autostrecken\").", "Optimierte Objektsteuerung (Züge und Autos).", "Optimierte User-Interface.", "Optimierte Hilfeseiten.", "Nativer HTML-, JavaScript- und CSS-Code (statt Flash-Action-Script).", "Offline-Support als Progressive-Web-App.", "Einbau diverser Open-Source-Komponenten.", "Neue Lizenzierung des eigenen Codes."], whatsNewScreenByVersionMa5Mi1: ["2018", "{{0}}Einige Weichen können gestellt werden.", "Optimierte Zugstrecken.", "Fehlerkorrekturen."], whatsNewScreenByVersionMa5Mi2: ["2018", "{{0}}Die Züge starten und halten zeitvergözert.","{{0}}Autos können automatisch fahren.","{{0}}Kurzes Zurücksetzen der Autos möglich.", "Optimierte  Objektsteuerung (Züge und Autos)."], errorScreenErrorMissing: "Fehlende Elemente", errorScreenErrorMissingPics: "Bilder", errorScreenErrorMissingPicsP1: "Erste Möglichkeit: Wir haben ein Bild falsch verlinkt oder fehlerhaft vom Server entfernt. Dies kann von Ihnen nicht behoben werden; Sie müssen sich gedulden, bis wir die Anwendung repariert haben.", errorScreenErrorMissingPicsP2: "Zweite Möglichkeit: Ihr Browser konnte eine richtig verlinkte Mediendatei nicht abrufen, da Sie kein Internet haben oder die Bilddatei blockiert wurde. In diesem Fall prüfen Sie bitte Ihre Verbindung / Firewall."}};
Object.freeze(STRINGS);

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

//HANDLE OBJECTS
function copyJSObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}

//HANDLE STRINGS
function getString(prop, punctuationMark, caseType) {
	var str;
	if(Array.isArray(prop)) {
		if(prop.length == 2 && typeof prop[0] == "string" && typeof prop[1] == "number") {
			if(typeof STRINGS[CURRENT_LANG] != "undefined" && typeof STRINGS[CURRENT_LANG][prop[0]] != "undefined") {
				str = STRINGS[CURRENT_LANG][prop[0]][prop[1]];
			} else if (typeof STRINGS[DEFAULT_LANG] != "undefined" && typeof STRINGS[DEFAULT_LANG][prop[0]] != "undefined") {
				str = STRINGS[DEFAULT_LANG][prop[0]][prop[1]];
			} else {
				return "undefined";
			}
		} else {
				return "undefined";			
		}
	} else {
		str = typeof STRINGS[CURRENT_LANG] == "undefined" || typeof STRINGS[CURRENT_LANG][prop] == "undefined" ? typeof STRINGS[DEFAULT_LANG] == "undefined" ||  typeof STRINGS[DEFAULT_LANG][prop] == "undefined" ? "undefined" : STRINGS[DEFAULT_LANG][prop] : STRINGS[CURRENT_LANG][prop];
	}
	str += typeof punctuationMark == "string" ? punctuationMark : "";
	return typeof caseType == "string" && caseType == "upper" ? str.toUpperCase() : typeof caseType == "string" && caseType == "lower" ? str.toLowerCase() : str;
}


function formatJSString (str) {
	if(typeof str !== "string") {
		return str;
	}
	for (var i = 0; i < arguments.length-1; i++) {
		if(str.indexOf("{{"+i+"}}") !== -1 && (typeof arguments[i+1] == "number" || typeof arguments[i+1] == "string")){
			var replace = new RegExp("\{\{["+i+"]\}\}","g");
			str = str.replace(replace,arguments[i+1]);
		}
	}
	var replace = new RegExp("\{\{[0-9]+\}\}","g");
	str = str.replace(replace,"");
	return str;
}

function formatHTMLString (str) {
	if(typeof str !== "string") {
		return str;
	}
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function setHTMLStrings() {
	var elems = document.querySelectorAll("*[data-stringid-content]");
	for (var i = 0; i < elems.length; i++) {
		var args =[];
		args[0] = typeof elems[i].dataset.stringidContentArrayno == "string" ? getString([elems[i].dataset.stringidContent, parseInt(elems[i].dataset.stringidContentArrayno, 10)],elems[i].dataset.stringidContentPunctuation,elems[i].dataset.stringidContentCase) : getString(elems[i].dataset.stringidContent,elems[i].dataset.stringidContentPunctuation,elems[i].dataset.stringidContentCase);
		var argsNo = 1;
		do {
			var elCArg = elems[i].dataset["stringidContentArgisstringref"+argsNo] == "1" ? getString(elems[i].dataset["stringidContentArg"+argsNo]) : elems[i].dataset["stringidContentArg"+argsNo];
			if(typeof elCArg == "string") {
				args[argsNo] = elCArg;
				argsNo++;
			} else {
				argsNo = 1;
			}
		} while (argsNo > 1);
		elems[i].textContent = formatJSString( ...args );
	}
	elems = document.querySelectorAll("*[data-stringid-title]");
	for (var i = 0; i < elems.length; i++) {
		var args =[];
		args[0] = typeof elems[i].dataset.stringidTitleArrayno == "string" ? getString([elems[i].dataset.stringidTitle, parseInt(elems[i].dataset.stringidTitleArrayno, 10)],elems[i].dataset.stringidTitlePunctuation,elems[i].dataset.stringidTitleCase) : getString(elems[i].dataset.stringidTitle,elems[i].dataset.stringidTitlePunctuation,elems[i].dataset.stringidTitleCase);
		var argsNo = 1;
		do {
			var elCArg = elems[i].dataset["stringidTitleArgisstringref"+argsNo] == "1" ? getString(elems[i].dataset["tringidTitleArg"+argsNo]) : elems[i].dataset["tringidTitleArg"+argsNo];
			if(typeof elCArg == "string") {
				args[argsNo] = elCArg;
				argsNo++;
			} else {
				argsNo = 1;
			}
		} while (argsNo > 1);
		elems[i].title = formatJSString( ...args );
	}
	elems = document.querySelectorAll("*[data-stringid-alt]");
	for (var i = 0; i < elems.length; i++) {
		var args =[];
		args[0] = typeof elems[i].dataset.stringidAltArrayno == "string" ? getString([elems[i].dataset.stringidAlt, parseInt(elems[i].dataset.stringidAltArrayno, 10)],elems[i].dataset.stringidAltPunctuation,elems[i].dataset.stringidAltCase) : getString(elems[i].dataset.stringidAlt,elems[i].dataset.stringidAltPunctuation,elems[i].dataset.stringidAltCase);
		var argsNo = 1;
		do {
			var elCArg = elems[i].dataset["stringidAltArgisstringref"+argsNo] == "1" ? getString(elems[i].dataset["stringidAltArg"+argsNo]) : elems[i].dataset["stringidAltArg"+argsNo];
			if(typeof elCArg == "string") {
				args[argsNo] = elCArg;
				argsNo++;
			} else {
				argsNo = 1;
			}
		} while (argsNo > 1);
		elems[i].alt = formatJSString( ...args );
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
 	if(typeof(Storage) != "undefined") {
		window.localStorage.setItem("morowayAppData", JSON.stringify(APP_DATA));
	}
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
      settings.showSwitches = true;
  
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
