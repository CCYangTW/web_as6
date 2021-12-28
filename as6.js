//comic player
$(function () {
    var winh = $(window).height();
    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        $(".slideanimate").each(function () {
            if (scrolled > $(this).data("pos")) {
                $(this).addClass("animate__animated slide animate__" + $(this).data("direction"));
            }
            if (scrolled == 0) {
                $(this).removeClass("animate__animate slide animate__" + $(this).data("direction"));
            }
        });
    });
});

//map
$(window).scroll(function () {
    var scrolled = $(document).scrollTop();
    var winh = $(window).height();

    $(".maploc").each(function () {
        var thispos = $(this).offset().top;
        var thish = $(this).height();

        // filling polygon later
        if (scrolled >= thispos && scrolled < thispos + thish) {
            var fill_id = $(this).data("fill");
            $(fill_id + " path").css("fill", "#EB593C");
            // "#fill1 path"
        }

        if (scrolled >= thispos - winh / 2 && scrolled < thispos + thish - winh / 2) {
            // Moving bg image by transoform
            $("#svgobj").css({
                "transform": "translate(" + $(this).data("x") + ", " + $(this).data(
                    "y") + ") scale(" + $(this).data("scale") + ")"
            });

            // Showing path with scrolled percentage
            var path = $($(this).data("path"))[0];
            $($(this).data("path")).css("stroke-opacity", "1");
            var length = path.getTotalLength();
            console.log(length);
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            var scrollpercent = (scrolled - thispos + winh / 2) / thish;
            var draw = length * scrollpercent;
            path.style.strokeDashoffset = length - draw;

            //Showing dot with path
            var p = path.getPointAtLength(draw);
            var dot = document.getElementById('dot');
            dot.setAttribute("transform", `translate(${p.x}, ${p.y})`);
            // https://www.w3schools.com/howto/howto_js_scrolldrawing.asp
            // https://potatodie.nl/diffuse-write-ups/move-a-dot-along-a-path/

        }
    });

    if (scrolled == 0) {
        $("svg g path").css({
            "fill": "none",
        });
        $("#svgobj").css("transform", "translate(0%, 0%) scale(1)");
    }

});