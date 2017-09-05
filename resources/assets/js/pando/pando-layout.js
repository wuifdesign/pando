(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        var body;
        var fixedTop;
        var fixedTopAuto;

        $(document).ready(function() {
            body = $('body');
            fixedTop = $('.navbar.fixed-top');
            fixedTopAuto = $('.navbar.fixed-top.auto-padding');
            $('.btn-scroll-top').pandoOnClickScrollTop();
            fixedCheck();
        });

        $(window).on('load', function() {
            fixedCheck();
        });

        $(window).on('scroll', function() {
            scrollCheck();
        });

        var fixedCheck = function() {
            if(typeof body === 'undefined') { return; }
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

        $.fn.pandoOnClickScrollTop = function() {
            $(this).on('click', function() {
                $('body').pandoScrollTo(0);
            });
        };

        $.fn.pandoScrollTo = function(offset, speed_divider) {
            if(typeof offset === 'undefined') {offset = 0; }
            if(typeof speed_divider === 'undefined') { speed_divider = 7; }
            var window_top = $(window).scrollTop();
            var element_top = $($(this).first()).offset().top - offset;
            var speed = (element_top - window_top) / speed_divider;
            if(window_top > element_top) {
                speed = (window_top - element_top) / speed_divider;
            }
            $('html,body').animate({scrollTop: element_top}, speed);
        };
    } 

}(jQuery));
