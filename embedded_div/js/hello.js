console.log("hello");

var div = $("<div><span></span></div>");

var t;
function loopRefresh() {
    $.getJSON(
        "https://gold.weicaifu.com/gold/goldTrend_1?" + new Date().getTime(),
        function(json) {
            var results = json.body.results;
            var length  = results.length;
            var price1  = results[length - 1];
            var price2  = results[length - 2];
            div.children("span").html(
                convertPriceToHtml(price1) + "<br>" + convertPriceToHtml(price2)
            )
            .find(".price").css("font-weight", "bolder").css("color", "#993399");
        }
    );
    t = setTimeout("loopRefresh()", 15000);
}

function convertPriceToHtml(price) {
    return "<span>" + price.price_time + "> <span class='price'>" + price.price + "</span></span>";
}

$(function() {
    div.appendTo("body").css("background-color", "rgba(255,255,210,0.8)")
        .css("position", "fixed")
        .css("left", "0px").css("bottom", "0px").css("z-index", "9999")
        .css("width", "240px").css("height", "36px")
        .css("border", "2px solid #a1a1a1").css("border-bottom-style", "none")
        .css("border-radius", "0 6px 0 0");

    loopRefresh();
});
