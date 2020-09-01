function GetMarketData() {
    console.log("Getting Market Data");

    chrome.tabs.query({ url: "https://robinhood.com/" }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "ScrapePage" }, function (response) {
                if (response) {
                    chrome.runtime.sendMessage({
                        msg: "Update Data",
                        data: { 
                            MarketData: response
                        }
                    });
                    
                    // TODO: Do stored data comparison
                    // If a stock/option moves $1 notify user
    
                    localStorage["Market Data"] = { MarketData: response };
                }
            });
        }
    });
}


setInterval(GetMarketData, 5000);

/*
    Removed code
*/

/***
chrome.notifications.create("stock_notification",{
    type: "basic",
    title: "Stock Information",
    iconUrl: "icon.jpg",
    message: "Stock price: " + (price != "" ? price : "?") + ", Option return: " + (option != "" ? option : "?")
})

chrome.notifications.getAll(function(notifs) {
    console.log(notifs);
});
***/