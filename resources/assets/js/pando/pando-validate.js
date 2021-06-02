import $ from 'jquery';

$.fn.pandoValidate = function (rules, lang, as_form_data) {
  if (typeof as_form_data === 'undefined') {
    as_form_data = false;
  }

  import(/* webpackChunkName: "jquery-validation" */ 'jquery-validation').then(({ default: $ }) => { // jshint ignore:line
    var $form = $(this);
    if ($form.length > 0) {
      var showSuccess = function () {
        $form.find('input').attr('disabled', 'disabled');
        $form.find('.form-hide-success').hide();
        $form.find('.form-show-success').show();
      };

      var showError = function () {
        $form.find('.form-show-error').show();
      };

      var getAllElementsByElement = function (element) {
        return $form.find('[name="' + $(element).attr('name') + '"]');
      };

      $form.validate({
        lang: lang,
        rules: rules,
        submitHandler: function (form, event) {
          event.preventDefault();
          $form.find('.form-show-error').hide();

          var formOptions = {};
          if (as_form_data) {
            formOptions = {
              type: $form.attr('method'),
              url: $form.attr('action'),
              data: new FormData($form.get(0)),
              dataType: false,
              cache: false,
              contentType: false,
              processData: false,
            };
          } else {
            formOptions = {
              type: $form.attr('method'),
              url: $form.attr('action'),
              data: $form.serialize(),
              dataType: 'json',
              cache: false,
            };
          }

          var submit_button = $form.find('button[type="submit"]');
          submit_button.addClass('disabled');

          $.ajax(formOptions).done(function (data) {
            submit_button.removeClass('disabled');
            if (data.success === true) {
              showSuccess();
            } else {
              showError();
            }
          }).fail(function () {
            submit_button.removeClass('disabled');
            showError();
          });
        },
        highlight: function (element) {
          getAllElementsByElement(element).addClass('is-invalid');
        },
        unhighlight: function (element) {
          getAllElementsByElement(element).removeClass('is-invalid');
        },
        errorElement: 'div',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
          if (element.attr('type') === 'radio') {
            getAllElementsByElement(element).last().closest('.form-check').append(error);
          } else if (element.attr('type') === 'checkbox') {
            element.closest('.form-check').append(error);
          } else {
            error.insertAfter(element);
          }
        },
      });
    }
  });
};

$(document).ready(function () {
  var getFormData = function (form) {
    var lang = form.data('lang');
    if (typeof lang === 'undefined') {
      lang = 'en';
    }
    var validator = form.data('validation');
    if (typeof validator === 'undefined') {
      validator = {};
    }
    return {
      lang: lang,
      validator: validator,
    };
  };

  $('.pando-ajax-form').each(function () {
    var data = getFormData($(this));
    $(this).pandoValidate(data.validator, data.lang);
  });

  $('.pando-ajax-file-form').each(function () {
    var data = getFormData($(this));
    $(this).pandoValidate(data.validator, data.lang, true);
  });
});
