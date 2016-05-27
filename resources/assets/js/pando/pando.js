(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        if(typeof AniJS !== 'undefined') {
            AniJS.run();
        }
        if(typeof toastr !== 'undefined') {
            toastr.options = {
                'closeButton': true,
                'progressBar': true,
                'positionClass': 'toast-top-right'
            };
        }
    });

    window.isDefined = function(variable) {
        return (typeof variable !== 'undefined');
    };

    window.str_shorten = function(text, maxLength) {
        var ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0, maxLength-3) + '&hellip;';
        }
        return ret;
    }

}());


