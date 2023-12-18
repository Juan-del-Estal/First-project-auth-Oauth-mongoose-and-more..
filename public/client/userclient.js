document.addEventListener('DOMContentLoaded', function() {
  const changePassword = document.getElementById('change-password');
  const changePasswordForm = document.getElementById('change-password-form');
  const deleteFormAccount = document.getElementById('form-delete-account');

  changePassword.addEventListener('click', function (event) {
    event.preventDefault();
    changePasswordForm.style.display = 'block';
  });

  changePasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailToChangePw = document.getElementById('emailToChangePw').value;
    const passwordToChange = document.getElementById('passwordToChange').value;
    const newPasswordChanged = document.getElementById('newPasswordChanged').value;
  
    fetch('/login/userpage/updatepw', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailToChangePw,
        oldPassword: passwordToChange,
        newPassword: newPasswordChanged
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the response data
    })
    .catch(error => {
      console.error('Error on the fetch', error);
    });
  });
  

  deleteFormAccount.addEventListener('submit', function (event) {
    event.preventDefault();
    const usernameToDelete = document.getElementById('usernameToDelete').value;
    const passwordToDelete = document.getElementById('passwordToDelete').value;

    // Realiza la validación del lado del cliente si es necesario
    const confirmed = confirm('¿Are you sure to eliminate your account?');
    if (confirmed) {
      fetch('/login/userpage/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameToDelete, password: passwordToDelete }),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar el éxito
          const resultParagraph = document.createElement('p');
          resultParagraph.textContent = data.message;

          const resultForm = document.getElementById('form-delete');
          resultForm.innerHTML = '';  // Limpiar contenido existente si es necesario
          resultForm.appendChild(resultParagraph);

          // Opcionalmente, redirigir u realizar otras acciones después de la eliminación exitosa
        })
        .catch(error => {
          // Manejar errores
          console.error('Error durante la eliminación de la cuenta:', error);

          // Mostrar un mensaje de error al usuario en el formulario
          const resultParagraph = document.createElement('p');
          resultParagraph.textContent = `Error: ${error.message}`;

          const resultForm = document.getElementById('form-delete');
          resultForm.innerHTML = '';  // Limpiar contenido existente si es necesario
          resultForm.appendChild(resultParagraph);
        });
    }
  });
});
