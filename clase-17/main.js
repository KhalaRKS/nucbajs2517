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

// const getValueAfterMS = (ms, value) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const keys = {
//         a: 1,
//         b: 2,
//         c: 3,
//         d: 4,
//         e: 5,
//       };
//       //    const v = keys.e
//       //     v = 5
//       const v = keys[value];
//       //
//       if (!v) {
//         reject("no existe ese valor");
//       } else {
//         resolve({
//           value,
//         });
//       }
//     }, ms);
//   });
// };

// getValueAfterMS(1000, "a")
//   .then((res) => console.log(res))
//   .then(() => console.log("Me resolvi correctamente!"))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("Temine la promesa"));
// const json = {json:json}
const getDataFromService = async () => {
  fetch("https://api.publicapis.org/entries")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

getDataFromService();
console.log("Cargando resultados");
