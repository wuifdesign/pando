(function($) {
    'use strict';

    if(typeof $ !== 'undefined') {
        $(window).load(function() {
            equalize();
        });

        $(window).resize(function() {
            equalize();
        });

        $(document).ready(function() {
            equalize();
        });

        /**
         * Calculate all Equalizer Elements
         *
         * @param type Set to 'init' if first call
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
        }
    }

}(jQuery));
