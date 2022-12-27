async function asincrona(params) {
  let response = await fetch("www.moviesapi.com/api/movies");

  let response2 = response.json();
  if (!response2.movies) return "No tiene ninguna peliculas";

  return response2;
}

localStorage.setItem("nombre", "Alba");
localStorage.setItem("apellido", "kainer");
localStorage.setItem("celular", "115423525");
localStorage.setItem("adress", "pepito 123");
console.log(localStorage.getItem("nombre"));

for (let index = 0; index < localStorage.length; index++) {
  const key = localStorage.key(index);

  let newArray = [newElement, ...oldArray];
}
