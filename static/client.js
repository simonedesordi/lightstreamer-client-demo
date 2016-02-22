$(document).ready(function () {

    require(["LightstreamerClient", "Subscription", "StaticGrid"], function (LightstreamerClient, Subscription, StaticGrid) {

        var client = new LightstreamerClient('http://ec2-54-191-14-197.us-west-2.compute.amazonaws.com:8080', 'HELLOWORLD');
        client.connect();

        var grid = new StaticGrid("hellogrid", true);

        var subscription = new Subscription("MERGE", grid.extractItemList(), grid.extractFieldList());
        subscription.addListener(grid);

        client.subscribe(subscription);
    });

    require(["js/lsClient", "Subscription", "DynaGrid"], function (lsClient, Subscription, DynaGrid) {

        portfolioGrid = new DynaGrid("portfolio", true);
        portfolioGrid.setAutoCleanBehavior(true, false);
        portfolioGrid.addListener({
            onVisualUpdate: function (key, info) {
                if (info == null) {
                    return;
                }
                // visual effects on updates
                info.setHotTime(hotTime);
                info.setStyle("lshot", "lscold");
                info.setCellStyle("command", "commandhot", "commandcold")
            }
        });
        // let's define the initial sorting column
        changeSort(initialSort);

        var portfolioSubscription = new Subscription("COMMAND", portfolioId, fieldList);
        portfolioSubscription.setDataAdapter("PORTFOLIO_ADAPTER");
        portfolioSubscription.setRequestedSnapshot("yes");

        portfolioSubscription.addListener(portfolioGrid);
        lsClient.subscribe(portfolioSubscription);
    });

});
