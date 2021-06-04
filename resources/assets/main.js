import './sass/vendor.scss';
import './sass/main.scss';

import $ from 'jquery';
import toastr from 'toastr';

import 'bootstrap';

import './js/pando';

import './js/custom/main';
import './js/custom/font-awesome';

window.$ = $;

document.addEventListener('DOMContentLoaded', function () {
  if (typeof toastr !== 'undefined') {
    toastr.options = {
      'closeButton': true,
      'progressBar': true,
      'positionClass': 'toast-top-right',
    };
    window.toastr = toastr;
  }
});

if(typeof jQuery !== 'undefined') {
  // Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. (https://stackoverflow.com/questions/60357083/does-not-use-passive-listeners-to-improve-scrolling-performance-lighthouse-repo)
  jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
      this.addEventListener('touchstart', handle, { passive: !ns.includes('noPreventDefault') });
    },
  };
  jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
      this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') });
    },
  };
}
