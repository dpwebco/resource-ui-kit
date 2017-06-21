/**
 * Created by Darrell on 06/20/2017.
 */
(function($) {
    var defaults = {
        element: 'body',
        position: null,
        type: 'info',
        allow_dismiss: true,
        allow_duplicates: true,
        newest_on_top: false,
        showProgressBar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'close',
        template: '' +
            '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button>' +
                    '<i data-notify="icon" class="material-icons"></i>' +
                    '<span data-norify="title">{1}</span><span data-notify="message">{2}</span>' +
                    '<div class="progress" data-norify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemax="100" style="width: 0;"></div></div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a></div>'
    };


    function isDuplicateNotification(notification) {
        var isDupe = false;

        $('[data-notify="container"]').each(function(i, el) {
            var $el = $(el);
            var title = $el.find('[data-notify="title"]').text().trim();
            var message = $el.find('[data-notify="message"]').html().trim();

            var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
            var isSameMsg = message === ("<div>" + notification.settings.content.message + "</div>").html().trim();
            var isSameType = $el.hasClass('alert' + notification.settings.type);

            if (isSameTitle && isSameMsg && isSameType) {
                isDupe = true;
            }

            return !isDupe;
        });

        return isDupe;
    }

    function Notify(content, options) {
        var contentObj = {
            content: {
                message: typeof content === 'object' ? content.message : content,
                title: content.title ? content.title : '',
                icon: content.icon ? content.icon : '',
                url: content.url ? content.url : '#',
                target: content.target ? content.target : '-'
            }
        };
        options = $.extend(true, {}, contentObj, options);
        this.settings = $.extend(true, {}, defaults, options);
        this._default = defaults;

        if (this.settings.content.target === "-") {
            this.settings.content.target = this.settings.url_target;
        }

        this.animations = {
            start: 'webkitAnimationStart oanimationStart MSAnimationStart animationstart',
            end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
        };

        if (typeof this.settings.offset === 'number') {
            this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            };
        }

        if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
            this.init();
        }
    }

    $.extend(Notify.prototype, {
        init: function() {
            var self = this;
            this.buildNotify();

            if (this.settings.content.icon) {
                this.setIcon();
            }

            if (this.settings.content.url !== "#") {
                this.styleUrl();
            }

            this.styleDismiss();
            this.placement();
            this.bind();

            this.notify = {
                $elem: this.$elem,
                self: this,
                update: function(command, update) {
                    var commands = {};

                    if (typeof command === 'string') {
                        commands[command] = update;
                    } else {
                        commands = command;
                    }

                    for (var cmd in commands) {
                        switch (cmd) {
                        case "type":
                            self.$elem.removeClass('alert-' + self.settings.type);
                            self.$elem.find('[data-notify="progressbar"] > .progressbar')
                                .removeClass('progress-bar-' + self.settings.type);

                            self.settings.type = commands[cmd];

                            self.$elem.addClass('[alert-' + commands[cmd])
                                .find('[data-notify="progress-bar"] > .progress-bar')
                                .addClass('progress-bar-' + commands[cmd]);

                            break;

                        case "icon":
                            var $icon = self.$elem.find('data-notify="icon"]');

                            if (self.settings.icon_type.toLowerCase() === 'class') {
                                $icon.html(commands[cmd]);
                            } else {
                                if (!$icon.is('img')) {
                                    $icon.find('img');
                                }

                                $icon.attr('src', commands[cmd]);
                            }

                            break;

                        case "progress":
                            var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                            self.$elem.data('notify-delay', newDelay);
                            self.$elem.find('[data-notify="progressbar"] > div')
                                .attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                            break;

                        case "url":
                            self.$elem.find('[data-notify="url"]').attr('href', commands[cmd]);
                            break;

                        case "target":
                            self.$elem.find('[data-notify="url"]').attr('target', commands[cmd]);
                            break;

                        default:
                            self.$elem.find('[data-notify="' + cmd + '"]').html(commands[cmd]);

                        }
                    }

                    var posX = self.$elem.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
                    self.reposition(posX);
                },

                close: function() {
                    self.close();
                }
            }
        },
        buildNotify: function() {
            var content = this.settings.content;
            this.$elem = $(String.format(this.settings.template,
                this.settings.type, content.title, content.url, content.target));
            this.$elem.attr('data-notify-position', this.settings.placement.from + '-'
                + this.settings.placement.align);
            if (!this.settings.allow_dismiss) {
                this.$elem.find('[data-notify="dismiss"]').css('display', 'none');
            }

            if ((this.settings.delay <= 0 && !this.settings.showProgressBar) || !this.settings.showProgressBar) {
                this.$elem.find('[data-notify="progressbar"]').remove();
            }
        },

        setIcon: function() {
            this.$elem.addClass('alert-with-icon');

            if (this.settings.icon_type.toLowerCase() === 'class') {
                this.$elem.find('[data-notify="icon"]').html(this.settings.context.icon);
            } else {
                if (this.$elem.find('data-notify="icon"]').is('img')) {
                    this.$elem.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
                } else {
                    this.$elem.find('[data-notify="icon"]').append('<img src="' +
                        this.settings.content.icon + '" alt="Notify Icon />');
                }
            }
        },

        styleDismiss: function() {
            this.$elem.find('[data-notify="dismiss"]').css({
                position: 'absolute',
                right: '10px',
                top: '50%',
                marginTop: '-13px',
                zIndex: this.settings.z_index + 2
            });
        },

        styleUrl: function() {
            this.$elem.find('[data-notify="url"]').css({
                backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: this.settings.z_index + 1
            })
        },

        placement: function() {
            var self = this,
                offsetAmt = this.settings.offset.y,
                css = {
                    display: 'inline-block',
                    margin: '0 auto',
                    position: this.settings.position ? this.settings.position :
                        (this.settings.element === 'body' ? 'fixed' : 'absolute'),
                    transition: 'all 0.5s ease-in-out',
                    zIndex: this.settings.z_index
                },
                hasAnim = false,
                settings = this.settings;

            $('[data-notify-position="' + this.settings.placement.from + '-' +
                this.settings.placement.align + ']:not([data-closing="true"])').each(function() {
                offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) +
                    parseInt($(this).outerHeight()) + parseInt(settings.spacing));
            });

            if (this.settings.newest_on_top === true) {
                offsetAmt = this.settings.offset.y;
            }

            css[this.settings.placement.from] = offsetAmt + 'px';

            switch (this.settings.placement.align) {
            case "left":
            case "right":
                css[this.settings.placement.align] = this.settings.offset.x + 'px';
                break;

            case "center":
                css.left = 0;
                css.right = 0;

                break;
            }

            this.$elem.css(css).addClass(this.settings.animate.enter);

            $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function(index, prefix) {
                self.$elem[0].style[prefix + 'AnimationIterationCount'] = 1;
            });

            $(this.settings.elem).append(this.$elem);

            if (this.settings.newest_on_top === true) {
                offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$elem.outerWidth();
                this.reposition(offsetAmt);
            }

            if ($.isFunction(self.settings.onShow)) {
                self.settings.onShow.call(this.$elem);
            }

            this.$elem.one(this.animations.start, function() {
                hasAnim = true;
            }).one(this.animations.end, function() {
                if ($.isFunction(self.settings.onShow)) {
                    self.settings.onShow.call(this);
                }
            });

            setTimeout(function() {
                if (!hasAnim) {
                    if ($.isFunction(self.settings.onShow)) {
                        self.settings.onShow.call(this);
                    }
                }
            }, 600);
        },

        bind: function() {
            var self = this;

            self.$elem.find('[data-notify="dismiss"]').on('click', function() {
                self.close();
            });

            this.$elem.mousemove(function() {
                $(this).data('data-hover', "true");
            }).mouseout(function() {
                $(this).data('data-hover', "false");
            });

            this.$elem.data('data-hover', "false");

            if (this.settings.delay > 0) {
                self.$elem.data('notify-delay', self.settings.delay);

                var timer = setInterval(function() {
                    var delay = parseInt(self.$elem.data('notify-delay')) - self.settings.timer;

                    if ((self.$elem.data('data-hover') === 'false' && self.settings.mouse_over === "pause") ||
                        self.settings.mouse_over !== "pause") {
                        var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                        self.$elem.data('notify-delay', delay);
                        self.$elem.find('[data-notify=progressbar"] > div').attr('aria-valuenow', percent)
                            .css('width', percent + '%');
                    }

                    if (delay <= -(self.settings.timer)) {
                        clearInterval(timer);
                        self.close();
                    }
                }, self.settings.timer);
            }
        },

        close: function() {
            var self = this,
                posX = parseInt(this.$elem.css(this.settings.placement.from)),
                hasAnim = false;

            self.$elem.data('closing', 'true').addClass(this.settings.animate.exit);
            self.reposition(posX);

            if ($.isFunction(self.settings.onClose)) {
                self.settings.onClose.call(this.$elem);
            }

            self.$elem.one(this.animations.start, function() {
                hasAnim = true;
            }).one(this.animations.end, function() {
                $(this).remove();

                if ($.isFunction(self.settings.onClosed)) {
                    self.settings.onClosed.call(this);
                }
            });

            setTimeout(function() {
                if (!hasAnim) {
                    self.$elem.remove();

                    if (self.settings.onClosed) {
                        self.settings.onClosed(self.$elem);
                    }
                }
            }, 600);
        },

        reposition: function(posX) {
            var self = this,
                notifies = '[data-notify-position="' + this.settings.placement.from + '-' +
                    this.settings.placement.align + '"]:not([data-closing="true"])',
                $elems = this.$elem.nextAll(notifies);

            if (this.settings.newest_on_top === true) {
                $elems = this.$elem.prevAll(notifies)
            }

            $elems.each(function() {
                $(this).css(self.settings.placement.from, posX);
                posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
            });
        }
    });

    $.notify = function(content, options) {
        var plugin = new Notify(this, content, options);
        return plugin.notify;
    };

    $.notifyDefaults = function(options) {
        defaults = $.extend(true, {}, defaults, options);
        return defaults;
    };

    $.notifyClose = function(command) {
        if (typeof command === "undefined" || command === "all") {
            $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
        } else {
            $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
        }
    }
});