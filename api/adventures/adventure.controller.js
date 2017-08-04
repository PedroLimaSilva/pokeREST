'use strict';

var mongoose = require('mongoose'),
    Adventure = mongoose.model('Adventure'),
    Pokemon = mongoose.model('Pokemon');

function isSuccessful( chance ) {
    return Math.random() > (chance/100);
}

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
    Adventure.findById(req.params.id)
            .populate('assignedTo')
            .exec(function (err, adventure) {
                if (err)
                    res.send(err);
                res.json(adventure);
            });
};

exports.assign = function (req, res) {
    Adventure.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, adventure) {
        if(req.body.assignedTo) {
            Pokemon.findById({_id: req.body.assignedTo}, function(err, pokemon) {
                pokemon['busyUntil'] = new Date(new Date(Date.now()).getTime() + adventure.duration * 60000);
                adventure.completedOn = pokemon.busyUntil;
                adventure.successful = (Math.random() > (req.body.successRate / 100));
                adventure.save(function() {
                    if (err)
                        res.send(err);
                })
                pokemon.save(function() {
                    if (err)
                        res.send(err);
                });
            });
        }
        if (err)
            res.send(err);
        res.json(adventure);
    });
};