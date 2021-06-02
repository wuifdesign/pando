import $ from 'jquery';

const initSlickSliders = () => {
  const slider = $('.slick-slider');
  if (slider.length) {
    import(/* webpackChunkName: "slick-carousel" */ 'slick-carousel').then(() => { // jshint ignore:line
      slider.slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      });
    });
  }
};

initSlickSliders();
