let id1;
let url2;
let d;
let minutes;
let seconds;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function windower(tabs) {
    d = new Date();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
    outstring += "a" + String(minutes) + ":" + String(seconds);
    chrome.scripting.executeScript({target : {tabId:tabs[0].id}, files : ["injector.js"],}, () => {chrome.tabs.sendMessage(tabs[0].id, {key:outstring});})
    chrome.windows.update(tabs[0].windowId,{focused:false}).then(() => {sleep(1984).then(() => {windower(tabs);});});
}
let outstring = "";
function listeners(url1,tabs) {
chrome.tabs.onActivated.addListener((id1,id2) => {
    sleep(250).then(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let id = tabs[0].id;
	let url2 = tabs[0].url;
	if (url2 != url1 && String(url2.slice(0,30)) != "https://docs.google.com/forms/" && String(url2.slice(0,20)) != "chrome://extensions/" && String(url2.slice(0,22)) != "docs.google.com/forms/") {
            /*
            chrome.notifications.create('', {
                title: 'Tab has been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/chrome.png',
                type: 'basic'
            });
            */
            chrome.tabs.remove(id);
            outstring += "b";
        } else {
            /*
            chrome.notifications.create('', {
                title: 'Tab has not been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/chrome.png',
                type: 'basic'
            });
            */
        }
    });
    });
});
let active = true;
chrome.windows.onBoundsChanged.addListener(() => {
    if (!active) { return; }
	active = false;
	sleep(250).then(() => {
	chrome.windows.update(tabs[0].windowId,{state:"maximized",focused:true});
	active = true;
        });
        outstring += "c";
    });
    chrome.windows.onFocusChanged.addListener(() => {
	if (!active) { return; }
	active = false;
	sleep(250).then(() => {
	chrome.windows.update(tabs[0].windowId,{state:"maximized",focused:true});
	active = true;
        outstring += "d";
    });	    
});
}
chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url1 = (' ' + tabs[0].url).slice(1);
        id1 = tabs[0].id;
        chrome.notifications.create('', {
            title: url1,
            message: 'Tab has been locked',
            iconUrl: '/chrome.png',
            type: 'basic'
        });
	chrome.windows.update(tabs[0].windowId,{state:"fullscreen"});
        listeners(url1,tabs);
        windower(tabs);
    }); 
});
