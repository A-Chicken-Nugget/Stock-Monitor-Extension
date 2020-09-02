var show_panel = false;

$(document).ready(function() {
    chrome.storage.sync.get(["sm_pages"], function(result) {
        if (result.sm_pages !== "" && result.sm_pages !== undefined) {
            for (i = 0; i < result.sm_pages.length; i++) {
                if (window.location.hostname === result.sm_pages[i]) {
                    show_panel = true;
                    break;
                }
            }
        }

        $(`
            <style>
                .stock-monitor {
                    background-color: black;
                    display: flex;
                    z-index: 9999999;
                    position: fixed;
                    top: 0;
                    padding: 5px;
                }
                .monitor-title {
                    color: green;
                    font-size: 20px;
                    line-height: 3rem;
                }
                .center-contents {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .stock-monitor h5 {
                    color: white;
                }
            </style>
        `).appendTo("body");
        $("body").prepend(`
            <div class="col-md-12 stock-monitor" hidden>
                <div class="col-md-12 monitor-content d-flex">
                    <div class="center-contents text-white"><h3>Loading...</h3></div>
                </div>
            </div>
        `);
    });

});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "sm_update" && document.readyState === "complete" && show_panel) {
            var listingHtml = "";

            if (request.items.length > 0) {
                if ($(".stock-monitor").attr("hidden")) {
                    $(".stock-monitor").removeAttr("hidden");
                }

                for (item of request.items) {
                    if (item.return) {
                        listingHtml += `
                            <div class="d-block text-white" style="margin: 0 10px 0 10px;">
                                <div class="text-center">
                                    <h5>${item.title}</h5>
                                </div>
                                <div class="text-center">
                                    <h7>
                                        SP: <span class="${parseInt(item.price.replace("$","")) > 0 ? "text-success" : "text-danger"}">${item.price}</span>
                                        OR: <span class="${parseInt(item.return.replace("$","")) > 0 ? "text-success" : "text-danger"}">${item.return}</span>
                                    </h7>
                                </div>
                            </div>
                        `;
                    } else {
                        listingHtml += `
                            <div class="d-block text-white" style="margin: 0 10px 0 10px;">
                                <div class="text-center">
                                    <h5>${item.title}</h5>
                                </div>
                                <div class="text-center">
                                    <h7>
                                        SP: <span class="${parseInt(item.price.replace("$","")) > 0 ? "text-success" : "text-danger"}">${item.price}</span>
                                    </h7>
                                </div>
                            </div>
                        `;
                    }
                }
                $(".monitor-content").html(listingHtml);
            } else {
                if (!$(".stock-monitor").attr("hidden")) {
                    $(".stock-monitor").attr("hidden","hidden");
                }
            }
        } else if (request.action === "sm_option" && document.readyState === "complete") {
            var listing = {
                title: $(".main-container").find("h1").text().split(" ")[0],
                return: $($($(".grid-2").find(".table")[0]).find("tr")[2]).find(".bold").text().replace("+","")
            };
            var priceElement = $($(".main-container .rh-hyperlink")[0]).parent().contents().filter(function(){return this.nodeType==3;})[0];

            if (priceElement != undefined) {
                listing.price = priceElement.nodeValue;
            } else {
                listing.price = "N/A"
            }

            sendResponse(listing);
        } else if (request.action === "sm_stock" && document.readyState === "complete") {
            sendResponse({
                title: $($(".main-container header h1")[0]).text(),
                price: $($($(".main-container section")[0]).find("h1 div div")[0]).text(),
            });
        } else if (request.action === "sm_toggle_panel") {
            chrome.storage.sync.get(["sm_pages"], function(result) {
                if (result.sm_pages !== "" && result.sm_pages !== undefined) {
                    let pages = result.sm_pages;
        
                    if (show_panel) {
                        for (i = 0; i < pages.length; i++) {
                            if (pages[i] === window.location.hostname) {
                                delete pages[i];
                            }
                        }
                        pages = pages.filter(function(item) {return item !== null;});
    
                        chrome.storage.sync.set({"sm_pages": pages});
                        $(".stock-monitor").attr("hidden","hidden");
                    } else {
                        pages.push(window.location.hostname);
                        chrome.storage.sync.set({"sm_pages": pages});
                        $(".stock-monitor").removeAttr("hidden");
                    }
                    show_panel = !show_panel;
                } else {
                    chrome.storage.sync.set({"sm_pages": [window.location.hostname]});
                    $(".stock-monitor").removeAttr("hidden");
                }
            });
        }
    }
);