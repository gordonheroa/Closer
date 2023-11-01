function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let url2;
function listeners(url1) {
chrome.tabs.onActivated.addListener((id1,id2) => {
    sleep(250).then(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let id = tabs[0].id;
	let url2 = tabs[0].url;
	if (url2 != url1 && String(url2.slice(0,30)) != "https://docs.google.com/forms/" && String(url2.slice(0,20)) != "chrome://extensions/" && String(url2.slice(0,22)) != "docs.google.com/forms/") {
            chrome.notifications.create('', {
                title: 'Tab has been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/Images/chrome.png',
                type: 'basic'
            });
            chrome.tabs.remove(id);
        } else {
            chrome.notifications.create('', {
                title: 'Tab has not been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/Images/chrome.png',
                type: 'basic'
            });
        }
    });
    });
});
}
chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url1 = (' ' + tabs[0].url).slice(1);
        chrome.notifications.create('', {
            title: url1.slice(0,30),
            message: 'Tab has been locked',
            iconUrl: '/Images/chrome.png',
            type: 'basic'
        });
        listeners(url1);
    });
});
