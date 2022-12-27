"use strict";

// function task1(a, b) {
//   return a + b;
// }
// function task2(a, b) {
//   return task1(a, b) / 2;
// }

// let x = task2(20, 50);

// console.log(x);

// let variable1 = { value: 5 };

// // variabla2 no tevoy a colocar 5
// // variable2 vos vas a mirar a donde esta mirando variable1
// // variable1 ----------- posicion3
// // variable2(guardiando una referencia a memoria de la variable1) ----------- posicion3
// // posicion3 = {value: 5}
// let variable2 = variable1;

// variable2.value = 10;
// // posicion3= {value: 10}

let array = [1, 2, 3, 4, 5, 6, 7, 123, 12, 2, 32, 2];

// setTimeout(() => {
//   console.log("hola");
// }, 0);
// setTimeout(() => {
//   console.log("hola como estas?");
// }, 500);

// array.forEach(async (e) => {
//   return console.log(e);
// });

const div = document.getElementById("div");

div.addEventListener("click", () => {
  console.log("clicked!");
});
console.log(div);
//Te voy a consultar sobre lo que tengas en esta ruta
// Si tenes me responder, me gustaria que me devuelvas lo que tengas
// Si ocurre algun error, lo voy a estar esperando con mi catch, y lo voy a mirar
for (let index = 0; index < 500; index++) {
  fetch("https://api.publicapis.org/entries")
    .then((response) => {
      if (response > 5) {
        console.log(response);
      } else {
        console.log("No me sirve");
      }
    })
    .catch((err) => console.log("No se puedo ejecutar, porque hubo un error"));
}
