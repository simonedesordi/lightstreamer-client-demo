$(document).ready(function () {
    // the current portfolio should be chosen by the user according to the user profile;
    // in this sample, user authentication is not included and a single portfolio is
    // shared among all the connected users
    var portfolioId = "portfolio1";

    // portfolio contents; provided by the PORTFOLIO_ADAPTER in COMMAND mode
    var fieldList = ["key", "command", "qty"];

    // cell highlighting time (milliseconds)
    var hotTime = 500;

    require(["js/lsClient", "Subscription", "StaticGrid"], function (lsClient, Subscription, StaticGrid) {

        //portfolioGrid = new StaticGrid("portfolio", true);
        //portfolioGrid.setAutoCleanBehavior(true, false);
        //portfolioGrid.addListener({
        //    onVisualUpdate: function (key, info) {
        //        if (info == null) {
        //            return;
        //        }
        //        // visual effects on updates
        //        info.setHotTime(hotTime);
        //        info.setStyle("lshot", "lscold");
        //        info.setCellStyle("command", "commandhot", "commandcold")
        //    }
        //});
        //// let's define the initial sorting column
        //changeSort(initialSort);

        var portfolioSubscription = new Subscription("COMMAND", portfolioId, fieldList);
        portfolioSubscription.setDataAdapter("PORTFOLIO_ADAPTER");
        portfolioSubscription.setRequestedSnapshot("yes");

        portfolioSubscription.addListener(portfolioGrid);
        lsClient.subscribe(portfolioSubscription);
    });

});
