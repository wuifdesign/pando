(function ($) {
    'use strict';

    if(typeof $ !== 'undefined' && typeof $.magnificPopup !== 'undefined') {

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

    }

}(jQuery));