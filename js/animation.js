/**
 * Created by Darrell on 06/17/2017.
 */
$.extend($.easing, {
    easeInOutRuik: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;

        return c / 4 * (( t -= 2) * t * t + 2) + b;
    }
});

$.easeInOutRuik();
