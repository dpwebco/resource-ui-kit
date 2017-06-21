/**
 * Created by Darrell on 06/21/2017.
 */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },

    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },

    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },

    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },

    any: function() {
        return (this.Android || this.BlackBerry || this.iOS || this.Opera || this.Windows);
    }
};