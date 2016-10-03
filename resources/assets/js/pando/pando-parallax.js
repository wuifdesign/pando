(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        $.fn.parallax = function(options) {
            var settings = $.extend({
                speed: 0.3
            }, options);

            return this.each(function() {
                var element = $(this);
                $(document).scroll(function() {
                    scrollCheck(element, settings);
                });
                scrollCheck(element, settings);
            });
        };

        var scrollCheck = function(element, settings) {
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var offset = element.offset().top;
            var height = element.outerHeight();

            if(offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                return;
            }

            var yBgPosition = Math.round((offset - scrollTop) * settings.speed);
            element.css('background-position', 'center ' + yBgPosition + 'px');
        };
    }

}(jQuery));