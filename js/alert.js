/**
 * Created by Darrell on 06/14/2017.
 */
// $(document).ready(function() {
//     $('.close-btn').on('click', function() {
//         $(this).parent().remove();
//     });
//
//     $('#alert-app-error').on('click', function () {
//         $(this).parent().remove();
//     });
//
//     $('#alert-announcement').on('click', function () {
//         $(this).parent().remove();
//     });
// });

var alert = {
    init: function () {
        this.cacheDom();
        this.handleEvents();
    },

    cacheDom: function() {
        this.closeBtn = $('.close-btn');
        this.alertAppError = $('#alert-app-error');
        this.alertAnnouncement = $('#alert-announcement');
    },

    handleEvents: function() {
        this.closeBtn.on('click', function() {
            $(this).parent().remove();
        });

        this.alertAppError.on('click', function() {
            $(this).parent.remove();
        });

        this.alertAnnouncement.on('click', function() {
            $(this).parent().remove();
        })
    }
};

alert.init();
