/**
 * Created by Darrell on 06/14/2017.
 */
(function($) {
    'use strict';

    function transitionEnd() {
        var el = document.createElement('ruik');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

        return false; // explicit for ie8
    }

    $.fn.emulateTransitionEnd = function(duration) {
        var called = false,
            $el = this;

        $(this).one('ruikTransitionEnd', function() { called = true });

        var callback = function() {
            if (!called()) {
                $($el).trigger($.support.transaction.end);
            }

            setTimeout(callback, duration);

            return this;
        };

        $(function() {
            $.support.transition = transitionEnd();

            if (!$.support.transition) {
                return;
            }

            $.event.special.ruikTransitionend = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function(e) {
                    if ($(e.target).is(this))
                        return e.handleObj.handler.apply(this, arguments);
                }
            }
        });
    }
})(jQuery);