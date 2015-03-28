/*! Wrap Bootstrap CSS with additional functions - v0.1.0
* 2015-03-28
* https://github.com/wuifdesign/pando
* Copyright (c) 2015 - Michael Wohlfahrter 
*/ 


document.addEventListener("DOMContentLoaded", function(event) {
    if(isDefined(AniJS)) {
        AniJS.run();
    }
    if(isDefined(toastr)) {
        toastr.options = {
            'closeButton': true,
            'progressBar': true,
            'positionClass': 'toast-top-right'
        };
    }
});


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

(function ($) {
    'use strict';

    if(isDefined($) && isDefined($.magnificPopup)) {
        /**
         * Override for the magnificPopup open dialog
         *
         * @param data
         */
        $.magnificPopup.instance.open = function (data) {
            if(data.type == 'inline') {
                data.removalDelay = 300;
                data.mainClass ='pando-overlay-zoom-in';
            }
            var scrollBarWidth = $.magnificPopup.instance._getScrollbarSize();
            $('.navbar-fixed-top').css('padding-right', scrollBarWidth + 'px');
            $('.footer-fixed .footer').css('padding-right', scrollBarWidth + 'px');
            $.magnificPopup.proto.open.call(this, data);
        };

        /**
         * Override for the magnificPopup close dialog
         *
         * @param data
         */
        $.magnificPopup.instance.close = function () {
            var removalDelay = $.magnificPopup.instance.st.removalDelay;
            if(removalDelay) {
                setTimeout(function() {
                    $('.navbar-fixed-top').css('padding-right', '');
                    $('.footer-fixed .footer').css('padding-right', '');
                }, removalDelay);
            } else {
                $('.navbar-fixed-top').css('padding-right', '');
                $('.footer-fixed .footer').css('padding-right', '');
            }
            $.magnificPopup.proto.close.call(this);
        };
    };

}(jQuery));;

(function($) {
    'use strict';

    if(isDefined($)) {
        $.fn.animateCircle = function(percent, customText) {
            $(this).attr('data-progress', percent)
            if(!isDefined(customText)) {
                $(this).find('> span').html(percent + '%');
            } else {
                $(this).find('> span').html(customText);
            }
        };
    }

}(jQuery));

;

(function($) {
    'use strict';

    if(isDefined($)) {
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

;

(function($) {
    'use strict';

    if(isDefined($)) {
        $(document).ready(function() {
            fixedCheck();
        });

        $(window).load(function() {
            fixedCheck();
        });

        var fixedCheck = function() {
            var body = $('body');
            var fixedTop = $('.navbar-fixed-top');

            if(body.hasClass('footer-fixed') || body.hasClass('footer-bottom')) {
                $('.footer-push').css('height', $('.footer').outerHeight(true));
            }
            if(fixedTop.length > 0) {
                body.css('padding-top', fixedTop.outerHeight(true));
            }
        }
    }

}(jQuery));

;

(function($) {
    'use strict';

    if(isDefined($)) {
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
        }
    }

}(jQuery));

;

(function($) {
    'use strict';

    if(isDefined($)) {
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
        }
    }

}(jQuery));

