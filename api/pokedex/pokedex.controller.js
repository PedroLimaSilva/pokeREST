'use strict';

var mongoose = require('mongoose'),
  Pokedex = mongoose.model('Pokedex');

exports.get_pokedex = function(req, res) {
  Pokedex.find({}, function(err, pokedex) {
    if (err)
      res.send(err);
    res.json(pokedex.pokedex);
  });
};

exports.publish_pokedex = function(req, res) {
  var new_entry = new Pokedex(req.body);
  new_entry.save(function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.purge_pokedex = function(req, res) {
  Pokemon.remove({}, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json({ message: 'Pokedex successfully deleted' });
  });
};

/*
exports.update_a_pokemon = function(req, res) {
  Pokemon.findOneAndUpdate({_id: req.params.pokemonId}, req.body, {new: true}, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json(pokemon);
  });
};
*/

/*

*/