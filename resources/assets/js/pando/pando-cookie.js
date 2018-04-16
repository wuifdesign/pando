(function() {
  'use strict';

  var setCookie = function(cookie_name, cookie_value, expiry_days) {
    var expiry_date = new Date();
    expiry_date.setTime(expiry_date.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + expiry_date.toUTCString();
    document.cookie = cookie_name + '=' + cookie_value + '; ' + expires + ';path=/';
  };

  var getCookie = function(cookie_name) {
    var name = cookie_name + '=';
    var cookie_parts = document.cookie.split(';');
    for(var i = 0; i < cookie_parts.length; i++) {
      var cookie = cookie_parts[i];
      while(cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if(cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  window.setCookie = setCookie;
  window.getCookie = getCookie;

}());
