/**
 * Run the Equalize
 */
const equalize = (attributeName = 'data-equalizer', styleProperty = 'height') => {
  document.querySelectorAll('[' + attributeName + ']').forEach((element) => {
    const target = element.getAttribute(attributeName);
    const elements = element.querySelectorAll('[data-equalizer-element="' + target + '"]');

    let height = 0;
    elements.forEach((item) => {
      item.style[styleProperty] = null;
    });

    elements.forEach((item) => {
      height = Math.max(height, item.offsetHeight);
    });

    elements.forEach((item) => {
      item.style[styleProperty] = height + 'px';
    });
  });
};

/**
 * Calculate all Equalizer Elements
 */
const pandoEqualizer = () => {
  equalize('data-equalizer', 'height');
  equalize('data-equalizer-min', 'minHeight');
};

window.addEventListener('load', function () {
  pandoEqualizer();
});

window.addEventListener('resize', function () {
  pandoEqualizer();
});

pandoEqualizer();

export {
  pandoEqualizer,
};
