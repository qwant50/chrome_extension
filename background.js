window.onload = function () {

    let tabs = {};

    chrome.extension.onMessage.addListener(function (request, source) {
        if (request == 'content.js') {
            tabs[source.tab.id] = ((tabs[source.tab.id] === undefined) ? 1 : ++tabs[source.tab.id]);
            updateBadge(tabs[source.tab.id]);
        }
    });

    chrome.tabs.onCreated.addListener(function (tab) {

        console.log('tabs.onCreated run...');
        console.log('info.status', tab.status);
        console.log('tabs.onCreated tab.id ', tab.id);
        updateBadge('');
        chrome.browserAction.disable(tab.id);
    });

    // fires when tab is updated
    chrome.tabs.onUpdated.addListener(function (id, info, tab) {
        // if user open empty tab or ftp protocol and etc.
        console.log('tabs.onUpdated run...');
        console.log('info', info);
        console.log('tab', tab);
        console.log('info.status', info.status);

        console.log('tab.url', tab.url);
        if (info.status == 'loading') {
            tabs[id] = 0;
            updateBadge('');
            if (tab.url.match(/^http:\/\/seasonvar.ru/)) {
                chrome.browserAction.enable(id);
            }
            else {
                chrome.browserAction.disable(id);
            }
        }
    });

    chrome.tabs.onActivated.addListener(function(tab) {
        console.log('tabs.onActivated', tab);
        chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
            // the return value is an array
            if (arrayOfTabs[0].url.match(/^http:\/\/seasonvar.ru/)) {
                chrome.browserAction.enable(tab.tabId);
            }
            else {
                chrome.browserAction.disable(tab.tabId);
            }
        });
    });

    function updateBadge(newValue) {
        // get active tab on current window
        chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
            // the return value is an array
            var activeTab = arrayOfTabs[0];
            if (!activeTab) return;
            console.log('updateBage activeTab: ', activeTab.id, 'newValue: ', newValue);
            chrome.browserAction.setBadgeText({text: String(newValue), tabId: activeTab.id});
        });
    }
};

