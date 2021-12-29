//comic player
$(document).ready(function() {
    var div1_pos = $("#div1").offset().top;
    var space1_pos = $("#space1").offset().top;
    var winh = $(window).height();
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var div1_scrolled = scrolled - div1_pos;
        if (div1_scrolled > 0 && scrolled < space1_pos - winh) {
            $("#naruto1").css('left', ($("#naruto1").data('left') + div1_scrolled * 0.01) + '%');
            $("#sasuke1").css('left', ($("#sasuke1").data('left') - div1_scrolled * 0.01) + '%');
            $("#naruto1").css('top', ($("#naruto1").data('top') + div1_scrolled * 0.055) + '%');
            $("#sasuke1").css('top', ($("#sasuke1").data('top') + div1_scrolled * 0.06) + '%');

            $("#naruto1").css('width', ($("#naruto1").data('width') + div1_scrolled * 0.01) + '%');
            $("#sasuke1").css('width', ($("#sasuke1").data('width') + div1_scrolled * 0.01) + '%');

            console.log("div1_pos:" + div1_pos +
                "\tscrolled:" + scrolled +
                "\tspace1:" + space1_pos);
        }
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