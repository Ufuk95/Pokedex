let currentPokemon;

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  let currentPokemon = await response.json();

  console.log("loaded pokemon ", currentPokemon);

  renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(currentPokemon) {
  document.getElementById("pokemonName").innerHTML = capitalizeFirstLetter(currentPokemon["name"]);
  document.getElementById('pokeID').innerHTML = formatId(currentPokemon['id']);
  document.getElementById('pokemonIMG').src = currentPokemon['sprites']['other']['home']['front_default']
  document.getElementById('pokeType').innerHTML = currentPokemon['types'][0]['type']['name'];
}


function formatId(id) {
    if (id < 10) {
        return '#00' + id;
    } else if (id < 100 && id > 10) {
        return '#0' + id;
    } else {
        return '#' + id;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function aboutStats(){
    
}