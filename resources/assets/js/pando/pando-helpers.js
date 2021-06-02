const strShorten = function (text, maxLength) {
  var ret = text;
  if (ret.length > maxLength) {
    ret = ret.substr(0, maxLength - 3) + '&hellip;';
  }
  return ret;
};

export {
  strShorten,
};
