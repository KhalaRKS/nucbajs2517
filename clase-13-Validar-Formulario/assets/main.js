// Nos traemos todos los elementos necesarios para utilizar en js

const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");

// chequeamos nombre de usuario
const checkUsername = () => {
  // Input valido por defecto en false
  let valid = false;

  // guardamos en dos variables el minimo y maximo de caracteres para el nombre de usuario
  const min = 3;
  const max = 25;

  // Guardamos el valor del input (nameInput) en una variable
  const username = nameInput.value.trim();

  // Si el campo esta vacio mostramos error, llamando a la funcion showError
  if (isEmpty(username)) {
    showError(nameInput, "El nombre es obligatorio");
    // Si el nombre no cumple con los requisitos de longitud, llamamos  a la funcion showError
  } else if (!isBetween(username.length, min, max)) {
    showError(
      nameInput,
      `El nombre debe tener entre ${min} y ${max} caracteres`
    );

    // Si todo sale bien validamos el formulario, llamando a la funcion
    // showSuccesss y cambiamos el estado valid a true
  } else {
    showSuccess(nameInput);
    valid = true;
  }
  return valid;
};

// chequear el email

const checkEmail = () => {
  // Input valida por defecto false
  let valid = false;

  // Guardamos el valor del input (emailInput) en una variable
  const emailValue = emailInput.value.trim();

  // Si el campo esta vacio mostramos error, llamando a la funcion showError
  if (isEmpty(emailValue)) {
    showError(emailInput, "El email es obligatorio");
    // Si el email no es valido (segun lo que devuelva nuestra funcion isEmailValid,
    // creada mas abajo), llamamos a la funcion showError
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, "El email no es valido");
    // Si todo sale bien validamos el formulario, llamando a la
    // funcion showSuccess y cambiamos el estado valid a true
  } else {
    showSuccess(emailInput);
    valid = true;
  }
  return valid;
};

// Chequeamos la constraseña

const checkPassword = () => {
  // Input valido por defecto false
  let valid = false;

  // Guardamos el valor del input en una variable
  const password = passInput.value.trim();

  // Si el campo esta vacio vamos a mostrar un error
  if (isEmpty(password)) {
    showError(passInput, "La contraseña es obligatoria");
    // Si la contraseña no cumple con los requisitos
    // (Segun lo que devuelva la funcion isPassSecure, creada mas abajo)vamos a mostrar un error
  } else if (!isPassSecure(password)) {
    showError(
      passInput,
      "La contraseñ adebe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo"
    );
  } else {
    showSuccess(passInput);
    valid = true;
  }
  return valid;
};

// Chequeamos el telefeno

const checkPhone = () => {
  //input valido por defecto false
  let valid = false;
  // Guardamos el valor del input (phoneInput) en una variable
  const phoneValue = phoneInput.value.trim();
  // Si el telefono no cumple con los requisitos
  // (Segun lo que devuelva la funcio isPhoneValid, creada mas abajo) muestro un error
  if (!isPhoneValid(phoneValue)) {
    // corregir esta linea
    showError(phoneInput, "El telefono no es valido");

    // Si todo sale bien validamos el formulario, llamando a la funcion showSuccess  y cambiamos el estado
    // valid a true
  } else {
    // corregir esta linea
    showSuccess(phoneInput);
    valid = true;
  }
  return valid;
};

// Funcion para verificar si se requiere un campo
// Esta funcion devuelve true si el campo esta vacio

const isEmpty = (value) => value === "";

// Funcion para verificar si la longitud del campo esta entre min y max
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// Funciones para chequear los campos con expresiones regulares

// Email Valido
const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  // Testeamos el value
  return re.test(email);
};

// Chequeamos si las password tienen 8 caractes, minuscula, mayuscula y simbolo
const isPassSecure = (pass) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  // Testeamos el value
  return re.test(pass);
};

// Chequear si el telefono ingresado es un numero valido (10 nums)
const isPhoneValid = (phone) => {
  const re = /^[0-9]{10}$/;
  //Testeamos el value
  return re.test(phone);
};

// Funcion para mostrar error
// Recibe el Input y el mensaje de error

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  console.log(formField.querySelector("small"));
  const error = formField.querySelector("small");
  error.innerText = message;
};

// Funcion para mostrar exito
// Recibe el input

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.innerText = "";
};

// Event listener para enviar y chequear que todo sea valido.
form.addEventListener("submit", (e) => {
  //Prevenir el comportamiendo default del evento submit
  e.preventDefault();

  // Guardamos el estado de los inputs en variables
  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isPhoneValid = checkPhone();

  // Mostrar este console.log para ver como va validando los distintos campos.
  console.log(isUsernameValid, isEmailValid, isPasswordValid, isPhoneValid);

  // Guardamos todos los estados de los inputs en una variabe

  let isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;

  // Si todos los campos son validos, mostramos un mensaje de exito (En este caso "Enviamos el formulario)")
  if (isFormValid) {
    form.submit();
    alert(
      "Enviamos el formulario",
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isPhoneValid
    );
  }
});

// Las funciones de rebote (debounce) no se ejecutan al momento de su invocación.
// En lugar de eso, su ejecucion es retrasa por un periodo  predeterminado de tiempo. Si la misma función es
// invocada de nuevo, la ejecución previa es cancelada y el tiempo de espera se reinicia.
// Esta funcion va a recibir dos parametros: una funcion (callback) y un tiempo en delay,
// por defecto le pusimos 500ms

// El primer parametro es la funcion que queremos ejecutar despues de un tiempo
// y el segundo es el tiempo que tiene que esperar antes de ejecutar la funcion.

const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    // Cancelamos el timer anterior
    if (timeoutId) clearTimeout(timeoutId);
    // Seteamos un nuevo timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// Agregamos un addEventListener de tipo input al form, donde va a ejecutar la funcion debounce (creada arriba) a los inputs
// username, email, password,  phone, para que cada vez que se escriba algo en ese input se ejecuta la funcion
// correspondiente

form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "phone":
        checkPhone();
        break;
    }
  })
);
