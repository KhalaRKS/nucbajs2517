const caja = document.querySelector("#caja");
const loader = document.querySelector(".pokeballs-container");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

let isFetching = false;

const nextURL = {
  next: null,
};

const renderPokemon = (pokemon) => {
  const { id, name, sprites, height, weight, types } = pokemon;

  return `
  <div class="poke">
        <img  src="${sprites.other.home.front_default}"/>
        <h2>${name.toUpperCase()}</h2>
        <span class="exp">EXP: ${pokemon.base_experience}</span>
        <div class="tipo-poke">
            ${types
              .map((tipo) => {
                return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
              })
              .join("")}
        </div>
        <p class="id-poke">#${id}</p>
        <p class="height">Height: ${height / 10}m</p>
        <p class="weight">Weight: ${weight / 10}Kg</p>
    </div>
  `;
};

const renderPokemonList = (pokeList) => {
  const cards = pokeList
    .map((pokemon) => {
      return renderPokemon(pokemon);
    })
    .join("");
  caja.innerHTML += cards;
};

// Creamos la funcion para traernos la data de los pokemos
const fetchPokemons = async () => {
  const res = await fetch(`${baseURL}?limit=8&offset=0`);
  const data = await res.json();

  return data;
};

const loadAndPrint = (pokemonsList) => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    renderPokemonList(pokemonsList);
    isFetching = false;
  }, 1500);
};

function init() {
  window.addEventListener("DOMContentLoaded", async () => {
    let { next, results } = await fetchPokemons();

    nextURL.next = next;

    const URLS = results.map((pokemon) => pokemon.url);

    const InfoPokemones = await Promise.all(
      URLS.map(async (url) => {
        const nextPokemons = await fetch(url);
        return await nextPokemons.json();
      })
    );

    renderPokemonList(InfoPokemones);
  });

  window.addEventListener("scroll", async () => {
    // scrollTop nos devuelve el numero de pixeles que el contenido ya se desplazo de arriba del todo
    // clientHeight Devuelve la altura de un elemento en pixeles, incluye el padding pero excluye las barras horizontales, el bordo o el margen
    //
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const bottom = scrollTop + clientHeight >= scrollHeight - 1;

    if (bottom && !isFetching) {
      isFetching = true;
      console.log("llamando");
      const nextPokemons = await fetch(nextURL.next);
      const { next, results } = await nextPokemons.json();
      console.log("NEXT URL : " + next);
      nextURL.next = next;

      const URLS = results.map((pokemon) => pokemon.url);

      console.log("URLS: ", URLS);
      const InfoPokemones = await Promise.all(
        URLS.map(async (url) => {
          const nextPokemons = await fetch(url);
          return await nextPokemons.json();
        })
      );

      console.log("INFOPOKEMOS : ", InfoPokemones);
      loadAndPrint(InfoPokemones);
    }
  });
}

// inicializar el programa llamando a la funcion init

init();
