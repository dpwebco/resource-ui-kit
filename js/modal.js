/**
 * Created by Darrell on 06/19/2017.
 */
(function($) {
    var _stack = 0,
    _lastId = 0,
    _generateId = function() {
        _lastId++;
        return 'materialize-modal-overlay-' + _lastId
    };

    var methods = {
        init: function(options) {
            var defaults = {
                opacity: 0.5,
                inDuration: 350,
                outDuration: 250,
                ready: undefined,
                complete: undefined,
                dismissible: true,
                startingTop: '4%',
                endingTop: '10%'
            };

            options = $.extend(defaults, options);

            return this.each(function() {
                var $modal = $(this);
                var modalId = $(this).attr("id") || '#' + $(this).data('target');

                var closeModal = function() {
                    var overlayId = $modal.data('overlay-id');
                    var $overlay = $('#' + overlayId);
                    $modal.removeClass('open');

                    $('body').css({
                        overflow: '',
                        width: ''
                    });

                    $modal.find('.modal-close').off('click.close');
                    $(document).off('keyup.modal' + overlayId);

                    $overlay.velocity({ opacity: 0 }, {
                        duration: options.outDuration,
                        queue: false,
                        ease: "easeOutQuart"
                    });

                    var exitVelocityOptions = {
                        duration: options.outDuration,
                        queue: false,
                        ease: "easeOutCubic",
                        complete: function() {
                            $(this).css({ display: "none" });

                            if (typeof(options.complete) === "function") {
                                options.complete.call(this, $modal);
                            }

                            $overlay.remove();
                            _stack--;
                        }
                    };

                    if ($modal.hasClass('bottom-sheet')) {
                        $modal.velocity({
                            bottom: "-100%",
                            opacity: 0
                        }, exitVelocityOptions);
                    } else {
                        $modal.velocity({
                            top: options.startingTop,
                            opacity: 0,
                            scaleX: 0.7
                        }, exitVelocityOptions);
                    }
                };

                var openModal = function($trigger) {
                    var $body = $('body');
                    var oldWidth = $body.innerWidth();

                    $body.css('overflow', 'hidden');
                    $body.width(oldWidth);

                    if ($modal.hasClass('open')) {
                        return;
                    }

                    var overlayId = _generateId();
                    var $overlay = $('<div class="modal-overlay"></div>');
                    var lStack = (++_stack);

                    $overlay.attr('id', overlayId).css('z-index', 1000 + lStack * 2);
                    $modal.data('overlay-id', overlayId).css('z-index', 1000 + lStack * 2 + 1);
                    $modal.addClass('open');

                    $body.append($overlay);

                    if (options.dismissible) {
                        $overlay.click(function() {
                            closeModal();
                        });

                        $(document).on('keyup.modal' + overlayId, function(e) {
                            if (e.keydown === 27) {
                                closeModal();
                            }
                        });
                    }

                    $modal.find('.modal-close').on('click.close', function() {
                        closeModal();
                    });

                    $overlay.css({ display: "block", opacity: 0 });

                    $modal.css({
                        display: "block",
                        opacity: 0
                    });

                    $overlay.velocity({
                        opacity: options.opacity
                    }, {
                        duration: options.inDuration,
                        queue: false,
                        ease: "easeOutCubic"
                    });

                    $modal.data('associated-overlay', $overlay[0]);

                    var enterVelocityOptions = {
                        duration: options.inDuration,
                        queue: false,
                        ease: "easeOutCubic",

                        complete: function() {
                            if (typeof(options.ready) === "function") {
                                options.ready.call(this, $modal, $trigger)
                            }
                        }
                    };

                    if ($modal.hasClass('bottom-sheet')) {
                        $modal.velocity({
                            bottom: "0",
                            opacity: 1
                        }, enterVelocityOptions);
                    } else {
                        $.Velocity.hook($modal, "scaleX", 0.7);
                        $modal.css({
                            top: options.startingTop
                        });
                        $modal.velocity({
                            top: options.endingTop,
                            opacity: 1,
                            scaleX: '1'
                        }, enterVelocityOptions)
                    }
                };

                $(document).off('click.modalTrigger', 'a[href="#' + modalId +
                    '"], [data-trigger"' + modalId + '"]');
                $(this).off("openModal");
                $(this).off("closeModal");

                // close handlers
                $(document).on('click.modalTrigger', 'a[href="#' + modalId +
                    '"], [data-target="' + modalId + '"]', function (e) {
                    options.startingTop = ($(this).offset().top - $(window).scrollTop()) / 1.15;
                    openModal($(this));
                    e.preventDefault();
                });

                $(this).on('openModal', function() {
                    var modalId = $(this).attr('href') || '#' + $(this).data('target');
                    openModal(modalId);
                });

                $(this).on('closeModal', function() {
                    closeModal();
                });
            });
        },

        open: function() {
            $(this).trigger('openModal');
        },

        close: function() {
            $(this).trigger('closeModal');
        }
    };

    $.fn.modal = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + methodOrOptions + ' does not exists on jQuery.modal');
        }
    }
});