$(document).ready(function () {

    require(["LightstreamerClient", "Subscription", "StaticGrid"], function (LightstreamerClient, Subscription, StaticGrid) {

        var client = new LightstreamerClient('http://ec2-54-191-14-197.us-west-2.compute.amazonaws.com:8080', 'HELLOWORLD');
        client.connect();

        var grid = new StaticGrid("hellogrid", true);

        var subscription = new Subscription("MERGE", grid.extractItemList(), grid.extractFieldList());
        subscription.addListener(grid);

        client.subscribe(subscription);
    });

});
