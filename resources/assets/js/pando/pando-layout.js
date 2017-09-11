(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        var body;
        var site_holder;
        var fixed_top_auto;

        $(document).ready(function() {
            body = $('body');
            site_holder = $('.site');
            if(site_holder.length === 0) {
                site_holder = body;
            }
            fixed_top_auto = $('.navbar.fixed-top.auto-padding');
            $('.btn-scroll-top').pandoOnClickScrollTop();
            fixedCheck();
        });

        $(window).on('load', function() {
            fixedCheck();
        }).on('scroll', function() {
            scrollCheck();
        });

        var fixedCheck = function() {
            if(typeof site_holder === 'undefined') {
                return;
            }
            if(fixed_top_auto.length > 0) {
                site_holder.css('padding-top', fixed_top_auto.outerHeight(true));
            }
        };

        var scrollCheck = function() {
            if(typeof body === 'undefined') {
                return;
            }
            var scroll_top = $(window).scrollTop();
            if(scroll_top > 5) {
                body.addClass('is-scrolled');
            } else {
                body.removeClass('is-scrolled');
            }
        };

        $.fn.pandoOnClickScrollTop = function() {
            $(this).on('click', function() {
                $('body').pandoScrollTo(0);
            });
        };

        $.fn.pandoScrollTo = function(offset, speed_divider) {
            if(typeof offset === 'undefined') {
                offset = 0;
            }
            if(typeof speed_divider === 'undefined') {
                speed_divider = 7;
            }
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
