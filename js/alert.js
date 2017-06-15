/**
 * Created by Darrell on 06/14/2017.
 */

 function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};


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

var test = {
    init: function() {
        
    }
};

test.init();