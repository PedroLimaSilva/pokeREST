'use strict';

var mongoose = require('mongoose'),
  Pokemon = mongoose.model('Pokemon');

exports.list_all_pokemon = function(req, res) {
  Pokemon.find({})
          .populate('dex_entry', '-dex -_id -sprites')
          .exec(function(err, pokemon) {
            if (err)
              res.send(err);
            res.json(pokemon);
          });
};

exports.create_a_pokemon = function(req, res) {
  var new_pokemon = new Pokemon(req.body);
  new_pokemon.save(function(err, pokemon) {
    if (err)
      res.send(err);
    res.json(pokemon);
  });
};

exports.read_a_pokemon = function(req, res) {
  Pokemon.findById(req.params.pokemonId, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json(pokemon);
  });
};

exports.update_a_pokemon = function(req, res) {
  Pokemon.findOneAndUpdate({_id: req.params.pokemonId}, req.body, {new: true}, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json(pokemon);
  });
};

exports.delete_a_pokemon = function(req, res) {
  Pokemon.remove({
    _id: req.params.pokemonId
  }, function(err, pokemon) {
    if (err)
      res.send(err);
    res.json({ message: 'Pokemon successfully deleted' });
  });
};
