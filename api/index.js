'use strict';
module.exports = function(app) {
  // Pokemon Routes
  var pokemonList = require('./pokemon/pokemon.controller');
  app.route('/pokemon')
    .get(pokemonList.list_all_pokemon)
    .post(pokemonList.create_a_pokemon);
  app.route('/pokemon/:pokemonId')
    .get(pokemonList.read_a_pokemon)
    .put(pokemonList.update_a_pokemon)
    .delete(pokemonList.delete_a_pokemon);

  // Pokedex Routes

  var pokedex = require('./pokedex/pokedex.controller');
  app.route('/pokedex')
    .get(pokedex.get_pokedex)
    .post(pokedex.publish_pokedex)
    .delete(pokedex.purge_pokedex);
/*
  app.route('/pokedex/:pokemonId')
    .get(pokemonList.read_a_pokemon)
    .put(pokemonList.update_a_pokemon)
    .delete(pokemonList.delete_a_pokemon);
*/
};