(function($) {
    'use strict';

    /**
     * Set the 'animated' class for an element
     *
     * @param show
     */
    $.fn.pandoAnimate = function(show) {
        if(!isDefined(show)) {
            show = !$(this).hasClass('animated');
        }
        if(show) {
            $(this).addClass('animated');
            $(this).addPandoAnimationClass();
        } else {
            $(this).removeClass('animated');
            $(this).removePandorAnimationClass();
        }
    };

    $.fn.addPandoAnimationClass = function() {
        if(isDefined($(this).data('animation'))) {
            $(this).addClass($(this).data('animation'));
        } else {
            $(this).addClass('fadeIn');
        }
    };

    $.fn.removePandoAnimationClass = function() {
        if(isDefined($(this).data('animation'))) {
            $(this).removeClass($(this).data('animation'));
        } else {
            $(this).removeClass('fadeIn');
        }
    };

    var scrollAnimations = function() {
        $('.pando-animation-auto').each(function() {
            if(!$(this).hasClass('animated')) {
                var documentBottom = $(window).scrollTop() + $(window).height();
                var elementTop = $(this).offset().top + ($(this).height() / 2);

                if(elementTop <= documentBottom) {
                    $(this).addClass('animated');
                    $(this).addPandoAnimationClass();
                }
            }
        });

        $('[data-counter-animation]').each(function() {
            if(!isDefined($(this).data('data-animated'))) {
                var documentBottom = $(window).scrollTop() + $(window).height();
                var elementTop = $(this).offset().top + ($(this).height() / 2);

                if(elementTop <= documentBottom) {
                    var element = $(this).find('[data-counter-animation-element]');
                    var targetValue = $(this).data('counter-value');
                    var currentValue = $(this).data('counter-current-value');
                    var currentDirection = 'up';

                    if(!isDefined(currentValue)) {
                        currentValue = 0;
                        $(this).data('counter-current-value', 0)
                    }

                    if(targetValue < currentValue) {
                        currentDirection = 'down';
                    }

                    $(this).data('data-animated', 'true')
                    getCountAnimationValue(targetValue, currentValue, element, currentDirection);
                }
            }
        });
    };

    $(window).scroll(function() {
        scrollAnimations();
    });

    var getCountAnimationValue = function(targetValue, currentValue, element, currentDirection) {
        element.html(currentValue);
        setTimeout(function() {
            if(currentDirection == 'up') {
                if(targetValue > currentValue) {
                    getCountAnimationValue(targetValue, currentValue + 1, element, currentDirection);
                }
            } else {
                if(targetValue < currentValue) {
                    getCountAnimationValue(targetValue, currentValue - 1, element, currentDirection);
                }
            }
        }, 10);
    };

}(jQuery));

