/**
 * Created by Darrell on 06/16/2017.
 */
var widget = {
    init: function() {
        this.cacheDom();
    },
    cacheDom: function() {
        this.$flexSliderContainer = $('.fslider:not(.custom-js)');
        this.$flexSliderEl = $('.flexslider');
    },
    loadFlexSlider: function () {
        if (this.$flexSliderEl.length > 0) {
            this.$flexSliderEl.each(function() {
                var self = $(this),
                    flexAnim = self.parent('.fslider').attr('data-animation'),
                    flexEasing = self.parent('.fslider').attr('data-easing')
            })
        }
    },

    masonryThumbs: function() {}
};