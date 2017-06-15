/**
 * Created by Darrell on 06/14/2017.
 */
$(document).ready(function() {
    $('.close-btn').on('click', function() {
        $(this).parent().remove();
    });

    $('.sm-close-btn').on('click', function () {
        $(this).parent().parent().remove();
    })
});