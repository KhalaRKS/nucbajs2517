const btnContainer = document.querySelector(".pagination");
const prevBTN = document.querySelector(".left");
const nextBTN = document.querySelector(".right");
const cardsContainer = document.querySelector(".cards-container");
const pageNumber = document.querySelector(".page-number");
const filterButtons = document.querySelectorAll(".btn");
const filterContainer = document.querySelector(".filter-container");

/* Las imágenes de movieDB vienen con una URL de base la cual se tiene que colocar en conjunto con lo que venga en el objeto de cada película para que la imagen aparezca. Guardamos esta en una constante. 
Para mas referencia :  https://developers.themoviedb.org/3/getting-started/images . Elegimos para esta APP el tamaño original.
*/
const ImgBaseUrl = "https://image.tmdb.org/t/p/original";

// Objeto para setear la pagina actual, el total de paginas y el parametro de busqueda en la api

const pageController = {
  page: null,
  total: null,
  searchParameter: TRENDING,
};

// funcion que servira como seleccionador del filtro que tomaremos para hacer la llamada a la api

const parameterSelector = (filterType) => {
  return filterType === "TOPRATED"
    ? TOPRATED
    : filterType === "UPCOMING"
    ? UPCOMING
    : TRENDING;
};

const changeSearchParameter = (e) => {
  if (
    !e.target.classList.contains("btn") ||
    e.target.classList.contains("btn--active")
  )
    return;

  const selectedParameter = e.target.dataset.filter;

  pageController.searchParameter = parameterSelector(selectedParameter);

  const buttons = [...filterButtons];
  buttons.forEach((btn) => {
    if (btn.dataset.filter !== selectedParameter) {
      btn.classList.remove("btn--active");
    } else {
      btn.classList.add("btn--active");
    }
  });

  getMovies();
};

// funcion para formatear la fecha que nos viene dada en la propieda realease_date de cada pelicula

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const renderCard = (movie) => {
  const { title, poster_path, vote_average, release_date } = movie;

  return ` 
    <div class="card">
        <img loading="lazy"  src=${
          poster_path
            ? ImgBaseUrl + poster_path
            : "./assets/img/placeholder.png"
        } alt="${title}}" class="card-img"
        />
        <div class="card-popularity">
        ${Math.floor(vote_average * 10)}% de popularidad

        </div>
        <div class="card-content">
            <h2>${title}</h2>
            <p>Fecha de estreno: ${formatDate(release_date)}</p>
        </div>
    </div>
  `;
};

// funcion de renderizado del loader

const renderLoader = () => {
  return `   
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
};

// funcion de renderizado de todas las cards que vienen en un llamado a la API

const renderCards = (movies) => {
  cardsContainer.innerHTML = movies.map((movie) => renderCard(movie)).join("");
};

const disablePreviousBTN = (page) => {
  if (page === 1) {
    prevBTN.classList.add("disabled");
  } else {
    prevBTN.classList.remove("disabled");
  }
};

const disableNextBTN = (page, total) => {
  page === total
    ? nextBTN.classList.add("disabled")
    : nextBTN.classList.remove("disabled");
};

// setear visual de la paginacion que se colocara enb la funcionm change page
const setPagination = () => {
  pageNumber.innerHTML = pageController.page;
  disablePreviousBTN(pageController.page);
  disableNextBTN(pageController.page, pageController.total);
};

// funcion loader para que se genere un efecto de carga hasta que se rendericen las cards

const loadAndShow = (movies) => {
  setTimeout(() => {
    renderCards(movies.results);
    filterContainer.scrollIntoView({
      behavior: "smooth",
    });
  }, 1500);
};

// funcion para fetchear las peliculas

// 1- setear el loader
// 2- se hace el fetch a la API con el parametro de busqueda que se encuentra en el controller de la pagina
// 3- setea el total de pagina que obtienen en la respuesta de la api
// 4- setea la pagina actual en el controller de la pagina
// 5- setea la paginacion
// 6- renderiza las cards
const getMovies = async () => {
  cardsContainer.innerHTML = renderLoader();
  const movies = await fetchMovies(pageController.searchParameter);

  pageController.total = movies.total_pages;
  pageController.page = movies.page;

  setPagination();
  renderCards(movies.results);
};

// funcion para cambiar de pagina
const changePage = async () => {
  cardsContainer.innerHTML = renderLoader();
  const movies = await fetchMovies(
    pageController.searchParameter,
    pageController.page
  );
  setPagination();
  loadAndShow(movies);
};

// Funcion para cambiar de pagina hacia adelante
// 1- usamos stopInmediatePropagation() para que no se propague el evento click al padre)
const nextPage = async (e) => {
  e.stopImmediatePropagation();
  if (pageController.page === pageController.total) return;
  pageController.page = 1000;
  changePage();
};
// Funcion para cambiar de pagina hacia atras
const previousPage = async (e) => {
  e.stopImmediatePropagation();
  if (pageController.page === 1) return;
  pageController.page -= 1;

  changePage();
};

// funcion inicializadora
// en esta funcion siempre colocamos los listeners de los bootnes de paginacion, del cargado del dom , y el listener para cambiar el tipo de filtro

const init = () => {
  window.addEventListener("DOMContentLoaded", getMovies);
  nextBTN.addEventListener("click", nextPage);
  prevBTN.addEventListener("click", previousPage);
  filterContainer.addEventListener("click", changeSearchParameter);
};
init();
