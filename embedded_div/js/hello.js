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
            var price3  = results[length - 3];
            div.children("span").html(
                "<a href='http://gold.weicaifu.com' target='_blank'>gold</a><br>"
                + convertPriceToHtml(price1) + "<br>"
                + convertPriceToHtml(price2) + "<br>"
                + convertPriceToHtml(price3)
            )
            .find(".price").css("font-weight", "bolder").css("color", "#993399");
        }
    );
    t = setTimeout("loopRefresh()", 15000);
}

function convertPriceToHtml(price) {
    if (price) {
        return "<span>" + price.price_time.slice(11) + " > <span class='price'>" + price.price + "</span></span>";
    } else {
        return "";
    }
}

$(function() {
    div.appendTo("body").css("background-color", "rgba(255,255,210,0.85)")
        .css("padding-left", "5px").css("text-align", "left")
        .css("position", "fixed").css("line-height", "normal")
        .css("font-size", "11px").css("font-family", "Tahoma")
        .css("left", "0px").css("bottom", "0px").css("z-index", "9999")
        .css("width", "112px").css("height", "56px")
        .css("border", "2px solid #a1a1a1").css("border-bottom-style", "none")
        .css("border-radius", "0 6px 0 0");

    loopRefresh();
});
