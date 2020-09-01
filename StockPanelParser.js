// This works for pulling stocks, but I still need to figure how to get options data
function ParsePanel() {
    var sidePanelText = $(".sidebar-content")[0].innerText;

    if (sidePanelText) {
        var data = {
            OptionData: [],
            StockData: []
        };

        var optionText = sidePanelText.substring(
            sidePanelText.lastIndexOf("Options") + 8, 
            sidePanelText.lastIndexOf("Stocks") - 1);
        optionText = optionText.replace(/\r/g, "").split(/\n/);    

        var stockText = sidePanelText.substring(
            sidePanelText.lastIndexOf("Stocks") + 7, 
            sidePanelText.lastIndexOf("Lists") - 1);
        stockText = stockText.replace(/\r/g, "").split(/\n/);
        
        var tempData = {};
        // Parse option data
        for (i = 0; i < optionText.length; i++) {
            if (i % 4 == 0) {
                tempData.optionDescription = optionText[i];
            }
            else if (i % 4 == 1) {
                tempData.optionExpiration = optionText[i];
            }
            else if (i % 4 == 2) {
                tempData.strikePrice = optionText[i];
            }
            else {
                tempData.optionReturn = optionText[i];
                data.OptionData.push(tempData);
                tempData = {};
            }
        }

        // Parse stock data
        for (i = 0; i < stockText.length; i++) {
            if (i % 4 == 0) {
                tempData.ticker = stockText[i];
            }
            else if (i % 4 == 1) {
                var sharesText = stockText[i];

                if(sharesText.startsWith('1')) {
                    sharesText = '1';
                }
                else {
                    sharesText = sharesText.replace(" Shares", "");
                }

                tempData.numOfShares = sharesText;
            }
            else if (i % 4 == 2) {
                tempData.marketValue = stockText[i];
            }
            else {
                tempData.stockReturn = stockText[i];
                data.StockData.push(tempData);
                tempData = {};
            }
        }

        return data;
    }
}

/*
    var stockCells = $(".sidebar-content div[data-testid = 'PositionCell']"),
        optionsCells = [],
        sidePanelData = {},
        stocks = [],
        options = [];

    stockCells.each(function (index) {
        var cellText = this.innerText.replace(/\r/g, "").split(/\n/);

        if (cellText != null && cellText != undefined) {
            var ticker = cellText[0];
            var numOfShares = 0;
    
            if (cellText[1].startsWith(1)) {
               numOfShares = cellText[1].replace(" Share", "");
            }
            else {
                numOfShares = cellText[1].replace(" Shares", "");
            }
             
            var currentPrice = cellText[2];
            var returnOnInvestment = cellText[3];
    
            stocks.push({ ticker, numOfShares, currentPrice, returnOnInvestment });
        }
    });

    sidePanelData.Stocks = stocks;
    sidePanelData.Options = options;

    return sidePanelData;
*/