import './pando-cookie-banner.js';
import './pando-equalizer.js';
import './pando-layout.js';
import './pando-util.js';
import { initFormValidation } from './pando-validate';
import { parallax } from './pando-parallax';

initFormValidation('.pando-ajax-form');

const parallaxItems = document.querySelectorAll('.parallax');
for(const parallaxItem of parallaxItems) {
  parallax(parallaxItem);
}
