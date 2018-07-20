(function($) {
  'use strict';

  if(typeof $ !== 'undefined') {
    var body;
    var site_holder;
    var fixed_top_auto;

    $(document).ready(function() {
      body = $('body');
      site_holder = $('.site');
      if(site_holder.length === 0) {
        site_holder = body;
      }
      fixed_top_auto = $('.navbar.fixed-top.auto-padding');
      $('.btn-scroll-top').on('click', function() {
        $.pandoScrollTop();
      });
      $.pandoFixedCheck();
      $.pandoScrollCheck();
      $.pandoFooterPush();
    });

    $(window).on('load resize', function() {
      $.pandoFixedCheck();
      $.pandoFooterPush();
    }).on('scroll', function() {
      $.pandoScrollCheck();
    });

    $.pandoFooterPush = function() {
      if(body.hasClass('page-footer-bottom')) {
        var footer = $('.page-footer');
        var footer_push = $('.page-footer-push');
        if(footer_push.length === 0) {
          footer_push = $('<div class="page-footer-push"></div>');
          footer.before(footer_push);
        }
        var footer_push_height = footer.outerHeight(true);
        footer_push.css('height', footer_push_height);
        return footer_push_height;
      }
      return null;
    };

    $.pandoFixedCheck = function() {
      if(typeof site_holder === 'undefined') {
        return;
      }
      if(fixed_top_auto.length > 0) {
        site_holder.css('padding-top', fixed_top_auto.outerHeight(true));
      }
    };

    $.pandoScrollCheck = function() {
      if(typeof body === 'undefined') {
        return;
      }
      var scroll_top = $(window).scrollTop();
      if(scroll_top > 5) {
        body.addClass('is-scrolled');
      } else {
        body.removeClass('is-scrolled');
      }
    };

    $.pandoScrollTop = function() {
      $('body').pandoScrollTo(0);
    };

    $.fn.pandoScrollTo = function(offset, speed_divider) {
      if(typeof offset === 'undefined') {
        offset = 0;
      }
      if(typeof speed_divider === 'undefined') {
        speed_divider = 7;
      }
      var window_top = $(window).scrollTop();
      var element_top = $($(this).first()).offset().top - offset;
      var speed = (element_top - window_top) / speed_divider;
      if(window_top > element_top) {
        speed = (window_top - element_top) / speed_divider;
      }
      $('html, body').animate({scrollTop: element_top}, speed);
    };
  }

}(jQuery));
