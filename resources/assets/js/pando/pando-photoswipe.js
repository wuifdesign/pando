import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

const photoSwipeParseHash = function () {
  let hash = window.location.hash.substring(1);
  let params = {};
  if (hash.length < 5) {
    return params;
  }
  let vars = hash.split('&');
  for (let i = 0; i < vars.length; i++) {
    if (!vars[i]) {
      continue;
    }
    let pair = vars[i].split('=');
    if (pair.length < 2) {
      continue;
    }
    params[pair[0]] = pair[1];
  }
  if (params.gid) {
    params.gid = parseInt(params.gid, 10);
  }
  return params;
};

const getElementSize = function (element) {
  let size = [0, 0];
  if (element.dataset.size) {
    size = element.dataset.size.split('x');
  }
  return {
    w: parseInt(size[0], 10),
    h: parseInt(size[1], 10),
  };
};

const getImageItems = (element, selector) => {
  let items = [];
  element.querySelectorAll(selector).forEach((element) => {
    let href = element.getAttribute('href');
    let size = getElementSize(element);
    let item = {
      element,
      src: href,
      w: size.w,
      h: size.h,
    };
    let caption_element = element.closest('figure').querySelector('figcaption');
    if (caption_element) {
      item.title = caption_element.innerHTML;
    }
    let thumb_element = element.querySelector('img');
    if (thumb_element) {
      item.msrc = thumb_element.getAttribute('src');
    }
    items.push(item);
  });
  return items;
};

const openPhotoSwipe = function (items, index, galleryElement, clickElement, options) {
  let pswpElement = document.querySelector('.pswp');

  options = Object.assign({}, options, {
    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
    index: parseInt(index, 10),
    bgOpacity: 0.9,
    showHideOpacity: true,
    getThumbBoundsFn: (index) => {
      let thumbnail = galleryElement.querySelectorAll('a img')[index];
      let rect = thumbnail.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top + window.scrollY,
        w: rect.width,
        h: rect.height,
      };
    },
  });

  if (isNaN(options.index)) {
    return;
  }

  if (!clickElement) {
    options.showAnimationDuration = 0;
  } else {
    let size = getElementSize(clickElement);
    if (size.w < 1 || size.h < 1) {
      options.showAnimationDuration = 0;
    }
  }

  let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.listen('gettingData', function (index, item) {
    if (item.w < 1 || item.h < 1) {
      let img = new Image();
      img.onload = function () {
        item.w = this.width;
        item.h = this.height;
        let size_string = this.width + 'x' + this.height;
        item.element.setAttribute('data-size', size_string);
        item.element.dataset.size = size_string;
        gallery.invalidateCurrItems();
        gallery.updateSize(true);
      };
      img.src = item.src;
    }
  });
  gallery.init();
};

export default function (element, options, selector) {
  let hashData = photoSwipeParseHash();
  if (typeof options === 'undefined') {
    options = {};
  }
  if (typeof selector === 'undefined') {
    selector = 'a';
  }
  element.forEach((gallery, key) => {
    let gallery_id = key + 1;
    let items = getImageItems(gallery, selector);
    gallery.setAttribute('data-pswp-uid', gallery_id);
    gallery.querySelectorAll('a').forEach((element) => {
      element.addEventListener('click', (evt) => {
        evt.preventDefault();
        let key = Array.prototype.indexOf.call(gallery.querySelectorAll(selector), element);
        openPhotoSwipe(items, key, gallery, element, options);
        return false;
      });
    });
    if (hashData.pid && hashData.gid && parseInt(hashData.gid, 10) === gallery_id) {
      openPhotoSwipe(items, hashData.pid - 1, gallery, null, options);
    }
  });
};
