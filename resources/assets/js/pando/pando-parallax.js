const parallax = function (element, options = {}) {
  const settings = Object.assign({ speed: 0.3 }, options);

  document.addEventListener('scroll', () => {
    scrollCheck(element, settings);
  });
  scrollCheck(element, settings);
  return this;
};

const scrollCheck = function (element, settings) {
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  const elementOffset = element.getBoundingClientRect().top + scrollTop;
  const elementHeight = element.offsetHeight;

  if (elementOffset + elementHeight <= scrollTop || elementOffset >= scrollTop + windowHeight) {
    return;
  }
  const yBbPosition = Math.round((elementOffset - scrollTop) * settings.speed);
  element.style.backgroundPosition = 'center ' + yBbPosition + 'px';
};

window.parallax = parallax;

export {
  parallax,
};
