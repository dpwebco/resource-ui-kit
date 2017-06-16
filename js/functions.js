/**
 * Created by Darrell on 06/15/2017.
 */
var ruik = {
    init: function () {
        this.imgPreload();
        this.verticalMiddle();
        this.cacheDom();
        this.stickyElements();
        this.gotoTop();
        this.gotoTopScroll()
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
    cacheDom: function() {
        this.$body = $('body');
        this.$verticalMiddleEl = $('.vertical-middle');
        this.$header = $('#header');
        this.$slider = $('#slider');
        this.$dotsMenuEl = $('.dots-menu');
        this.$siStickyEl = $('.si-sticky');
        this.$gotoTopEl = $('.goto-top');
        this.$window = $('window');
    }
};

ruik.init();