const parallax = function (element, options = {}) {
  const settings = Object.assign({ speed: 0.3 }, options);
  document.addEventListener('scroll', function () {
    scrollCheck(element, settings);
  });
  scrollCheck(element, settings);
  return this;
};

const scrollCheck = function (element, settings) {
  const window_height = window.innerHeight;
  const scrollTop = window.scrollTop;

  const elementOffset = element.top + window.scrollY;
  const elementHeight = element.offsetHeight;
  if (elementOffset + elementHeight <= scrollTop || elementOffset >= scrollTop + window_height) {
    return;
  }
  const yBbPosition = Math.round((elementOffset - scrollTop) * settings.speed);
  element.style.backgroundPosition = 'center ' + yBbPosition + 'px';
};

window.parallax = parallax;

export {
  parallax,
};
