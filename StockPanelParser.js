// I plan on using this to get the data on every stock/option from the side panel of robinhood
// to display all at once instead of running per open tab of chrome
function ParsePanel() {
    var sideBar = $(".sidebar-content");
    return sideBar.children;
}