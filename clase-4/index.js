// Funciones con palabra reservada function

// function sumar(numero1, numero2, numero3) {
//     console.log(numero1);
//     console.log(numero1 + numero2 + numero3);
// }
// function nombre(nombre,apellido) {
//     console.log('Hola ' + nombre +' ' + apellido);
// }

// sumar()
// importa el orden de los parametros en las funciones
// nombre('Kainer','Albano')
//                     1              1            1
// function sumar(numero1 = 1, numero2 = 1, numero3 = 1) {
//     return (numero1 + numero2 + numero3);
// }

// let total = sumar(2,3,4)

// total = total / 3 
// console.log(total);

// Funciones Flecha - importa el orden de los parametros en las funciones
// 99,9% iguales a declararlas con la palabra reservada function

// const funcionFlecha = ()=> {
//     funcionFlecha2()
    
// }

// let funcionFlecha2 = () =>{
//     console.log('hola soy la funcion flecha 2');
// }

// console.log(funcionFlecha());


// Complicated  RECURSIVIDAD

//                  4
// const factorial = (num) => {
//     //  4 <= 1 NOOO
//     if(num<=1){
//         return 1;
//     }
//     //      4    *        4-1 = 3
//     return num * factorial(num-1);
// }

// factorial(5) // await
// factorial(4) // await
// factorial(3) // return 3 * 2
// factorial(2) // return 2 * 1
// factorial(1) // return 1
// // EJECUTANDO ESTO

// // ivocamos la funcion
// console.log(factorial(5))

// FUNCION CALLBACK

const saludarConAlert = (nombre) => {
    alert('hola ' + nombre);
}
const saludarConConsoleLog = (nombre) => {
    console.log('hola ' + nombre);
}

const funcionQueRecibeUnCallback = (funcionQueRecibo) =>{
    const nombre = prompt('Ingrese Su nombre')
    funcionQueRecibo(nombre)
}


funcionQueRecibeUnCallback(saludarConConsoleLog)