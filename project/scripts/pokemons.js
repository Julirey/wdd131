const pokemonsElement = document.querySelector("#pokemon-grid");
let pokemonList = [];
let pokemonStorage = getPokemonStorage() || [];

let sPath = window.location.pathname;
let sPage = sPath.substring(sPath.lastIndexOf('/') + 1); 

if (sPage == "favorites.html") {
    pokemonList = pokemonStorage;
}

// Display details of a single Pokemon
const displayPokemon = (pokemon) => {
    let section = document.createElement("section");
    section.classList.add("card");

    let h2 = document.createElement("h2");
    h2.textContent = `#${pokemon.id}: ${Upper(pokemon.name)}`;

    let content = document.createElement("div");
    content.classList.add("card-content")

    let p = document.createElement("p");
    p.textContent = `Type: ${getTypes(pokemon).join(", ")}`;

    let img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    let div = document.createElement("div");
    div.classList.add("card-buttons");

    let button = document.createElement("button");
    button.textContent = `Go to wiki`;
    button.addEventListener("click", function () {
      window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}`,
        "_blank"
      );
    });
    div.appendChild(button);
    
    if (sPage !== "favorites.html") {
        let favorite = document.createElement("button");
        favorite.textContent = `Add to list`;
        favorite.addEventListener("click", function () {
            pokemonStorage.push(pokemon);
            setPokemonStorage();
            favorite.classList.toggle("added")
            favorite.textContent = `Added to list`;
        });
        div.appendChild(favorite);
    }

    content.appendChild(p);
    content.appendChild(img);
    content.appendChild(div);
    
    section.appendChild(h2);
    section.appendChild(content);
    pokemonsElement.appendChild(section);
};

// Display List of Pokemons 
const displayPokemons = (array) => {
    if (array.length > 0) {
        pokemonsElement.innerHTML = "";
        array.forEach(pokemon => {
            displayPokemon(pokemon);
        });
    } else {
        pokemonsElement.innerHTML = `<p>There are no pokemons here yet.</br>You may add some in the catalogue page.</p>`;
    }
};

// Fetch Pokemon List
const getPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/generation/1/");
  if (response.ok) {
    let data = await response.json();
    for (const pokemon of data.pokemon_species) {
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        if  (response2.ok) {
            let details = await response2.json();
            pokemonList.push(details);
            displayPokemon(details);
        }
    }
  }
};

// To get an array of every type a pokemon has
const getTypes = (pokemon) => {
    let types = [];
    pokemon.types.forEach((t) => {
        types.push(t.type.name);
    });
    return types;
};

  
// Sorter
const sortBy = (pokemons) => {
    const filter = document.getElementById("PsortBy").value;
    switch (filter) {
      case "a-z":
        displayPokemons(pokemons.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "z-a":
        displayPokemons(
          pokemons.sort((a, b) => -1 * a.name.localeCompare(b.name))
        );
        break;
      case "id-asc":
        displayPokemons(pokemons.sort((pokeA, pokeB) => pokeA.id - pokeB.id));
        break;
      case "id-desc":
        displayPokemons(pokemons.sort((pokeA, pokeB) => pokeB.id - pokeA.id));
        break;
      default:
        console.log("Invalid filter");
    }
};

// Type Sorter
const sortByType = (pokemons) => {
    const filter = document.getElementById("PsortByType").value;
    displayPokemons(pokemons.filter((pokemon) => getTypes(pokemon).includes(filter)));
};


// To convert the first letter of a string to Uppercase
function Upper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// LocalStorage functions
function setPokemonStorage() {
    localStorage.setItem("favorites", JSON.stringify(pokemonStorage));
  }
  
function getPokemonStorage() {
return JSON.parse(localStorage.getItem("favorites"));
}

function deletePokemon(pokemon) {
    pokemon = pokemon.slice(0, pokemon.length - 1);
    pokemonStorage = pokemonStorage.filter(item => item !== pokemon);
    setPokemonStorage();
}

// Event Listener
document.querySelector("#PsortBy").addEventListener("change", () => {sortBy(pokemonList);});
document.querySelector("#PsortByType").addEventListener("change", () => {sortByType(pokemonList);});
document.querySelector("#clearFavorites").addEventListener("click", () => {
  pokemonStorage = [];
  setPokemonStorage();
  if (sPage == "favorites.html") {
    displayPokemons(pokemonStorage);
  } else {
    displayPokemons(pokemonList);
  }
});

// First load
document.addEventListener("DOMContentLoaded", () => {
  if (sPage == "favorites.html") {
    displayPokemons(pokemonStorage);
  } else {
    getPokemons();
  }
});
