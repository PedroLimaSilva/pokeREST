'use strict';

var mongoose = require('mongoose'),
  LevelTable = mongoose.model('Level');

exports.get_levels = function(req, res) {
  LevelTable.find({}, function(err, table) {
    if (err)
      res.send(err);
    res.json(table);
  }).sort({ level: 'asc' });
};

exports.add_entry = function(req, res) {
  var new_entry = new LevelTable(req.body);
  new_entry.save(function(err, entry) {
    if (err)
      res.send(err);
    res.json(entry);
  });
};

exports.read_a_level = function(req, res) {
  LevelTable.find({level: req.params.level}, function(err, level) {
    if (err)
      res.send(err);
    res.json(level);
  });
};
