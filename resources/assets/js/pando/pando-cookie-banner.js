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

    if(window.getCookie('cookies_accepted') === null) {
      banner.show();
      banner_spacer.show();
      try {
        setTimeout(function() {
          $.pandoFooterPush();
        }, 10);
      } catch(error) {}
    }

    close_button.on('click', function() {
      window.setCookie('cookies_accepted', new Date().toISOString(), 365);
      banner.hide();
      banner_spacer.hide();
      $.pandoFooterPush();
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