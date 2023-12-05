let currentPokemonIndex = 0;
let allPokemon = [];

async function init() {
  await loadAllPokemon();
  renderPokemon();
}

async function loadAllPokemon() {
  const numberOfPokemon = 101;

  for (let i = 1; i <= numberOfPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pokemon = await response.json();

    allPokemon.push(pokemon);
  }

  console.log("loaded all Pokemon", allPokemon);
}

function renderPokemon() {
  let pokedexContainer = document.getElementById("pokedex");
  pokedexContainer.innerHTML = "";

  for (let i = 0; i < allPokemon.length; i++) {
    const pokemonCard = allPokemon[i];

    let pokemonElement = document.createElement("div");
    pokemonElement.innerHTML = `
    <div class="pokemon-header" id="pokemon-header-id">
      <h2>${capitalizeFirstLetter(pokemonCard["name"])}</h2>
      <span>${formatId(pokemonCard["id"])}</span>
      <div class="front-sight-pokemon">
          <div>${getTypes(pokemonCard)}</div>
          <div>
            <img src="${pokemonCard["sprites"]["front_default"]}" alt="${pokemonCard["name"]}">
          </div>
      </div>
    </div>
    `;

    pokemonElement.addEventListener("click", function () {
      showPokemon(i);
    });

    pokedexContainer.appendChild(pokemonElement);
  }
}

function showPokemon(index) {
  let mainPokeStats = document.getElementById("pokemon-stats");
  mainPokeStats.innerHTML = "";

  if (index >= 0 && index < allPokemon.length) {
    const pokemon = allPokemon[index];
    mainPokeStats.innerHTML += `
      <div class="PokeCard" id="PokeCard">
        <div class="Pokemon-single-card">
            <div class="pokestats-order">
                <h1>${capitalizeFirstLetter(pokemon["name"])}</h1>
                <span>${formatId(pokemon["id"])}</span>
                <div>${getTypes(pokemon)}</div>
                <button class="cardBtn" onclick="closeCard()">X</button>
            </div>
            <div class="pokemon-img-class">
                <img src="${
                  pokemon["sprites"]["other"]["home"]["front_default"]
                }" alt="${pokemon["name"]}">
            </div>
            <div class="everyInformation">
              <div class="onlyBtns">
                <button onclick="showAbout(${index})">About</button>
                <button onclick="showStats(${index})">Base Stats</button>
                <button onclick="showMoves(${index})">Moves</button>
              </div>
              <div class="everyContainer">
                  <div id="allAbout">
                      <!-- div für die infos -->
                  </div>

                  <div id="allBaseStats" class="d-none">
                      <!-- div für die stats -->
                  </div>

                  <div id="allMoves" class="d-none">
                      <!-- div für die moves  -->
                  </div>
              </div>
          </div>
      </div>`;
  } else {
    console.error("Ungültiger Pokémon-Index");
  }
  renderAbout(allPokemon[index]);
  renderBaseStats(allPokemon[index]);
  renderMoves(allPokemon[index]);
  getTypesColor(allPokemon[index]);
}
function renderAbout(pokemon) {
  let abouts = document.getElementById("allAbout");
  abouts.innerHTML = "";

  abouts.innerHTML = `
    <div class="designAbout">
        <span>Species:</span>
        <span>${pokemon.species.name}</span>
    </div>
    <div class="designAbout">
        <span>Height:</span>
        <span>${realHeight(pokemon.height)}m</span>
    </div>
    <div class="designAbout">
        <span>Weight:</span>
        <span>${realWeight(pokemon.weight).toFixed(2)}kg</span>
    </div>
    <div class="designAbout">
        <span>Abilities:</span>
        <div>${getAbilities(pokemon)}</div>
    </div>`;
}

function renderBaseStats(pokemon) {
  let statsContainer = document.getElementById("allBaseStats");
  statsContainer.innerHTML = "";

  for (let i = 0; i < pokemon.stats.length; i++) {
    let stat = pokemon.stats[i];

    statsContainer.innerHTML += `
      <div class="statsOrder">
          <span>${stat.stat.name}</span>
          <span>${stat.base_stat}</span>
      </div>
  `;
  }
}

function renderMoves(pokemon) {
  let movesContainer = document.getElementById("allMoves");
  movesContainer.innerHTML = "";

  for (let i = 0; i < pokemon.moves.length; i++) {
    const move = pokemon.moves[i];

    movesContainer.innerHTML += `
      <div>
          <span class="theMove">${move.move.name}</span>
      </div>`;
  }
}


function getTypes(pokemon) {
  let types = pokemon["types"];
  let result = '<div class="ability-container">';
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    result +=
      '<div class="type">' + capitalizeFirstLetter(type["type"]["name"]) + "</div>";
  }
  return result + "</div>";
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function closeCard(){
  document.getElementById('PokeCard').classList.add('d-none')
}

function formatId(id) {
  if (id < 10) {
    return "#00" + id;
  } else if (id < 100 && id > 10) {
    return "#0" + id;
  } else {
    return "#" + id;
  }
}

function realWeight(weight){
  return weight / 10;
}


function realHeight(height) {
  return height / 10;
}
function getAbilities(pokemon) {
  let abilities = pokemon.abilities;
  let result = '<span class="ability-container">';
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i];
    result += '<div class="ability">' + capitalizeFirstLetter(ability.ability.name) + '</div>';
  }
  return result + '</span>';
}


function getTypesColor(pokemon) {
  let types = pokemon['types']['0']['type']['name'];

    if (types == "grass") {
      document.getElementById('pokemon-header-id').classList.add('grass');
    }
  };



function showAbout(){
  document.getElementById('allBaseStats').classList.add('d-none');
  document.getElementById('allMoves').classList.add('d-none');
  document.getElementById('allAbout').classList.remove('d-none');
}

function showStats(){
  document.getElementById('allAbout').classList.add('d-none');
  document.getElementById('allMoves').classList.add('d-none');
  document.getElementById('allBaseStats').classList.remove('d-none');
}

function showMoves(){
  document.getElementById('allAbout').classList.add('d-none');
  document.getElementById('allBaseStats').classList.add('d-none');
  document.getElementById('allMoves').classList.remove('d-none');
}