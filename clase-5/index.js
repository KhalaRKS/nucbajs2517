'use strict'
// closures
// const generarFuncion = () => {
//     const nombre = 'Mozilla';
//     const mostrarNombre = () =>{
//         return alert(nombre);
//     }
//     return mostrarNombre;
// }

// // const funcion = () =>{}

// const clausura = generarFuncion();

// clausura();

//
/*
const nombre = 'Mozilla';
    const mostrarNombre = () =>{
        return alert(nombre);
    }
    return mostrarNombre();
*/

// const generarFuncion = () =>{
//     const nombre = 'Albano';

//     const mostrarNombre = () =>{
    //         return alert(nombre);
    //     }
    //     return mostrarNombre;
    // }
    
    // const miNuevoScope = generarFuncion();
    
    /*
    {
        const nombre = 'Albano'
    
        const mostrarNombre = () =>{
            return alert(nombre);
        }
        return mostrarNombre;
    }
     */

// const creaSumador = (numero1)  =>{
//     return (numero2) => {
//       return numero1 + numero2;
//     };
//   }

// const suma5 = creaSumador(15);

// suma5(5)

// console.log(suma5(2));
// console.log(suma5(20));
// console.log(suma5(5));

// OBJETOS

class Pizza {
    constructor(tipo, variedad, precio = 1500, tamano, oregano, aceitunas){
        this.tipo = tipo
        this.variedad = variedad
        this.precio = precio
        this.tamano = tamano
        this.oregano = oregano
        this.aceitunas = aceitunas
        this.porciones = 8
    }

    mostrarCantidadDePorciones = () => {
        console.log(this.porciones);
    }
    comerUnaPorcion = () => {
        if(this.porciones < 1){
            return console.log('No hay mas porciones de ' + this.variedad);
        }

        this.porciones = this.porciones - 1
        console.log('Que rico, me comi una porción de ' + this.variedad);
    }
}

let pizza1 = new Pizza('molde','jamon y muzzarella',undefined,'Grande', true, true)


pizza1['tipo'] = 'piedra';
console.log(pizza1);

pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();
pizza1.comerUnaPorcion();

pizza1.mostrarCantidadDePorciones()



