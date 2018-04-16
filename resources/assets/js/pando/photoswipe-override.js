(function($) {
  'use strict';

  if(typeof $ !== 'undefined' && typeof PhotoSwipe !== 'undefined') {

    var photoSwipeParseHash = function() {
      var hash = window.location.hash.substring(1);
      var params = {};
      if(hash.length < 5) {
        return params;
      }
      var vars = hash.split('&');
      for(var i = 0; i < vars.length; i++) {
        if(!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if(pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if(params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };

    var getElementSize = function(element) {
      var size = [0, 0];
      if($(element).data('size').length > 0) {
        size = $(element).data('size').split('x');
      }
      return {
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };
    };

    var getImageItems = function(element, selector) {
      var items = [];
      $(element).find(selector).each(function() {
        var href = $(this).attr('href');
        var size = getElementSize(this);
        var item = {
          element: this,
          src: href,
          w: size.w,
          h: size.h
        };
        var caption_element = $(this).closest('figure').find('figcaption');
        if(caption_element.length > 0) {
          item.title = caption_element.html();
        }
        var thumb_element = $(this).find('img');
        if(thumb_element.length > 0) {
          item.msrc = thumb_element.attr('src');
        }
        items.push(item);
      });
      return items;
    };

    var openPhotoSwipe = function(items, index, galleryElement, click_element, options) {
      var pswpElement = $('.pswp').get(0);

      options = $.extend({}, options, {
        galleryUID: $(galleryElement).attr('data-pswp-uid'),
        index: parseInt(index, 10),
        bgOpacity: 0.9,
        showHideOpacity: true,
        getThumbBoundsFn: function(index) {
          var thumbnail = $(galleryElement).find('a img').get(index);
          var rect = thumbnail.getBoundingClientRect();
          return {
            x: rect.left,
            y: rect.top + $(window).scrollTop(),
            w: rect.width,
            h: rect.height
          };
        }
      });

      if(isNaN(options.index)) {
        return;
      }

      if(click_element === null) {
        options.showAnimationDuration = 0;
      } else {
        var size = getElementSize(click_element);
        if(size.w < 1 || size.h < 1) {
          options.showAnimationDuration = 0;
        }
      }

      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.listen('gettingData', function(index, item) {
        if(item.w < 1 || item.h < 1) {
          var img = new Image();
          img.onload = function() {
            item.w = this.width;
            item.h = this.height;
            var size_string = this.width + 'x' + this.height;
            $(item.element).attr('data-size', size_string).data('size', size_string);
            gallery.invalidateCurrItems();
            gallery.updateSize(true);
          };
          img.src = item.src;
        }
      });
      gallery.init();
    };

    $.fn.photoSwipe = function(options, selector) {
      var hashData = photoSwipeParseHash();
      if(typeof options === 'undefined') {
        options = {};
      }
      if(typeof selector === 'undefined') {
        selector = 'a';
      }
      this.each(function(key) {
        var gallery = this;
        var gallery_id = key + 1;
        var items = getImageItems(gallery, selector);
        $(gallery).attr('data-pswp-uid', gallery_id);
        $(gallery).find('a').on('click', function(evt) {
          evt.preventDefault();
          var key = $(gallery).find(selector).index(this);
          openPhotoSwipe(items, key, gallery, this, options);
          return false;
        });
        if(hashData.pid && hashData.gid && parseInt(hashData.gid, 10) === gallery_id) {
          openPhotoSwipe(items, hashData.pid - 1, gallery, null, options);
        }
      });
    };
  }

}(jQuery));
