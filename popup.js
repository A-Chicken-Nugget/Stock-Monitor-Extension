chrome.runtime.onMessage.addListener(
    function (request, sender, sendResonse) {
        console.log("request:", request);
        console.log("sender:", sender);

        if (request.msg === "Update Data") {
            var price = request.data.Price;
            var optionReturn = request.data.Option;

            console.log("price:", price);
            console.log("optionReturn:", optionReturn);

            var stockPriceText = $("#StockPrice");
            var optionReturnText = $("#OptionReturn");

            $(stockPriceText).text(request.data.Price);
            $(optionReturnText).text(request.data.Option);

            if (price.startsWith('-')) {
                //stockPriceText.css({})
                console.log("Negative return");
            }
            else {
                console.log("Positive return");
            }
        }
    }
)