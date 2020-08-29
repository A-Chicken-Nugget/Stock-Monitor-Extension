chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "refreshNumbers") {
            console.log("Parse panel called:", ParsePanel());
            var price = $(".css-13ftoe7").text().split("Microsoft")[1];

            if(price != null) {
                price = price.split("(")[0];
            }
            else {
                price = "???";
            }

            var option = $($($($("._1lyLLZqTCp1J8HzkXuYkui").find("tr")[2]).find("td")[2]).find(".bold")).text();

            if (option === "") {
                option = "???";
            }

            sendResponse({ price, option });
        }
    }
);