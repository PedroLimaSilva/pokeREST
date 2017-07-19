'use strict';

var mongoose = require('mongoose'),
  Trainer = mongoose.model('Trainer');

exports.get_all_trainers = function(req, res) {
    Trainer.find({}, function(err, trainers) {
        if (err)
            res.send(err);
        res.json(trainers);
    }).sort({ created_at: 'desc' });
};

exports.get_trainer = function(req, res) {
    Trainer.findById(req.params.trainerId, function(err, trainer) {
        if (err)
            res.send(err);
        res.json(trainer);
    });
};

exports.update_trainer = function(req, res) {
    Trainer.findOneAndUpdate({_id: req.params.trainerId}, req.body, {new: true}, function(err, trainer) {
        if (err)
            res.send(err);
        res.json(trainer);
    });
};

exports.get_trainer_dex = function(req, res) {
    Trainer.findById(req.params.trainerId, function(err, trainer) {
        if (err)
            res.send(err);
        if(!trainer){
            res.json({ message: 'No trainer found by the Id' + req.params.trainerId });;
            return;
        }
        res.json(trainer.caught);
    });
};

exports.add_dex = function(req, res) {
    Trainer.findById(req.params.trainerId, function(err, trainer) {
        if (err)
            res.send(err);
        if (trainer && trainer.caught){
            let i = 0;
            let newPokemon = req.body.dex;
            while(i< trainer.caught.length && trainer.caught[i] < newPokemon){
                i++;
            }
            if (newPokemon === trainer.caught[i]){
                res.json(trainer);
                return;
            }
            trainer.caught.splice(i, 0, newPokemon);
            trainer.save(function(err, trainer) {
                if (err)
                    res.send(err);
                res.json(trainer);
            });
        }
    });
};