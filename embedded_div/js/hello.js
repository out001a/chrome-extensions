console.log("hello");

var div = $("<div><span></span></div>");

var t;
function loopRefresh() {
    $.getJSON(
        "https://gold.weicaifu.com/gold/goldTrend_1?" + new Date().getTime(),
        function(json) {
            var max = json.body.max;
            var min = json.body.min;
            var results = json.body.results;
            var length  = results.length;
            var price1  = results[length - 1];
            var price2  = results[length - 2];
            var price3  = results[length - 3];
            div.children("span").html(
                "<span class='out001a-head'>"
                + "<a href='http://gold.weicaifu.com' target='_blank'>gold</a>"
                + "&nbsp;<span class='cur'>" + price1.price + "</span>"
                + "&nbsp;<span class='max'>" + max + "</span>"
                + "&nbsp;<span class='min'>" + min + "</span>"
                + "</span><br>"
                + "<span class='out001a-body'>"
                + convertPriceToHtml(price1) + "<br>"
                + convertPriceToHtml(price2) + "<br>"
                + convertPriceToHtml(price3)
                + "</span>"
            );
            div.find(".price").css("font-weight", "bolder").css("color", "#993399");
            div.find(".max").css("color", "red");
            div.find(".min").css("color", "green");
            div.find(".cur").css("color", "#993399");

            $(".out001a-head, .out001a-body").hover(function() {
                $(".out001a-body").show();
            }, function() {
                $(".out001a-body").hide();
            });
            $(".out001a-body").hide();
        }
    );

    t = setTimeout("loopRefresh()", 12000);
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
        .css("padding-left", "6px").css("text-align", "left")
        .css("position", "fixed").css("line-height", "normal")
        .css("font-size", "11px").css("font-family", "Tahoma")
        .css("right", "0px").css("bottom", "0px").css("z-index", "9999")
        .css("width", "150px")//.css("height", "56px")
        .css("border", "2px solid #a1a1a1").css("border-bottom-style", "none")
        .css("border-radius", "6px 0 0 0");

    loopRefresh();
});
