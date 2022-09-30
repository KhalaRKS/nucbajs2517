// let array = [1,5,7,2,22,32,544,12,13,134,111,4]


// array.sort((a,b) => a - b)

// console.log(array);




// Callback

// const saludarPorConsola = (nombre) =>{

//     console.log('Hola ' + nombre);
// }

// const saludarPorAlerta = (nombre) =>{

//     alert(`Hola ${nombre}`);
// }

// const imprimirSaludoQueYoQuiera = (unaFuncionCallback) =>{
//     let nombre = prompt('Por favor, ingrese su nombre')
//     unaFuncionCallback(nombre)
// }

// imprimirSaludoQueYoQuiera(saludarPorConsola)




// Closures & Scopes

// let nombre = prompt('ingrese su nombre') // scope global de la app

// const saludarPorConsola = () =>{
//      // scope local de la funcion saludarPorConsola
//     console.log('Hola ' + nombre); // va a ir a buscar a la variable en el scope mas cercano
// }

// const saludarPorAlerta = () =>{

//     alert(`Hola ${nombre}`);
// }

//                           10
// const generarFuncion = (initialValue) =>{
//     const valorConstante = initialValue;
//     const sumarCinco = () =>{
//         return valorConstante + 5
//     }
//     return sumarCinco
// }



// const nuevoNumero = generarFuncion(10)


// let numeroNuevo = nuevoNumero()

// let otroNumeroNuevo = nuevoNumero()

// console.log(numeroNuevo);


// Ejemplo de clausura recordando su scope superior vs funcion normal

// const nuevaFuncion =() =>{
//     let counter = 0;
//     return () => {
//         counter += 1;
//         return counter}
//   };

//   const addNum = nuevaFuncion()

//   console.log('CLOSURE ' + addNum());
//   console.log('CLOSURE ' + addNum());
//   console.log('CLOSURE ' + addNum());
//   console.log('CLOSURE ' + addNum());

//   const sumar = () =>{
//     let contador = 0
//     return contador + 1
//   }

//   console.log('funcion normal ' +sumar());
//   console.log('funcion normal ' +sumar());
//   console.log('funcion normal ' +sumar());

// Declarar objetos de tipo Chocolate

class Chocolate {
    constructor(tipo,azucar){
        this.tipo = tipo
        this.azucar = azucar
    }
    verChocolate = () =>{
        return console.log(`Este chocolate es de sabor chocolate : ${this.tipo}`);
    }

}

let milka = new Chocolate('blanco', false);

// let chocolateOreo = new Chocolate('negro', true)

console.log(milka);


let objeto = {
    key: 'value',
    dni: 42100444,
    nombre: 'pepe',
    email: 'asd@asd.com',
    verDni: function() {console.log(this.dni)}
}

let array = [milka,milka]
console.log(array);