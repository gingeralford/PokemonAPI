
const baseURL = "https://pokeapi.co/api/v2/pokemon/";
let searchForm = document.querySelector('form');
const searchTerm = document.querySelector('.search');
const pokemonDiv = document.querySelector('#pokemon');
const pokemonName = document.querySelector('#pokemon_name');
const bye_message = document.querySelector('#bye_message');
const pokemonText = document.querySelector('#pokemon_text');
const errorBox = document.querySelector('#error_message');
let url;
let pokemonCount = 0;
let noPokemon = "";

//waits for search submission, then sends to makeURL function
searchForm.addEventListener("submit", makeURL);


function makeURL (e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  if (noPokemon) { errorBox.style.display = "none";};
  if (noPokemon) { noPokemon.innerText = "";}; //clears the error message text

  if (searchTerm.value > 898 || searchTerm.value < 1 ) { //if number input is beyond range of pokemon numbers or negative, returns error text
    noPokemon = document.createElement('span');
    noPokemon.innerText = "Sorry, that pokemon number does not exist! Please try again."
    errorBox.appendChild(noPokemon);
    errorBox.style.display = "block";
    searchTerm.value = "";
    return;
  } else {
  let lowerCaseSearch = searchTerm.value.toLowerCase(); //sets all text input to lowercase, to match API input needs

  if (lowerCaseSearch[0] === "#") { //removes # if user inputed a leading hashtag into field with number
    lowerCaseSearch = lowerCaseSearch.split("#", 2)[1];
  }

  let finalSearch = lowerCaseSearch.trim(); //trims off any whitespace before or after input

  url = baseURL + finalSearch + "/"; //builds url for accessing API
  console.log(url);
  searchTerm.value = ""; //resets search box to empty after search is performed
  }

  //Gets results from url
  fetch(url)
  .then(results => results.json())
  .then(json => displayPokemon(json))
  //if inputed pokemon name returns 404 not found, sends error
  .catch(err => { //displays an error if text entered is not a pokemon name
    console.log(err);
    noPokemon = document.createElement('span');
    noPokemon.innerText = "Sorry, that pokemon name does not exist! Please try again."
    errorBox.appendChild(noPokemon);
    errorBox.style.display = "block";
  });

}
let pokemonList = []; //creates array of inputed pokemon

function displayPokemon (jsonData) {
  // if (noPokemon) { noPokemon.innerText = "";}; //clears any previous error text
  // if (noPokemon) { errorBox.style.display = "none";};
  pokemonText.style.display = "block"; //turns on pokemon appears message
 
  //creates pokemon image and appends to div
  let currentImage = document.createElement('img');
  currentImage.src = jsonData.sprites.front_default;
  pokemonDiv.appendChild(currentImage);

  //creates headline text of newest pokemon to appear, and removes old headline text
  let originalName = document.querySelector('h2');
  if (originalName) { originalName.remove();};
  let currentPokeName = document.createElement('h2');
  currentPokeName.innerText = `A wild ${jsonData.name} appeared!`;
  pokemon_text.appendChild(currentPokeName);

  //sends newest inputed pokemon to pokemon array
  pokemonList.push(jsonData.name);
  console.log(pokemonList);
  
  //raises the pokemon inputed count by one
  pokemonCount++;
  console.log(pokemonCount);

  //if pokemonCount reaches 7, begin removing old pokemon and give transfer message
  if (pokemonCount == 7) {
    console.log("PART ONE RUNS");
    if (noPokemon) { noPokemon.innerText = "";}; //remove old error message
    console.log(pokemonDiv.firstChild);
    pokemonDiv.firstChild.remove(); //supposed to remove oldest pokemon DOESN'T WORK
    byeBye = document.createElement('p');
    byeBye.innerText = `Your party is full, ${pokemonList[0]} has been transferred to Bill's PC!`;
    // pokemonList.shift(); //removes oldest pokemon from name list
    bye_message.style.display = "block"; //make tranfer message visible
    bye_message.appendChild(byeBye);
    console.log(pokemonCount); 
    pokemonList.shift(); //remove oldest pokemon name from array
    }
    else if (pokemonCount >= 8) { //same as above, but remove original transfer message
    console.log("PART TWO RUNS")
    pokemonDiv.firstChild.remove(); //remove pokemon
    bye_message.firstChild.remove();
    // bye_message.style.display = "block"; //turns on transfer message display at bottom
    byeBye = document.createElement('p');
    byeBye.innerText = `Your party is full, ${pokemonList[0]} has been transferred to Bill's PC!`;
    bye_message.appendChild(byeBye);
    // console.log(pokemonCount); //just for checking
    pokemonList.shift(); //removes oldest pokemon name from array
  }
}
