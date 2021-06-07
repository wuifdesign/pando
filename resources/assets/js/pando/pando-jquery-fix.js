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
