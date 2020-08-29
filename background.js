function GetMarketData() {
    console.log("Getting Market Data");

    chrome.tabs.query({ url: "https://robinhood.com/" }, function (tabs) {
        if (tabs.length > 0) {
            console.log("tab:", tabs[0]);

            chrome.tabs.sendMessage(tabs[0].id, { action: "refreshNumbers" }, function (response) {
                console.log("Page Response: ", response);
                var price = response.price;
                var option = response.option;
                
                chrome.runtime.sendMessage({
                    msg: "Update Data",
                    data: { 
                        Price: price,
                        Option: option
                    }
                });
                
                if (localStorage["Market Data"] == null) {
                    localStorage["Market Data"] = { Price: price, Option: option };
                }
                else {
                    // Do stored data comparison
                    localStorage["Market Data"] = { Price: price, Option: option };
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