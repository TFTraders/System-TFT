function recoverPassword(e) {
  e.preventDefault();
  const email = document.getElementById('email-recover').value;
  if (!email) {
    alert("Por favor, ingresa tu correo electrónico.");
    return false;
  }
  alert("Instrucciones para recuperar tu contraseña han sido enviadas a: " + email);
  hideRecoverForm();
  return false;
}

function showRecoverForm() {
  document.getElementById('recover-form').classList.remove('d-none');
}

function hideRecoverForm() {
  document.getElementById('recover-form').classList.add('d-none');
}
