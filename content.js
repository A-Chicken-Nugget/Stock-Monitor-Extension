//This listener is ran on the actual robinhood tab
//The jquery selectors are where the values of the stock/option are fetched from
//Depending on what you want to do just change those selectors to get the data
//I'll probably make an element selector system in the future, or you could do that if you like
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "refreshNumbers") {
            sendResponse([
                $(".css-13ftoe7").text().split("Microsoft")[1].split("(")[0],
                $($($($("._1lyLLZqTCp1J8HzkXuYkui").find("tr")[2]).find("td")[2]).find(".bold")).text()
            ]);
        }
    }
);