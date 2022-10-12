'use strict'

const INPUT_TEXT = document.getElementById('input-text')
const INPUT_BTN = document.getElementById('input-btn')
const FIRST_INPUT = document.querySelector('input')

FIRST_INPUT.setAttribute('id', 'first-input')
FIRST_INPUT.setAttribute('name', 'firstInput')


// OPERADOR TERNARIO O TERNARY OPERATOR
// let nombre = 'Matias'
// console.log(nombre ? nombre : 'No tiene un nombre asignado');

// if(nombre){
//     console.log(' DESDE UN IF ELSE ' +nombre);
// }else{
//     console.log(' DESDE UN IF ELSE No tiene un nombre asignado');
// }


 INPUT_BTN.addEventListener('click', () => {
    if(INPUT_BTN.style.borderColor === 'blue') return INPUT_BTN.style.borderColor = 'red'
    
    INPUT_BTN.style.borderColor = 'blue'
 });


 setInterval(() =>{
    if(INPUT_BTN.style.borderColor === 'blue') return INPUT_BTN.style.borderColor = 'red'

    INPUT_BTN.style.borderColor = 'blue'
 },500)

 setInterval(() =>{
    if(INPUT_TEXT.className === 'texto2') return INPUT_TEXT.className = 'texto'
    INPUT_TEXT.className = 'texto2'
 },200)


INPUT_TEXT.addEventListener('click', () =>{
    if(INPUT_TEXT.className === 'texto2') return INPUT_TEXT.className = 'texto'
    INPUT_TEXT.className = 'texto2'
})

// function mostrarValorInput() {
//     console.log(INPUT_TEXT.value)
// }

// AGREGAR CLASES AL ELEMENTO SELECCIONADO
// INPUT_TEXT.className = 'texto'
// INPUT_TEXT.className += ' texto2'
// INPUT_TEXT.classList.add('texto3')
// INPUT_TEXT.className = 'texto'

