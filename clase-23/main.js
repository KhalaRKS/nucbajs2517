// Ejemplo call

const persona1 = {
  name: "Pepe",
  saludar: () => console.log("Hola, soy pepe"),
};

const persona2 = {
  name: "Maria",
};

function showInfo(caramelos, chupetines) {
  this.saludar;
  return `${this.name} tiene ${caramelos} caramelos y ${chupetines} chupetines. `;
}
// Call recibe como primer parametro, el objeto al cual se le va a asignar la referencia de this,
// y como demas argumentos, los parametros de la function, en este caso, caramelo y chupetines.

const newShowInfo = showInfo.bind(persona2, [3, 2]);

console.log("Funcion normal:   " + showInfo(4, 2));
console.log("Funcion con apply/call:   " + showInfo.apply(persona1, [8, 4]));
console.log(newShowInfo());
// Ejemplo de .apply

// Es similar a .call pero puede recibir un array de argumentos

// String.prototype.caramelos = 22;

// class Persona {
//   constructor(nombre, apellido, dni) {
//     this.nombre = nombre;
//     this.apellido = apellido;
//   }

//   presentarse() {
//     return `Hola, soy ${this.nombre}`;
//   }
//   saludar() {
//     return `Hola, como estas?`;
//   }
// }
// let objeto = {
//   nombre: "pepe",
//   apellido: "gomez",
//   presentarse: function () {
//     return `Hola, soy ${this.nombre}`;
//   },
// };
// String.prototype.findLetter = function name(letter) {
//   return this.indexOf(letter);
// };
// let letra = "pepito".findLetter("t");
// let nombre2 = String("pepe");

// nombre2.findLetter("e");

// console.log(new String("hola"));

// const Persona1 = new Persona("Pepe", "Gomez", 42104233);

// console.log(objeto.presentarse());
