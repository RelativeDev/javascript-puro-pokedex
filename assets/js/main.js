const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonList2 = document.getElementById("pokemonsList");
const pokemonDiv = document.getElementsByClassName("pokemon");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonList2.innerHTML += pokemonList.map((pokemon) => `
        <li onclick = "buttonDiv(${pokemon.number})" class="pokemon ${pokemon.type}">
        
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src=${pokemon.photo} alt="${pokemon.name}">
            </div>
            
        </li>
    `).join('');
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});


function buttonDiv(id) {
    pokeapi.detalhesFinais(id).then((pokemon) => {
        const body = document.getElementsByTagName('section');
        body[0].innerHTML = `
        <div class='new__content ${pokemon.type}' style="padding: 0"> 
            <div class="card ${pokemon.type}">
                <a class="link" href=""><i class="fa-solid fa-arrow-left"></i></a>
                <div class="titulo"> 
                    <h1>${pokemon.name}</h1>
                    <div class="titulo2"> 
                        <ol class="listaTipos">
                            ${pokemon.types.map((type) => `<li class="tipo1">${type}</li>`).join('')}
                        </ol>
                    </div>
                </div>
                <span class="numberCard">#${pokemon.number}</span>
                <div class="imagemDiv">
                    <img src=${pokemon.photo}>
                </div>

            </div>

            <div class="cardDetail">
                <h1>About</h1>
                <div class="grade">
                    <p>Species:</p>
                    <p class="texto">${pokemon.species}</p>
                    <p>Height:</p>
                    <p class="texto">${pokemon.height}</p>
                    <p>Weight:</p>
                    <p class="texto">${pokemon.weight}</p>
                    <p>Abilities:</p>
                    <p class="texto">${pokemon.abilities.map((type) => `${type}`).join(', ')}</p>
                    <p>Habitat:</p>
                    <p class="texto">${pokemon.habitat}</p>
                    <p>Egg Groups:</p>
                    <p class="texto">${pokemon.egg_groups.map((type) => `${type}`).join(', ')}</p>
                    <p>Capture Rate:</p>
                    <p class="texto">${pokemon.capture_rate}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementsByTagName('section')[0].style.padding = '0';
        document.getElementsByTagName('section')[0].style.backgroundColor = '#f6f8fc';
        })
}




   