document.querySelectorAll('.code-hider a').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const code = button.parentNode.nextElementSibling;
    if(button.classList.contains('open')) {
      button.innerHTML = 'Show Code';
      button.classList.remove('open');
      code.style.display = 'none';
    } else {
      button.innerHTML = 'Hide Code';
      button.classList.add('open');
      code.style.display = 'block';
    }
  });
});
