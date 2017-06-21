/**
 * Created by Darrell on 06/21/2017.
 */


var masonry = {
    instanceName: '__masonry',

    init: function ($el, opts) {
        if ($el.data(this.instanceName)) {
            return this;
        }

        this.$el = $el;

        this
            .setData()
            .setOptions(opts)
            .build();
    },
    setData: function() {
        this.$el.data(this.instanceName, this);

        return this;
    },
    setOptions: function(opts) {
        this.options = $.extend(true, {}, this.defaults, opts, {
            wrapper: this.$el
        });

        return this;
    },
    build: function() {
        if (!($.isFunction($.fn.isotope))) {
            return this;
        }

        var _self = this,
            $el = this.options.wrapper;

        $el.isotope(this.options);
        if (this.options.callback) {
            $el.isotope('on', 'layoutComplete', this.options.callback);
        }

        $el.isotope('layout');
        _self.resize();
    },

    resize: function() {
        var _self = this,
            $el = this.options.wrapper;

        if (_self.resizeTimer) {
            clearTimeout(_self.resizeTimer);
        }

        _self.resizeTimer = setTimeout(function() {
            if ($el.data('isotope')) {
                $el.isotope('layout');
            }

            delete _self.resizeTimer;
        }, 600);
    },
    defaults: {
        itemSelector: 'li',
        isOriginLeft: !theme.rtl
    }
};

$.extend(theme, {
    masonry: masonry
});
$.fn.masonry = function(opts) {
    return this.map(function() {
        var $this = $(this);

        $this.waitForImages(function() {
            if ($this.data(this.instanceName)) {
                return $this.data(this.instanceName);
            } else {
                return new theme.masonry($this, opts);
            }
        });
    });
};