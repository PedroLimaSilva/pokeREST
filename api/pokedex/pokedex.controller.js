'use strict';

var mongoose = require('mongoose'),
  Pokedex = mongoose.model('Pokedex');

exports.get_pokedex = function(req, res) {
  Pokedex.find({}, function(err, pokedex) {
    if (err)
      res.send(err);
    res.json(pokedex);
  }).sort({ dex: 'asc' });
};

exports.add_entry = function(req, res) {
  var new_entry = new Pokedex(req.body);
  new_entry.save(function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.get_entry = function(req, res) {
  Pokedex.findOne({ dex: req.params.dexNumber }, function (err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

/*
exports.update_an_enty = function(req, res) {
  Pokemon.findOneAndUpdate({_id: req.params.pokemonId}, req.body, {new: true}, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json(pokemon);
  });
};
*/

/*

*/