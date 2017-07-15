/**
 * Created by Darrell on 07/01/2017.
 */
$.fn.parallax = function() {
    instanceName: '__parallax',

    init = function ($el, opts) {
        if ($el.data(this.instanceName, this)) {
            return this;
        }

        this.$el = $el;
        this
            .setData()
            .setOptions(opts)
            .build();
    };

    defaults = {
        speed: 1.5,
        horizontalPosition: '50%',
        offset: 0
    },

    setData = function () {
        this.$el.data(this.instanceName, this);
        return this;
    },

    setOptions = function (opts) {
        this.options = $.extend(true, {}, this.parallax.defaults, opts, {
            wrapper: this.$el
        });

        return this;
    },

    build = function () {
        var _self = this,
            $window = $(window),
            offset,
            yPos,
            bgPos;

        _self.options.wrapper.removeAttr('style');

        if (typeof _self.options.wrapper.data('image-src') !== 'undefined') {
            _self.options.wrapper.css('background-image', 'url(' + _self.options.wrapper.data('image-src') + ')');
        }

        if (!$.browser.mobile) {
            $window.on('scroll resize', function () {
                offset = _self.options.wrapper.offset();
                yPos = -($window.scrollTop() - offset.top) / _self.options.speed + (_self.options.offset);
                _self.options.wrapper.css('background-position', bgPos);
            });

            $window.trigger("scroll");
        } else {
            _self.options.wrapper.addClass('parallax-disabled')
        }

        return this;
    }
};