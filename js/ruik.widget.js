/**
 * Created by Darrell on 06/16/2017.
 */
var widget = {
    init: function() {
        this.cacheDom();
        this.html5Video();
        this.ytBgVideo();
    },
    cacheDom: function() {
        this.$flexSliderContainer = $('.fslider:not(.custom-js)');
        this.$flexSliderEl = $('.flexslider');
        this.videoContainer = $('.video-container:has(video)');
        this.ytBgPlayerEl = $('.yt-bg-player');
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

    masonryThumbs: function() {},

    html5Video: function() {
        if (this.videoContainer.length > 0) {
            this.videoContainer.each(function() {
                var elem = $(this),
                    elemVideo = elem.find('video'),
                    outerContainerWidth = elemVideo.outerWidth(),
                    outerContainerHeight = elemVideo.outerHeight(),
                    innerVideoWidth = elemVideo.outerWidth(),
                    innerVideoHeight = elemVideo.outerHeight();

                if (innerVideoHeight < outerContainerHeight) {
                    var videoAspectRatio = innerVideoWidth / innerVideoHeight,
                        newVideoWidth = outerContainerHeight * videoAspectRatio,
                        innerVideoHPos = (newVideoWidth - outerContainerWidth) / 2;

                    elemVideo.css({
                        'width': newVideoWidth + 'px',
                        'height': innerVideoHeight + 'px',
                        'left': -innerVideoHPos + 'px'
                    });
                } else {
                    var innerVideoVPos = (innerVideoHeight - outerContainerHeight) / 2;
                    elemVideo.css({
                        'width': innerVideoWidth + 'px',
                        'height': innerVideoHeight + 'px',
                        'top': -innerVideoVPos + 'px'
                    });
                }

                if (isMobile.any() && !elem.hasClass('no-placeholder')) {
                    var placeholderImg = elemVideo.attr('poster');

                    if (placeholderImg !== '') {
                        elem.append('' +
                            '<div class="video-placeholder"> style="background-image: url(' + placeholderImg + ');"></div>')
                    }

                    elemVideo.hide();
                }
            });
        }
    },

    ytBgVideo: function() {
        if (!$.mbYTPlayer) {
            console.log('YoutubeBgVideo: YoutubeBG Plugin not defined');
            return true;
        }

        if (this.ytBgPlayerEl.length > 0) {
            this.ytBgPlayerEl.each(function() {
                var elem = $(this),
                    ytbgVideo = elem.attr('data-video'),
                    ytbgMute = elem.attr('data-mute'),
                    ytbgRatio = elem.attr('data-ratio'),
                    ytbgQuality = elem.attr('data-quality'),
                    ytbgOpacity = elem.attr('data-opacity'),
                    ytbgContainer = elem.attr('data-container'),
                    ytbgOptimize = elem.attr('data-optimize'),
                    ytbgLoop = elem.attr('data-loop'),
                    ytbgVolume = elem.attr('data-volume'),
                    ytbgStart = elem.attr('data-start'),
                    ytbgStop = elem.attr('data-stop'),
                    ytbgAutoPlay = elem.attr('data-autoplay'),
                    ytbgFullScreen = elem.attr('data-fullscreen');

                if (ytbgMute === 'false') {
                    ytbgMute = false
                } else {
                    ytbgMute = true;
                }

                if (!ytbgRatio) {
                    ytbgRatio = '16/9';
                }

                if (!ytbgQuality) {
                    ytbgQuality = 'hd720';
                }

                if (!ytbgOpacity) {
                    ytbgOpacity = 1;
                }

                if (!ytbgContainer) {
                    ytbgContainer = 'self';
                }

                if (ytbgOptimize === 'false') {
                    ytbgOptimize = false;
                }

                if (ytbgLoop === 'false') {
                    ytbgLoop = false;
                }


            })
        }
    }
};