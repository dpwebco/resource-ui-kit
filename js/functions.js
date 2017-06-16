/**
 * Created by Darrell on 06/15/2017.
 */
if ($.infinitescroll()) {
    $.extend($.infinitescroll.prototype, {
        portfolioInfiniteItemsLoader: {
            setup: function() {
                var opts = this.options,
                    instance = this;

                $(opts.nextSelector).on('click', function(evt) {
                    if (evt.which === 1 && !evt.metaKey && !evt.shiftKey) {
                        evt.preventDefault();
                        instance.retrieve();
                    }
                });

                instance.opts.loading.start = function () {
                    opts.loading.msg
                        .appendTo(opts.loading.selector)
                        .show(opts.loading.speed, function () {
                            instance.beginAjax(opts);
                        });
                }
            },

            showDoneMsg: function() {
                var opts = this.options;

                // do all the usual stuff
                opts.loading.img
                    .find('img')
                    .hide()
                    .parent()
                    .find('div')
                    .html(opts.loading.finishedMsg).animate({ opacity: 1}, 2000, function() {
                        $(this).parent().fadeOut('normal');
                    });

                $(opts.navSelector).fadeOut('normal');

                opts.errorCallback($(opts.contentSelector)[0], 'done');
            }
        }
    });

    $.infinitescroll.portfolioInfiniteItemsLoader.showDoneMsg();
} else {
    console.log('Infinite scroll not defined');
}

$(function() {
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, elem) {


            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;

            return id;
        }
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
})(jQuery);

function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();

        var later = function() {
            var last = (new Date()) - timestamp;

            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;

                if (!immediate) {
                    result = func.apply(context, args);
                }
            }
        };

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }

        var callnow = immediate && !timeout;
        if (callnow) {
            result = func.apply(context, args);
        }

        return result;
    }
}
var killRequesting = debounce(function() {
    ruik.options.requesting = false;
}, 100);

