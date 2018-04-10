(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {

        $.fn.parallax = function(options) {
            var settings = $.extend({
                speed: 0.3
            }, options);
            var elements = $(this);
            $(document).on('scroll', function() {
                scrollCheck(elements, settings);
            });
            scrollCheck(elements, settings);
            return this;
        };


        var scrollCheck = function(elements, settings) {
            var window_height = $(window).height();
            var scroll_top = $(window).scrollTop();

            elements.each(function() {
                var element_offset = $(this).offset().top;
                var element_height = $(this).outerHeight();
                if(element_offset + element_height <= scroll_top || element_offset >= scroll_top + window_height) {
                    return;
                }
                var y_bg_position = Math.round((element_offset - scroll_top) * settings.speed);
                $(this).css('background-position', 'center ' + y_bg_position + 'px');
            });
        };
    }

}(jQuery));
