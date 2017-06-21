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
                    flexEasing = self.parent('.fslider').attr('data-easing'),
                    flexDirection = self.parent('.fslider').attr('data-direction'),
                    flexReverse = self.parent('.fslider').attr('data-reverse'),
                    flexSlideshow = self.parent('.fslider').attr('data-slideshow'),
                    flexPause = self.parent('.fslider').attr('data-pause'),
                    flexSpeed = self.parent('.fslider').attr('data-speed'),
                    flexVideo = self.parent('.fslider').attr('data-video'),
                    flexPagi = self.parent('.fslider').attr('data-pagi'),
                    flexArrows = self.parent('.fslider').attr('data-arrows'),
                    flexThumbs = self.parent('.fslider').attr('data-thumbs'),
                    flexHover = self.parent('.fslider').attr('data-hover'),
                    flexSHeight = self.parent('.fslider').attr('data-smooth-height'),
                    flexTouch = self.parent('.fslider').attr('data-touch'),
                    flexUseCSS = false;

                if (!flexAnim) {
                    flexAnim = 'slide';
                }

                if (!flexEasing || flexEasing === 'swing') {
                    flexEasing = 'swing';
                    flexUseCSS = true;
                }

                if (!flexDirection === true) {
                    flexDirection = 'horizontal';
                }
            })
        }
    },

    masonryThumbs: function() {}
};