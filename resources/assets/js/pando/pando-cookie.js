const setCookie = function (cookieName, cookieValue, expiryDays) {
  const expiry_date = new Date();
  expiry_date.setTime(expiry_date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + expiry_date.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + '; ' + expires + ';path=/';
};

const getCookie = function (cookieName) {
  const name = cookieName + '=';
  const cookieParts = document.cookie.split(';');
  for (let i = 0; i < cookieParts.length; i++) {
    let cookie = cookieParts[i];
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
