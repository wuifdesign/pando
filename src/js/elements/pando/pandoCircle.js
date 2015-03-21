(function($) {
    'use strict';

    $.fn.animateCircle = function(percent, customText) {
        $(this).attr('data-progress', percent)
        if(!isDefined(customText)) {
            $(this).find('> span').html(percent + '%');
        } else {
            $(this).find('> span').html(customText);
        }
    };

}(jQuery));

