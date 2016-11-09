(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        var body;
        var fixedTop;
        var fixedTopAuto;

        $(document).ready(function() {
            body = $('body');
            fixedTop = $('.navbar-fixed-top');
            fixedTopAuto = $('.navbar-fixed-top.auto-padding');
            $('.btn-scroll-top').pandoScrollTop();
            fixedCheck();
        });

        $(window).load(function() {
            fixedCheck();
        });

        $(window).scroll(function() {
            scrollCheck();
        });

        var fixedCheck = function() {
            if(body.hasClass('footer-fixed') || body.hasClass('footer-bottom')) {
                $('.footer-push').css('height', $('.footer').outerHeight(true));
            }
            if(fixedTopAuto.length > 0) {
                body.css('padding-top', fixedTopAuto.outerHeight(true));
            }
        };

        var scrollCheck = function() {
            if(typeof body === 'undefined') {
                return;
            }
            var scrollTop = $(window).scrollTop();

            if(scrollTop > 5) {
                body.addClass('is-scrolled');
            } else {
                body.removeClass('is-scrolled');
            }

            if(fixedTop.length > 0) {
                if(scrollTop > 5) {
                    fixedTop.addClass('is-scrolled');
                } else {
                    fixedTop.removeClass('is-scrolled');
                }
            }
        };

        $.fn.pandoScrollTop = function() {
            $(this).click(function() {
                var scrollTop = $(window).scrollTop();
                $('html,body').animate({scrollTop: 0}, scrollTop / 10);
            });
        };
    }

}(jQuery));