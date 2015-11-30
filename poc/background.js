
var on  = "open.png";
var off = "closed.png";
var current = off;
chrome.browserAction.setIcon({path: current});

function clicked(evt) {
	(current == off) ? current = on : current = off;
	chrome.browserAction.setIcon({path: current});
	if (current == on) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
			console.log('ininicializando extensao');
			var myTab = tabs[0];
			chrome.tabs.executeScript(myTab.id, {file:"app.js"});
		});
	}
	else if (current == off) {
		console.log('turning off');
	}
}

chrome.browserAction.onClicked.addListener(clicked);

