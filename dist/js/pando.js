/*! Wrap Bootstrap CSS with additional functions - v0.0.1
* 2015-03-21
* https://github.com/wuifdesign/pando
* Copyright (c) 2015 - Michael Wohlfahrter 
*/ 

function isDefined(variable) {
    if(typeof variable === 'undefined') {
        return false;
    }
    return true;
}

function str_shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0, maxLength-3) + '&hellip;';
    }
    return ret;
}

;

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

;

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

;

(function($) {
    'use strict';

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

}(jQuery));

;

(function($) {
    'use strict';

    $(document).ready(function() {
        fixedCheck();
    });

    $(window).load(function() {
        fixedCheck();
    });

    var fixedCheck = function() {
        if($('body').hasClass('footer-fixed') || $('body').hasClass('footer-bottom')) {
            $('.footer-push').css('height', $('.footer').outerHeight(true));
        }
    }

}(jQuery));

;

(function($) {
    'use strict';

    /**
     * Default Options
     *
     * @type {{id: boolean, type: string, hideDelay: number, closeAble: boolean, closeButton: string, position: string}}
     */
    var defaultOptions = {
        'id': false,
        'type': 'primary',
        'hideDelay': 2500,
        'closeAble': true,
        'closeButton': '<i class="fa fa-times"></i>',
        'position': 'bottom-right'
    };

    /**
     * Change the Setting for all notifications
     *
     * @param options Options for the notifications
     */
    $.pandoNotifySetOptions = function(options) {

        $.extend(defaultOptions, options)

    }

    /**
     * Add a Notification
     *
     * @param html Html styled text to show
     * @param options Options for the notification
     */
    $.pandoNotify = function(html, options) {

        var settings = $.extend({}, defaultOptions, options);
        var posX = settings.position.split('-')[0];

        var holder = $('#pando-notify-' + settings.position);

        if(holder.length == 0) {
            holder = $('<div/>', {
                'id': 'pando-notify-' + settings.position,
                'class': 'notify-holder notify-' + settings.position
            }).appendTo('body');
        }

        var element = $('<div/>', {
            'class': 'animated notify notify-' + settings.type,
            'html': html
        }).prependTo(holder);
        element.data('pos', posX);

        if(posX == 'top') {
            element.addClass('fadeInDown');
        } else {
            element.addClass('fadeInUp');
        }

        if(settings.id) {
            var lastElement = $('#notify-' + settings.id);
            if(lastElement.length > 0) {
                lastElement.remove();
            }
            element.attr('id', 'notify-' + settings.id)
        }

        if(settings.hideDelay == false) {
            if(settings.closeAble == true) {
                element.addClass('notify-closable');
                var closeBtn = $('<button/>', {
                    'class': 'notify-close',
                    'html': settings.closeButton
                }).appendTo(element);

                closeBtn.click(function() {
                    hideElement(element);
                });
            }
        } else {
            setTimeout(function() {
                hideElement(element);
            }, settings.hideDelay);

        }
    };

    /**
     * Removes a specific or all Notifications
     *
     * @param notifyID If not set, all notification will be deleted
     */
    $.pandoNotifyRemove = function(notifyID) {

        if(isDefined(notifyID)) {
            hideElement($('#notify-' + notifyID));
        } else {
            hideElement($('.notify-holder .notify'));
        }

    };

    function hideElement(element) {

        if(element.data('pos') == 'top') {
            element.removeClass('fadeInDown');
            element.addClass('fadeOutUp');
        } else {
            element.removeClass('fadeInUp');
            element.addClass('fadeOutDown');
        }

        element.fadeOut(500, function(){
            $(this).remove();
        });
    }

}(jQuery));

;

(function($) {
    'use strict';

    $.fn.parallax = function(options) {
        var settings = $.extend({
            speed: 0.3
        }, options);

        return this.each( function() {
            var element = $(this);
            $(document).scroll(function(){
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

        if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
            return;
        }

        var yBgPosition = Math.round((offset - scrollTop) * settings.speed);
        element.css('background-position', 'center ' + yBgPosition + 'px');
    };

}(jQuery));

;

(function($) {
    'use strict';

    /**
     * Shake an Element
     *
     * @param distance Distance in px to shake
     * @param runs How many times it shakes
     * @param speed Speed of the shake
     * @param distanceReduce Reduction of the distance for each following shake
     */
    $.fn.pandoShake = function(distance, runs, speed, distanceReduce) {
        var _distance = 10;
        var _speed = 100;
        var _runs = 3;
        var _distanceReduce = 0;

        if(isDefined(distance)) { _distance = distance; }
        if(isDefined(runs)) { _runs = runs; }
        if(isDefined(speed)) { _speed = speed; }
        if(isDefined(distanceReduce)) { _distanceReduce = distanceReduce; }

        var position = this.css('position');

        if(position == 'static') {
            this.css('position', 'relative');
        }

        for (var i = 0; i <= _runs; ++i) {
            if(i == 0) {
                this.animate({ left: '-' + _distance + 'px' }, _speed / 2).animate({ left: _distance + 'px' }, _speed);
            } else if (i == _runs) {
                this.animate({ left: '0px' }, _speed / 2, function() {
                    $(this).css('position', '').css('left', '');
                });
            } else {
                this.animate({ left: '-' + _distance + 'px' }, _speed).animate({ left: _distance + 'px' }, _speed);
            }
            _distance -= _distanceReduce;
        }
    };

}(jQuery));

