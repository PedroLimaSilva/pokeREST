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
    .patch(pokemonList.update_a_pokemon)
    .delete(pokemonList.delete_a_pokemon);

  // Pokedex Routes
  var pokedex = require('./pokedex/pokedex.controller');
  app.route('/pokedex')
    .get(pokedex.get_pokedex);
    // .post(pokedex.add_entry);
/*
  app.route('/pokedex/:dexNumber')
    .get(pokemonList.read_an_entry)
    .put(pokemonList.update_an_entry)
    .delete(pokemonList.delete_an_entry);
*/

  // Level Routes
  var levelTable = require('./level/level.controller');
  app.route('/level')
    .get(levelTable.get_levels)
    .post(levelTable.add_entry);
  app.route('/level/:level')
    .get(levelTable.read_a_level);

  // Evolution Routes
  var evolutionTable = require('./evolution/evolution.controller');
  app.route('/evolution')
    .get(evolutionTable.get_evolutions)
    .post(evolutionTable.add_entry);
  app.route('/evolution/:dex')
    .get(evolutionTable.read_evolutions);
};