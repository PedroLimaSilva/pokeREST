'use strict';

var mongoose = require('mongoose'),
  EvolutionTable = mongoose.model('Evolution');

exports.get_evolutions = function(req, res) {
  EvolutionTable.find({}, function(err, table) {
    if (err)
      res.send(err);
    res.json(table);
  }).sort({ evolves_from: 'asc' });
};

exports.add_entry = function(req, res) {
  var new_entry = new EvolutionTable(req.body);
  new_entry.save(function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.read_evolutions = function(req, res) {
  EvolutionTable.find({evolves_from: req.params.dex}, function(err, evolution) {
    if (err)
      res.send(err);
    res.json(evolution);
  });
};
