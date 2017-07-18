'use strict';

var mongoose = require('mongoose'),
  Pokemon = mongoose.model('Pokemon'),
  Pokedex = mongoose.model('Pokedex'),
  PokemonMethods = require('./pokemon.model');

function genRandIVs() {
    return Math.ceil((Math.random()*15));
}
function genGender() {
    return Math.random() > 0.5 ? 'male' : 'female';
}


exports.list_all_pokemon = function(req, res) {
  Pokemon.find({})
          .populate('dex_entry', '-_id -sprites')
          .exec(function(err, pokemon) {
            if (err)
              res.send(err);
            res.json(pokemon);
          });
};

exports.create_a_pokemon = function(req, res) {
  var new_pokemon = new Pokemon(req.body);
  new_pokemon['created_at'] = Date.now();
  if(!new_pokemon.gender)
    new_pokemon['gender'] = genGender();
  if(!new_pokemon.IVs){
    new_pokemon['IVs']['SAT'] = genRandIVs();
    new_pokemon['IVs']['SDE'] = genRandIVs();
    new_pokemon['IVs']['SPD'] = genRandIVs();
    new_pokemon['IVs']['ATK'] = genRandIVs();
    new_pokemon['IVs']['DEF'] = genRandIVs();
    new_pokemon['IVs']['HP'] = genRandIVs();
  }
  Pokedex.findOne({dex: new_pokemon.dex}, function(err, entry){
    new_pokemon['dex_entry'] = entry._id;
    console.log(new_pokemon);
    if(new_pokemon.lvl==0){
      new_pokemon['exp'] = -entry.egg_steps;
      new_pokemon['lvl'] = 0;
      new_pokemon['next_lvl'] = entry.egg_steps;
    }
    new_pokemon.save(function(err, pokemon) {
      if (err)
        res.send(err);
      res.json(pokemon);
    });
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
