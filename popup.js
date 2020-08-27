document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
    setInterval(fetchData, 5000);
});

function fetchData() {
    chrome.tabs.query({ url: "https://robinhood.com/options/*" }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "refreshNumbers" }, function (response) {
            console.log("Page Response: ", response);
            var price = response.price;
            var option = response.option;
            
            if (price != "") {
                $("#StockPrice").text(price);
            }

            if (option != "") {
                $("#OptionReturn").text(option);
            }
            
            console.log("Stock Price:", $("#StockPrice").text());
            console.log("Option Return:", $("#OptionReturn").text());

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
        });
    });
}