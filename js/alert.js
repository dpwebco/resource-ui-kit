/**
 * Created by Darrell on 06/14/2017.
 */
$(document).ready(function() {
    $('.close-btn').on('click', function() {
        $(this).parent().remove();
    });

    $('#alert-app-error').on('click', function () {
        $(this).parent().remove();
    });

    $('#alert-announcement').on('click', function () {
        $(this).parent().remove();
    });
});