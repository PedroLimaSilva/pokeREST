'use strict';
module.exports = function(app) {
  // Seminaries Routes
  var pokemonList = require('./pokemon/pokemon.controller');
  app.route('/pokemon')
    .get(pokemonList.list_all_pokemon)
    .post(pokemonList.create_a_pokemon);
  app.route('/pokemon/:pokemonId')
    .get(pokemonList.read_a_pokemon)
    .put(pokemonList.update_a_pokemon)
    .delete(pokemonList.delete_a_pokemon);
};