function onScrollSliderParallax() {
    if (!ruik.options.requesting) {
        ruik.options.requesting = true;

        requestAnimationFrame(function() {
            slider.sliderParallax();
            slider.sliderElemFade();
        });
    }

    killRequesting();
}
var ruik = {
    options: {
        requesting: false
    },

    init: function () {
        this.imgPreload();
        this.verticalMiddle();
        this.cacheDom();
        this.stickyElements();
        this.gotoTop();
        this.gotoTopScroll();

        this.$window.addEventListener('scroll', onScrollSliderParallax, false);

        this.testimonialGrid();
        this.lightbox();
        //this.ajaxContentAdded();
    },

    cacheDom: function() {
        this.$body = $('body');
        this.$verticalMiddleEl = $('.vertical-middle');
        this.$header = $('#header');
        this.$slider = $('#slider');
        this.$dotsMenuEl = $('.dots-menu');
        this.$siStickyEl = $('.si-sticky');
        this.$gotoTopEl = $('.goto-top');
        this.$window = $(window);
        this.$commonHeightEl = $('.common-height');
        this.$testimonialGridEl = $('.testimonial-grid');
    },

    imgPreload: function(selector, parameters) {
        var params = {
            delay: 250,
            transition: 400,
            easing: 'linear'
        };

        $.extend(params, parameters);

        $(selector).each(function() {
            var img = $(this);

            img.css({
                visibility: 'hidden',
                opacity: 0,
                display: 'block'
            });

            img.wrap('<span class="preloader" />');

            img.one("load", function(evt) {
                if (evt) {}
                $(this).delay(params.delay)
                    .css({ visibility: 'visible' })
                    .animate({ opacity: 1 }, params.transition, params.easing, function() {
                        $(this).unwrap('<span class="preloader" />')
                    })
            }).each(function() {
                if (this.complete)
                    $(this).trigger("load");
            });
        });
    },

    verticalMiddle: function() {
        if (this.$verticalMiddleEl.length > 0) {
            this.$verticalMiddleEl.each(function() {
                var elem = $(this),
                    verticalMiddleHeight = elem.outerHeight(),
                    headerHeight = this.$header.outerHeight;

                if (elem.parents('#slider').length > 0 && !elem.hasClass('ignore-header')) {
                    if (this.$header.hasClass('transparent-header') &&
                        (this.$body.hasClass('device-lg') || this.$body.hasClass('device-md'))) {
                        verticalMiddleHeight = verticalMiddleHeight - 70;

                        if (this.$slider.next('#header').length > 0) {
                            verticalMiddleHeight = verticalMiddleHeight + headerHeight;
                        }
                    }

                    if (this.$body.hasClass('device-xs') || this.$body.hasClass('device-xxs')) {
                        if (elem.parents('.full-screen').length && !elem.parents('.force-full-screen').length) {
                            elem.css({
                                position: 'relative',
                                top: '0',
                                width: 'auto',
                                marginTop: '0'
                            }).addClass('clearfix');
                        } else {
                            elem.css({
                                position: 'relative',
                                top: '50%',
                                width: 'auto',
                                marginTop: '0',
                                paddingTop: '60px',
                                paddingBottom: '60px'
                            }).addClass('clearfix');
                        }
                    } else {
                        elem.css({
                            position: 'absolute',
                            top: '50%',
                            width: '100%',
                            paddingTop: '0',
                            paddingBottom: '0',
                            marginTop: -(verticalMiddleHeight / 2) + 'px'
                        });
                    }
                } else {
                    elem.css({
                        position: 'absolute',
                        top: '50%',
                        width: '100%',
                        paddingTop: '0',
                        paddingBottom: '0',
                        marginTop: -(verticalMiddleHeight / 2) + 'px'
                    });
                }
            });
        }
    },

    stickyElements: function() {
        if (this.$siStickyEl.length > 0) {
            var siStickyHeight = this.$siStickyEl.outerHeight();
            this.$siStickyEl.css({
                marginTop: -(siStickyHeight / 2) + 'px'
            });
        }

        // this is simular to the menu toggle found in the quantum ui kit
        if (this.$dotsMenuEl.length() > 0) {
            var opmdStickyHeight = this.$dotsMenuEl.outerHeight();
            this.$dotsMenuEl.css({
                marginTop: -(opmdStickyHeight / 2) + 'px'
            });
        }
    },
    gotoTop: function() {
        var elemScrollSpeed = this.$gotoTopEl.attr('data-speed'),
            elemScrollEasing = this.$gotoTopEl.attr('data-easing');

        if (!elemScrollSpeed) {
            elemScrollSpeed = 700;
        }

        if (!elemScrollEasing) {
            elemScrollEasing = 'easeOutQuad';
        }

        this.$gotoTopEl.on('click', function() {
            $('body,html').stop(true).animate({
                'scrollTop': 0
            }, Number(elemScrollSpeed), elemScrollEasing);

            return false;
        });
    },

    gotoTopScroll: function() {
        var elemMobile = this.$gotoTopEl.attr('data-mobile'),
            elemOffset = this.$gotoTopEl.attr('data-offset');

        if (!elemOffset) {
            elemOffset = 450;
        }

        if (elemMobile !== 'true' && (this.$body.hasClass('device-xs') || this.$body.hasClass('device-xxs'))) {
            return true;
        }

        if (this.$window.scrollTop() > Number(elemOffset)) {
            this.$gotoTopEl.fadeIn();
        } else {
            this.$gotoTopEl.fadeOut();
        }
    },

    maxHeight: function() {
        if (this.$commonHeightEl.length > 0) {
            if (this.$commonHeightEl.hasClass('custom-js')) {
                return true;
            }

            this.$commonHeightEl.each(function() {
                var elem = $(this);

                if (elem.find('.common-height').length > 0) {
                    this.commonHeight(elem.find('.common-height:not(.custom-js'));
                }

                this.commonHeight(elem);
            });
        }
    },

    commonHeight: function(elem) {
        var maxHeight = 0;

        elem.children('[class*=col-]').each(function() {
            var elemChild = $(this).children();

            if (elemChild.hasClass('max-height')) {
                maxHeight = elemChild.outerHeight();
            } else {
                if (elemChild.outerHeight() > maxHeight) {
                    maxHeight = elemChild.outerHeight();
                }
            }
        });

        elem.children('[class&=col-]').each(function () {
            $(this).height(maxHeight);
        })
    },

    testimonialGrid: function() {
        if (this.$testimonialGridEl.length > 0) {
            if (this.$body.hasClass('device-sm') || this.$body.hasClass('device-md') || this.$body('device-lg')) {
                var maxHeight = 0;

                this.$testimonialGridEl.each(function() {
                    $(this).find('li > .testimonial').each(function() {
                        if ($(this).height() > maxHeight) {
                            maxHeight = $(this).height();
                        }
                    });

                    $(this).find('li').height(maxHeight);
                    maxHeight = 0;
                });
            } else {
                this.$testimonialGridEl.find("li").css({
                    'height': 'auto'
                });
            }
        }
    },

    lightbox: function() {
        if (!$.magnificPopup) {
            console.log('lightbox: Magnific Popup is not defined');
            return true;
        }

        var $lightboxImgEl = $('[data-lightbox="image"]'),
            $lightboxImgGalleryEl = $('[data-lightbox="gallery"]'),
            $lightboxIframeEl = $('[data-lightbox="iframe"]'),
            $lightboxInlineEl = $('[data-lightbox="inline"]'),
            $lightboxAjaxEl = $('[data-lightbox="ajax"]'),
            $lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]');

        if ($lightboxImgEl.length > 0) {
            $lightboxImgEl.magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,

                // class to remove default margin from left and right side
                mainClass: 'mfp-no-margins mfp-fade',
                image: {
                    verticalFit: true
                }
            });
        }

        if ($lightboxImgGalleryEl.length > 0) {
            $lightboxImgGalleryEl.each(function() {
                var elem = $(this);

                if (elem.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone')) {

                }
            })
        }

        if ($lightboxIframeEl.length > 0) {}

        if ($lightboxInlineEl.length > 0) {}

        if ($lightboxAjaxEl.length > 0) {
            $lightboxAjaxEl.magnificPopup({
                type: 'ajax',
                closeBtnInside: false,
                callbacks: {
                    ajaxContentAdded: function(mfpResponse) {
                        widget.loadFlexSlider();
                        this.resizeVideo();
                        widget.masonryThumbs();
                    },
                    open: function() {
                        this.$body.addClass('visible');
                    },
                    close: function() {
                        this.$body.removeClass('visible');
                    }
                }
            })
        }
        if ($lightboxAjaxGalleryEl.length > 0) {
            $lightboxAjaxGalleryEl.magnificPopup({
                delegate: 'a[data-lightbox="ajax-gallery-item"]',
                type: 'ajax',
                closeBtnInside: false,
                gallery: {
                    enabled: true,
                    preload: 0,
                    navigateByImgClick: false,
                },

                callbacks: {
                    ajaxContentAdded: function(mfpResponse) {
                        widget.loadFlexSlider();
                        this.resizeVideo();
                        widget.masonryThumbs();
                    },
                    open: function() {
                        this.$body.addClass('visible');
                    },
                    close: function() {
                        this.$body.removeClass('visible');
                    }
                }
            })
        }
    },

    resizeVideo: function() {}
};


ruik.init();