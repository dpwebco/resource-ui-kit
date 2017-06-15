/**
 * Created by Darrell on 06/14/2017.
 */
var modal = {
    options: {
        isShown: null,
        transitionDuration: 300,
        ignoreBackdropClick: false,
        backdropTransitionDuration: 300
    },
    init: function() {
        this.checkBackdrop();
        this.cacheDom();
    },

    cacheDom: function() {
        this.$element = $('.modal');
        this.$body = $('body');
        this.$dialog = $('.modal-dialog');
    },

    toggle: function(_relativeTarget) {
        return this.options.isShown ? this.hide() : this.show(_relativeTarget);
    },

    hide: function() {},
    show: function(_relativeTarget) {
        var self = this,
            e = $.Event('show.ruik.modal', { relativeTarget: _relativeTarget });

        this.$element.trigger(e);

        this.options.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();

        this.$body.addClass('modal-open');

        this.escape();
        this.resize();

        this.$element.on('click.dismiss.ruik.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.ruik.modal', function() {
            self.$element.one('mouseup.dismiss.ruik.modal', function(e) {
                if ($(e.target).is(self.$element)) {
                    self.options.ignoreBackdropClick = true;
                }
            });
        });

        this.backdrop(function() {
            var transition = $.support.transition && self.$element.hasClass('fade');

            if (!self.$element.parent().length) {
                self.$element.appendTo(self.$body);
            }

            self.$element
                .show()
                .scrollTop(0);
            self.adjustDialog();

            if (transition) {
                // todo: figure out a way to refactor this code and get the same affect
                // self.$element[0].offsetWidth;
            }
        })
    },

    escape: function() {},
    resize: function() {},
    setScrollbar: function() {},
    checkScrollbar: function() {},
    adjustDialog: function() {},
};

modal.init();