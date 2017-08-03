'use strict';

var mongoose = require('mongoose'),
    Adventure = mongoose.model('Adventure');

exports.get_adventures = function (req, res) {
    Adventure.find({}, function (err, adventures) {
        if (err)
            res.send(err);
        res.json(adventures);
    }).sort({ lvl: 'asc' });
};

exports.add_adventure = function (req, res) {
    var new_adventure = new Adventure(req.body);
    new_adventure.save(function (err, adventure) {
        if (err)
            res.send(err);
        res.json(adventure);
    });
};

exports.get_adventure = function (req, res) {
    Adventure.findOne({ _id: req.params.id }, function (err, adventure) {
        if (err)
            res.send(err);
        res.json(adventure);
    });
};