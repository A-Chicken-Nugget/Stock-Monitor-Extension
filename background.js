$(document).ready(function() {
    chrome.browserAction.onClicked.addListener(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, { action: "sm_toggle_panel" });
        })
    });

    function fetchData() {
        let listingItems = [];
        let totalCalls = 0;
        let totalComplete = 0;
        let noTabs = [];

        function updateTabs() {
            if (totalCalls > 0 && totalCalls == totalComplete) {
                chrome.tabs.query({ }, function (tabs) {
                    if (tabs.length > 0) {
                        tabs.forEach(tab => {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "sm_update",
                                items: listingItems
                            });
                        });
                    }
                });
            } else {
                if (noTabs[0] && noTabs[1]) {
                    chrome.tabs.query({ }, function (tabs) {
                        if (tabs.length > 0) {
                            tabs.forEach(tab => {
                                chrome.tabs.sendMessage(tab.id, {
                                    action: "sm_update",
                                    items: []
                                });
                            });
                        }
                    });
                }
            }
        }

        //Options
        chrome.tabs.query({ url: "https://robinhood.com/options/*" }, function (tabs) {
            if (tabs.length > 0) {
                tabs.forEach(tab => {
                    let index = totalCalls++;

                    chrome.tabs.sendMessage(tab.id, { action: "sm_option" }, function(response) {
                        totalComplete++;

                        if (response != null) {
                            listingItems[index] = response;
                        }
                        updateTabs();
                    });
                    chrome.tabs.update(tab.id, { "active": true });
                });
            } else {
                noTabs[0] = true;
                updateTabs();
            }
        });
        //Stocks
        chrome.tabs.query({ url: "https://robinhood.com/stocks/*" }, function (tabs) {
            if (tabs.length > 0) {
                tabs.forEach(tab => {
                    let index = totalCalls++;

                    chrome.tabs.sendMessage(tab.id, { action: "sm_stock" }, function(response) {
                        totalComplete++;

                        if (response != null) {
                            listingItems[index] = response;
                        }
                        updateTabs();
                    });
                    chrome.tabs.update(tab.id, { "highlighted": true });
                });
            } else {
                noTabs[1] = true;
                updateTabs();
            }
        });

        setTimeout(function() {
            fetchData();
        }, 2000);
    }
    fetchData();
});