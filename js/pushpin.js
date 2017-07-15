/**
 * Created by Darrell on 07/01/2017.
 */
$.fn.pushpin = function(options) {
    var defaults = {
        top: 0,
        bottom: Infinity,
        offset: 0
    };

    if (options === 'remove') {
        var id;
        this.each(function () {
            if (id = $(this).data('pushpin-id')) {
                $(window).off('scroll.' + id);
                $(this).removeData('pushpin-id').removeClass('pin-top pinned pin-bottom').removeAttr('style');
            }
        });

        return false;
    }

    options = $.extend(defaults, options);

    // var $index = 0;

    return this.each(function () {
        var $uniqueId = theme.guid(),
            $this = $(this),
            $originalOffset = $(this).offset().top;

        function removePinClasses(obj) {
            obj.removeClass('pin-top');
            obj.removeClass('pinned');
            obj.removeClass('pin-bottom');
        }

        function updateElems(objects, scrolled) {
            objects.each(function() {
                if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
                    removePinClasses($(this));
                    $(this).css('top', options.offset);
                    $(this).addClass('pinned');
                }

                if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
                    removePinClasses($(this));
                    $(this).addClass('pin-bottom');
                    $(this).css('top', options.bottom - $originalOffset);
                }
            });
        }

        $(this).data('pushpin-id', $uniqueId);

        updateElems($this, $(window).scrollTop());

        $(window).on('scroll.' + $uniqueId, function() {
            var $scrolled = $(window).scrollTop() + options.offset;

            updateElems($this, $scrolled);
        });
    });
};