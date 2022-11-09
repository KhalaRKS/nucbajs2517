"use strict";

// // Async
// for (let index = 0; index < 10; index++) {
//   setTimeout(() => {
//     console.log(index);
//   }, 0);
// }
// // Sync
// for (let index = 0; index < 2000; index++) {
//   console.log(index);
// }

// consulta api
// async function getDataFromService(params) {
// ....
// }
const CONTAINER = document.getElementById("container");
const BUTTON = document.getElementById("button");

console.log(CONTAINER);
const getDataFromService = async () => {
  // Consumimos la api y mostramos del objeto respuesta, cada email de los usuarios
  fetch("https://reqres.in/api/users?page=2")
    .then((res) => res.json())
    .then((data) => {
      data.data.forEach((el) => {
        console.log(el.email);
      });
    })
    .catch((err) => console.log(err));
};

const getDataFromServiceWithAwait = async () => {
  // Consumimos la api y mostramos del objeto respuesta, cada email de los usuarios
  // La palabra reservada Await, le indica a javascript que tiene que esperar el resultado
  // que reciba cuando la promesa sea resuelta o rechazada, y luego de eso seguir ejecutando desde
  // donde estaba la palabra await
  const res = await fetch("https://reqres.in/api/users?page=2");
  if (!res) return Promise.reject("No hay nada");

  const resJson = res.json();
  return resJson;
};

const renderizarListaDeUsuarios = (usuario) => {
  CONTAINER.innerHTML = `
  <ul>
    <li>    
      <ul>
        <li>Nombre: ${usuario.first_name}</li>
        <li>Apellido: ${usuario.last_name}</li>
        <li>Email: ${usuario.email}</li>
        <img src="${usuario.avatar}" alt="" srcset="">
      </ul>
      </li>
  </ul>`;
};

BUTTON.addEventListener("click", () => {
  getDataFromServiceWithAwait().then((dataParaMostrar) =>
    renderizarListaDeUsuarios(dataParaMostrar.data[0])
  );
});

// console.log("Cargando resultados");
