// Guardamos la key de la API en una constante.
const KEY = "ee793e36b0b7a0ed13af01890f5dab32";

// Creamos 3 constantes,  una para cada URL de  llamada a la API. Estas constantes se usaran como paramentros
// en la funcion fetchMovies y seran controladas mediante el objeto pageControler que esta en el main de la pagina
const TRENDING = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&language=en-US`;
const TOPRATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US`;
const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US`;

const fetchMovies = async (searchTerm, page = 1) => {
  const response = await fetch(searchTerm + `&page=${page}`);
  const data = await response.json();
  console.log(data);

  return data;
};
