const setCookie = function (cookie_name, cookie_value, expiry_days) {
  const expiry_date = new Date();
  expiry_date.setTime(expiry_date.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + expiry_date.toUTCString();
  document.cookie = cookie_name + '=' + cookie_value + '; ' + expires + ';path=/';
};

const getCookie = function (cookie_name) {
  const name = cookie_name + '=';
  const cookie_parts = document.cookie.split(';');
  for (let i = 0; i < cookie_parts.length; i++) {
    let cookie = cookie_parts[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export {
  setCookie,
  getCookie,
};
