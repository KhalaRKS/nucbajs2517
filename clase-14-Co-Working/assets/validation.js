// Nos traemos todos los elementos necesarios

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const dateInput = document.getElementById("date");
const hourInput = document.getElementById("hour");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const radioInputs = document.querySelectorAll("input[name='quantity']");
const checkboxInputs = document.querySelectorAll("input[type='checkbox']");
const aboutInput = document.getElementById("message");

// Checkeamos nombre de usuario

const checkTextInput = (input) => {
  let valid = false;

  const content = input.value.trim();

  if (isEmpty(content)) {
    showError(input, "* El nombre es obligatorio");
  } else {
    clearError(input);
    valid = true;
  }

  return valid;
};

// checkeamos el email

const checkEmail = () => {
  let valid = false;

  const emailValue = emailInput.value.trim();

  if (isEmpty(emailValue)) {
    showError(emailInput, "* El email no es valido");
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, "* El email no es valido");
  } else {
    clearError(emailInput);
    valid = true;
  }
  return valid;
};

// Checkeamos el telefono/phone

const checkPhone = () => {
  let valid = false;
  const phoneValue = phoneInput.value.trim();

  if (!isPhoneValid(phoneValue)) {
    showError(phoneInput, "* El telefono no es valido");
  } else {
    clearError(phoneInput);
    valid = true;
  }
  return valid;
};

// checkeamos la fecha

const checkDate = () => {
  let valid = false;

  const dateValue = dateInput.value;

  if (!isValidDate(dateValue)) {
    showError(dateInput, "* La fecha ingresada no es valida");
  } else {
    clearError(dateInput);
    valid = true;
  }
  return valid;
};

// Funcion que hace el checkequeo de que el formolario sea valido y ademazs muestra los errores en caso de que los haya.
const isValidForm = () => {
  const isValidName = checkTextInput(nameInput);
  const isValidSurname = checkTextInput(surnameInput);
  const isValidPhone = checkPhone();
  const isValidEmail = checkEmail();
  const isValidDate = checkDate();
  return (
    isValidName && isValidSurname && isValidPhone && isValidEmail && isValidDate
  );
};
