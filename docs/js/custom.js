$(document).ready(function () {
    $('.code-hider a').click(function (event) {
        var code = $(this).parent().next();
        if($(this).hasClass('open')) {
            $(this).html('Show Code');
            $(this).removeClass('open');
            code.hide();
        } else {
            $(this).html('Hide Code');
            $(this).addClass('open');
            code.show();
        }
        event.preventDefault();
    });
})