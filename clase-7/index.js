

// Ejemplo de callback

// const saludarPorConsola = (nombre) =>{
//     console.log('Hola '+ nombre);
// }

// const saludarConAlerta = (nombre) =>{
//     alert('Hola '+ nombre)
// }


// const enviarSaludo = (saludar) =>{
//     let nombre = prompt('Ingrese su nombre por favor')
//     saludar(nombre)
// }

// enviarSaludo(saludarPorConsola)


// metodo slice(index inicial, index final?)
// const array = [1,2,3,4,5]

// const newArray = array.slice(1,3)

// console.log(newArray, array);


// Metodos con Callback MAP

// const personas = [
//     {
//         nombre: 'Albano',
//         dni: 42100444,
//         edad: 18
//     }
// ]

// const array = [1,2,3,4,5,6]
// const verduras = ['Lechuga','Cebolla', 'Zanahoria']
// //                      element = array[index]
// //                      element = array[0] || element = 1
// const multiplicarPorDos = (element) =>{
//     return element * 2
// }
// const verdurasPorPosicion = verduras.map((verdura,index) => {
//     if(index%2 == 0) return 'No me interesa la verdura en esa posicion'

//     let verduraPorPosicion = 'Esta es la verdura en la posicion ' + (index + 1) + ' '+ verdura
//     return verduraPorPosicion
// }
// )

// console.log(verdurasPorPosicion);

// metodo array filter
// const array = [1,2,3,4,5,6]

// const newArray = array.filter((element) => element%2 == 0)

// console.log(newArray);

// metodo array find

// const array = [1,2,3,4,5,6]

// const primerElementoQueCoincida = array.find((element) => element%2 == 0)
// console.log(newArray);


// Metodo de array forEach
// let array = [1,2,3,4,5,6,7,8,9,10]

// array.forEach((numero,i) =>{
//     if(numero %2 == 0) return console.log(`EL NUMERO ${numero} ES PAR`);

//     return console.log(`EL NUMERO ${numero} NO ES PAR`);
// })

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     console.log(element);
    
// }


// metodo de array Reduce

// let array = [1,2,3,4,5,6]

// let total = array.reduce((prev, actual) =>{
//     return prev + actual // 21
// })

// console.log(total);

// metodo de array sort
// recuerden que si no se especifica, ordena en base a el codigo unicode o ascii

// let numerosDesordenados = [1,2,8,4,6,5,9,12,33,7]

// console.log(numerosDesordenados.sort((a,b) => a - b));
// let newarray = numerosDesordenados.sort((a,b) => a - b).reverse()

// console.log(newarray);