document.addEventListener("DOMContentLoaded", function(event) {
	function fetchData() {
        chrome.tabs.query({ url: "https://robinhood.com/options/*" }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "refreshNumbers" }, function (response) {
                var price = response[0];
                var option = response[1];
                
                if (price != "") {
                    $(".stock-price .text").html(price);
                }
                if (option != "") {
                    $(".option-return .text").html(option);
                }
                chrome.notifications.create("stock_notification",{
                    type: "basic",
                    title: "Stock Information",
                    iconUrl: "icon.jpg",
                    message: "Stock price: " + (price != "" ? price : "?") + ", Option return: " + (option != "" ? option : "?")
                })
                chrome.notifications.getAll(function(notifs) {
                    console.log(notifs);
                });
            });
        });

		setTimeout(function() {
            fetchData();
        }, 2000);
	}
	fetchData();
});