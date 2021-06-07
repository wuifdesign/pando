const showFormSuccess = (form) => {
  form.querySelectorAll('.form-hide-success').forEach((item) => {
    item.style.display = 'none';
  });
  form.querySelectorAll('.form-show-success').forEach((item) => {
    item.style.display = 'block';
  });
};

const showFormError = (form) => {
  form.querySelectorAll('.form-show-error').forEach((item) => {
    item.style.display = 'block';
  });
};

const initForm = (form) => {
  const submitButtons = form.querySelectorAll('button[type="submit"]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');

    if (form.checkValidity()) {
      for (const submitButton of submitButtons) {
        submitButton.classList.add('disabled');
      }
      const data = new FormData(form);
      const method = (form.getAttribute('method') || 'POST').toUpperCase();
      let url = form.getAttribute('action');
      const options = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      };

      if (method === 'GET') {
        url += '?' + new window.URLSearchParams(data).toString();
      } else {
        options.body = JSON.stringify(data); // body data type must match "Content-Type" header
      }

      fetch(url, options).then((response) => {
        for (const submitButton of submitButtons) {
          submitButton.classList.remove('disabled');
        }
        response.json().then((data) => {
          if (data.success) {
            showFormSuccess(form);
            form.dispatchEvent(new CustomEvent('form-sent', { detail: data }));
          } else {
            showFormError(form);
          }
        }).catch(() => {
          showFormError(form);
        });
      }).catch(() => {
        for (const submitButton of submitButtons) {
          submitButton.classList.remove('disabled');
        }
        showFormError(form);
      });
    }
  }, false);
};

const initFormValidation = (selector) => {
  const forms = document.querySelectorAll(selector);
  for (const form of forms) {
    initForm(form);
  }
};

export {
  initFormValidation,
};
