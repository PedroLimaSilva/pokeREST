'use strict';

var mongoose = require('mongoose'),
  Pokedex = mongoose.model('Pokedex');

exports.list_pokedex = function(req, res) {
  Pokedex.find({}, function(err, pokedex) {
    if (err)
      res.send(err);
    res.json(pokedex);
  });
};

exports.create_an_entry = function(req, res) {
  var new_entry = new Pokedex(req.body);
  new_entry.save(function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.read_an_entry = function(req, res) {
  Pokedex.findById(req.params.entryId, function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
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
exports.delete_a_pokemon = function(req, res) {
  Pokemon.remove({
    _id: req.params.pokemonId
  }, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json({ message: 'Pokemon successfully deleted' });
  });
};
*/