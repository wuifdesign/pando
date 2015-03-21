(function($) {
    'use strict';

    /**
     * Default Options
     *
     * @type {{id: boolean, type: string, hideDelay: number, closeAble: boolean, closeButton: string, position: string}}
     */
    var defaultOptions = {
        'id': false,
        'type': 'primary',
        'hideDelay': 2500,
        'closeAble': true,
        'closeButton': '<i class="fa fa-times"></i>',
        'position': 'bottom-right'
    };

    /**
     * Change the Setting for all notifications
     *
     * @param options Options for the notifications
     */
    $.pandoNotifySetOptions = function(options) {

        $.extend(defaultOptions, options)

    }

    /**
     * Add a Notification
     *
     * @param html Html styled text to show
     * @param options Options for the notification
     */
    $.pandoNotify = function(html, options) {

        var settings = $.extend({}, defaultOptions, options);
        var posX = settings.position.split('-')[0];

        var holder = $('#pando-notify-' + settings.position);

        if(holder.length == 0) {
            holder = $('<div/>', {
                'id': 'pando-notify-' + settings.position,
                'class': 'notify-holder notify-' + settings.position
            }).appendTo('body');
        }

        var element = $('<div/>', {
            'class': 'animated notify notify-' + settings.type,
            'html': html
        }).prependTo(holder);
        element.data('pos', posX);

        if(posX == 'top') {
            element.addClass('fadeInDown');
        } else {
            element.addClass('fadeInUp');
        }

        if(settings.id) {
            var lastElement = $('#notify-' + settings.id);
            if(lastElement.length > 0) {
                lastElement.remove();
            }
            element.attr('id', 'notify-' + settings.id)
        }

        if(settings.hideDelay == false) {
            if(settings.closeAble == true) {
                element.addClass('notify-closable');
                var closeBtn = $('<button/>', {
                    'class': 'notify-close',
                    'html': settings.closeButton
                }).appendTo(element);

                closeBtn.click(function() {
                    hideElement(element);
                });
            }
        } else {
            setTimeout(function() {
                hideElement(element);
            }, settings.hideDelay);

        }
    };

    /**
     * Removes a specific or all Notifications
     *
     * @param notifyID If not set, all notification will be deleted
     */
    $.pandoNotifyRemove = function(notifyID) {

        if(isDefined(notifyID)) {
            hideElement($('#notify-' + notifyID));
        } else {
            hideElement($('.notify-holder .notify'));
        }

    };

    function hideElement(element) {

        if(element.data('pos') == 'top') {
            element.removeClass('fadeInDown');
            element.addClass('fadeOutUp');
        } else {
            element.removeClass('fadeInUp');
            element.addClass('fadeOutDown');
        }

        element.fadeOut(500, function(){
            $(this).remove();
        });
    }

}(jQuery));

