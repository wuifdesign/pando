const pandoPhotoSwipe = (elements, options, selector) => {
  import(/* webpackChunkName: "photoswipe" */ './pando-photoswipe').then(({ default: photoSwipe }) => { // jshint ignore:line
    photoSwipe(elements, options, selector);
  });
};

window.pandoPhotoSwipe = pandoPhotoSwipe;

export {
  pandoPhotoSwipe,
};

