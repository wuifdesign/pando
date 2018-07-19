(function($) {
  'use strict';

  $(document).ready(function() {
    var banner = $('.cookie-banner');
    var banner_spacer = $('.cookie-banner-spacer');
    var close_button = $('[data-dismiss="cookie-banner"]');

    if(banner_spacer.length === 0) {
      banner_spacer = $('<div class="cookie-banner-spacer"></div>');
      banner.after(banner_spacer);
    }

    if(window.getCookie('cookies_accepted') !== 'yes') {
      banner.show();
      banner_spacer.show();
    }

    close_button.on('click', function(event) {
      window.setCookie('cookies_accepted', 'yes', 365);
      banner.hide();
      banner_spacer.hide();
    });

    var setSpacerHeight = function() {
      banner_spacer.css('height', banner.outerHeight() + 'px');
    };

    $(window).resize(function() {
      setSpacerHeight();
    });

    setSpacerHeight();
  });

}(jQuery));
