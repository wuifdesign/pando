(function($) {
    'use strict';

    $(document).ready(function() {
        fixedCheck();
    });

    $(window).load(function() {
        fixedCheck();
    });

    var fixedCheck = function() {
        if($('body').hasClass('footer-fixed') || $('body').hasClass('footer-bottom')) {
            $('.footer-push').css('height', $('.footer').outerHeight(true));
        }
    }

}(jQuery));

