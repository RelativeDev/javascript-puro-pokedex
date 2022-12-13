const pokeapi = {}


function convertPokeApiToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon)     
}

pokeapi.getPokemons =  (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemons) => pokemons)
}

function convertfinal(pokemon) {
    const newPokemon = new Pokemon()

    newPokemon.number = pokemon.id
    newPokemon.name = pokemon.name

    newPokemon.abilities = pokemon.abilities.map((abilitie) => abilitie.ability.name)

    newPokemon.capture_rate = pokemon.NewObject.capture_rate

    newPokemon.habitat = pokemon.NewObject.habitat.name

    newPokemon.height = pokemon.height + '0 cm'

    newPokemon.species = pokemon.NewObject.genera[7].genus.replaceAll(' Pokémon','')

    newPokemon.weight = pokemon.weight + '00 g'

    newPokemon.egg_groups = pokemon.NewObject.egg_groups.map((abilitie) => abilitie.name)

    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    newPokemon.types = types
    newPokemon.type = type

    newPokemon.photo = pokemon.sprites.other.dream_world.front_default

    return newPokemon;
}


pokeapi.detalhesFinais = (id) => {
    let json = {};
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return fetch(url)
        .then((response) => response.json())
        .then((pokemons) => {
            json = pokemons;
            return fetch(pokemons.species.url)
        })
        .then((detailRequests) => detailRequests.json())
        .then((pokemons) => {
            json.NewObject = pokemons;
            return json;
        })
        .then(convertfinal)
        .then((pokemons) => pokemons)
}






