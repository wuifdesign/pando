const pandoScrollCheck = () => {
  if (window.scrollY > 20) {
    document.body.classList.add('is-scrolled');
  } else {
    document.body.classList.remove('is-scrolled');
  }
};

const pandoFooterPush = () => {
  if (document.body.classList.contains('page-footer-bottom')) {
    let footer = document.querySelector('.page-footer');
    let footerPush = document.querySelector('.page-footer-push');
    if (!footerPush) {
      footerPush = document.createElement('div');
      footerPush.classList.add('page-footer-push');
      footer.parentNode.insertBefore(footerPush, footer);
    }
    footerPush.style.height = footer.offsetHeight + 'px';
  }
};

pandoScrollCheck();
pandoFooterPush();

window.addEventListener('scroll', () => {
  pandoScrollCheck();
}, { passive: true });

window.addEventListener('resize', () => {
  pandoFooterPush();
});

export {
  pandoFooterPush,
  pandoScrollCheck,
};
