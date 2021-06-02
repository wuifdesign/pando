import { getCookie, setCookie } from './pando-cookie';
import { pandoFooterPush } from './pando-layout';

const banner = document.querySelector('.cookie-banner');
let bannerSpacer = document.querySelector('.cookie-banner-spacer');
const closeButtons = document.querySelectorAll('[data-dismiss="cookie-banner"]');

if (banner) {
  if (!bannerSpacer) {
    bannerSpacer = document.createElement('div');
    bannerSpacer.classList.add('cookie-banner-spacer');
    banner.parentNode.insertBefore(bannerSpacer, banner);
  }

  if (getCookie('cookies_accepted') === null) {
    banner.style.display = 'block';
    bannerSpacer.style.display = 'block';
    try {
      setTimeout(function () {
        pandoFooterPush();
      }, 10);
    } catch (error) {
    }
  }

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
      setCookie('cookies_accepted', new Date().toISOString(), 365);
      banner.style.display = 'none';
      bannerSpacer.style.display = 'none';
      pandoFooterPush();
    });
  });

  const setSpacerHeight = function () {
    bannerSpacer.style.height = banner.offsetHeight + 'px';
  };

  window.addEventListener('resize', function () {
    setSpacerHeight();
  });

  setSpacerHeight();
}
