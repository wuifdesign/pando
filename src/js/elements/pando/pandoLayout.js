(function($) {
    'use strict';

    $(document).ready(function() {
        fixedCheck();
    });

    $(window).load(function() {
        fixedCheck();
    });

    var fixedCheck = function() {
        var body = $('body');
        var fixedTop = $('.navbar-fixed-top');

        if(body.hasClass('footer-fixed') || body.hasClass('footer-bottom')) {
            $('.footer-push').css('height', $('.footer').outerHeight(true));
        }
        if(fixedTop.length > 0) {
            body.css('padding-top', fixedTop.outerHeight(true));
        }
    }

}(jQuery));

