function isDefined(variable) {
    if(typeof variable === 'undefined') {
        return false;
    }
    return true;
}

function str_shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0, maxLength-3) + '&hellip;';
    }
    return ret;
}

