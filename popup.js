chrome.runtime.onMessage.addListener(
    function (request, sender, sendResonse) {
        console.log("request:", request);
        console.log("sender:", sender);

        if (request.msg === "Update Data") {
            var optionData = request.data.MarketData.sidePanel.OptionData;
            var stockData = request.data.MarketData.sidePanel.StockData;

            console.log("option data:", optionData);
            console.log("stock data:", stockData);
        }
    }
)