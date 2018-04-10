(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        $(window).on('load', function() {
            equalize();
        });

        $(window).on('resize', function() {
            equalize();
        });

        $(document).ready(function() {
            equalize();
        });

        /**
         * Calculate all Equalizer Elements
         */
        $.pandoEqualizer = function() {
            equalize();
        };

        /**
         * Run the Equalize
         */
        var equalize = function() {
            $('[data-equalizer]').each(function() {
                var target = $(this).attr('data-equalizer');
                var elements = $(this).find('[data-equalizer-element="' + target + '"]');
                elements.css('height', '');

                var height = 0;
                elements.each(function() {
                    height = Math.max(height, $(this).outerHeight());
                });

                elements.outerHeight(height);
            });
        };
    }

}(jQuery));
