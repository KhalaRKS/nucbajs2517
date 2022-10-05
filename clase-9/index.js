'use strict'


const TITULO_H1 = document.getElementById('titulo')
const PARRAFOS = document.getElementsByClassName('parrafo')
const DIVS = document.getElementsByTagName('div')


// setTimeout y setInterval
// setTimeout(() =>{
//     console.log('Este es el titulo de nuestra página con delay de 3s: '+ TITULO_H1.innerText);
// }, 3000)
// setTimeout(() =>{
//     console.log(`Estos son los parrafos de nuestra página con delay de 1s: `, PARRAFOS);
// }, 1000)

// let counter = 0
// setInterval(() =>{
//     counter++
//     console.log(counter);
// }, 1000)


console.log(navigator.connection);
console.log(DIVS);

const url = document.getElementById('link')
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org:8080
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // 8080
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org

