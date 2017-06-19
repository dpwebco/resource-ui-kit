/**
 * Created by Darrell on 06/17/2017.
 */


var scrollFire = {
    scrollFireEventHandled: false,
    init: function() {
        this.checkHandled();
    },
    onScroll: function (options) {
        var windowScroll = window.pageYOffset + window.innerHeight;

        for (var i = 0; i < options.length; i++) {
            var value = options[i],
                selector = value.selector,
                offset = value.offset,
                callback = value.callback;

            var currElem = document.querySelector(selector);

            if (currElem !== null) {
                var elemOffset = currElem.getBoundingClientRect().top + window.pageYOffset;

                if (windowScroll > (elemOffset + offset)) {
                    if (value.done !== true) {
                        if (typeof(callback) === 'function') {
                            callback.call(this, currElem);
                        } else if (typeof(callback) === 'string') {
                            var callbackFunc = new Function(callback);
                            callbackFunc(currElem);
                        }

                        value.done = true;
                    }
                }
            }
        }
    },

    throttledScroll: function () {
        this.onScroll();
    },
    checkHandled: function () {
        if (!this.scrollFireEventHandled) {
            window.addEventListener('scroll', this.throttledScroll);
            window.addEventListener('resize', this.throttledScroll);

            this.scrollFireEventHandled = true;
        }
    }
};

scrollFire.init();