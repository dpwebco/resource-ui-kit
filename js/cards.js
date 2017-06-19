/**
 * Created by Darrell on 06/17/2017.
 */
$(document).ready(function() {
    $(document).on('click.card', '.card', function(event) {
        if ($(this).find('> .card-reveal').length) {
            if ($(event.target).is($('.card-reveal .cart-title')) || $(event.target).is($('.card-reveal .card-title'))) {
                // make reveal animate down and display none
                $(this).find('.card-reveal').velocity({
                    translateY: 0,
                    duration: 225,
                    queue: false,
                    easing: 'easeInOutQuad',
                    complete: function() { $(this).css({
                            display: 'none'
                        })
                    }
                });
            } else if ($(event.target).is($('.card .activator')) ||
                    $(e.target).is($('.card-activator i'))) {
                $(e.target).closest('card').css('overflow', 'hidden');

                $(this).find('.card-reveal').css({
                    display: 'block'
                }).velocity("stop", false).velocity({
                    translateY: '-100%'
                }, {
                    duration: 300,
                    queue: false,
                    easing: 'easeInOutQuad' });
            }
        }
    });
}(jQuery));