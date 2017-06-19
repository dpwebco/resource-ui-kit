/**
 * Created by Darrell on 06/17/2017.
 */
$.fn.parallax = function(options) {
    var windowWidth = $(window).width();

    var defaults = {
        animateDuration: 350,
        scrollSpeed: .05
    };

    $.extend(options, defaults);

    return this.each(function () {
        var $this = $(this);
        // todo need to figure out what this is for (solved)
        $this.addClass('parallax');

        function updateParallax(initial) {
            var containerHeight;
            if (windowWidth < 601) {
                containerHeight = ($this.height() > 0) ? $this.height() : $this.children("img").height();
            }
            var $img = $this.children("img").first(),
                imgHeight = $img.height(),
                parallaxDist = imgHeight - containerHeight,
                bottom = $this.offset().top - containerHeight,
                top = $this.offset().top,
                scrollTop = $(window).scrollTop,
                windowHeight = window.innerHeight,
                windowBottom = scrollTop + windowHeight,
                percentScrolled = (windowBottom - top) / (containerHeight + windowHeight),
                parallax = Math.round((parallaxDist * percentScrolled));

            if (initial) {
                $img.css('display', 'block')
            }

            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
                $img.css('transform', 'translate3d(-50%,' + parallax + "px, 0)");
            }
        }

        $this.children("img").one('load', function() {
            updateParallax();
        }).each(function() {
            if (this.complete)
                $(this).trigger("load");
        });

        $(window).scroll(function() {
            windowWidth = $(window).width();
            updateParallax(false);
        });

        $(window).resize(function() {
            windowWidth = $(window).width();
            updateParallax(false);
        });
    });
};