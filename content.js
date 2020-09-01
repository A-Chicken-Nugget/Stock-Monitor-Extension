chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "ScrapePage") {
            var sidePanel = ParsePanel();
            console.log("Parse panel called:", sidePanel);

            sendResponse({ sidePanel });
        }
    }
);