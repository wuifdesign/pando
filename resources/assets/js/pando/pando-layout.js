(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        $(document).ready(function() {
            fixedCheck();
        });

        $(window).load(function() {
            fixedCheck();
        });

        $(window).scroll(function() {
            scrollCheck();
        });

        var fixedCheck = function() {
            var body = $('body');
            var fixedTop = $('.navbar-fixed-top.auto-padding');

            if(body.hasClass('footer-fixed') || body.hasClass('footer-bottom')) {
                $('.footer-push').css('height', $('.footer').outerHeight(true));
            }
            if(fixedTop.length > 0) {
                body.css('padding-top', fixedTop.outerHeight(true));
            }
        };

        var scrollCheck = function() {
            var fixedTop = $('.navbar-fixed-top');

            if(fixedTop.length > 0) {
                var scrollTop = $(window).scrollTop();
                console.log(scrollTop);
                if(scrollTop > 5) {
                    fixedTop.addClass('is-scrolled');
                } else {
                    fixedTop.removeClass('is-scrolled');
                }
            }
        }
    }

}(jQuery));

