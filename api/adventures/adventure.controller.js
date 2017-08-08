'use strict';

var mongoose = require('mongoose'),
    Adventure = mongoose.model('Adventure'),
    Pokedex = mongoose.model('Pokedex'),
    Pokemon = mongoose.model('Pokemon');

function isSuccessful( chance ) {
    return Math.random() <= (chance/100);
}
function genRandIVs() {
    return Math.ceil((Math.random() * 15));
}
function genGender() {
    return Math.random() > 0.5 ? 'male' : 'female';
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

exports.updateAdventure = function (req, res) {
    Adventure.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, adventure) {
        if(req.body.assignedTo) {
            assign(req, res, err, adventure);
        }
        if(req.body.claimed){
            claim(req, res, err, adventure);
        }
        if (err)
            res.send(err);
        res.json(adventure);
    });
};

function assign (req, res, err, adventure) {
    Pokemon.findById({ _id: req.body.assignedTo }, function (err, pokemon) {
        pokemon['busyUntil'] = new Date(new Date(Date.now()).getTime() + adventure.duration * 60000);
        adventure.completedOn = pokemon.busyUntil;
        adventure.successful = (Math.random() > (req.body.successRate / 100));
        adventure.save(function () {
            if (err)
                res.send(err);
        })
        pokemon.save(function () {
            if (err)
                res.send(err);
        });
    });
}

function claim (req, res, err, adventure) {
    if (adventure.successful) {
        // Update EXP
        Pokemon.findByIdAndUpdate({ _id: adventure.assignedTo }, function (err, pokemon) {
            pokemon.exp += adventure.rewards.exp;
            pokemon.save(function () {
                if (err){
                    console.log(err);
                    res.send(err);
                    return;
                }
            })
        });
        // Update Eggs and save inventory
        let eggs = [];
        while(eggs.length < 3){
            adventure.rewards.eggs.forEach(function(egg) {
                if(isSuccessful(egg.probability)){
                    eggs.push(egg.dex);
                }
            }, this);
        }
        eggs.forEach(function(reward) {
            let new_pokemon = new Pokemon({dex: reward});
            new_pokemon['trainerID'] = req.body.trainerId;
            new_pokemon['created_at'] = Date.now();
            new_pokemon['gender'] = genGender();
            new_pokemon['IVs'] = {};
            new_pokemon['IVs']['SAT'] = genRandIVs();
            new_pokemon['IVs']['SDE'] = genRandIVs();
            new_pokemon['IVs']['SPD'] = genRandIVs();
            new_pokemon['IVs']['ATK'] = genRandIVs();
            new_pokemon['IVs']['DEF'] = genRandIVs();
            new_pokemon['IVs']['HP'] = genRandIVs();
            Pokedex.findOne({ dex: new_pokemon.dex }, function (err, entry) {
                new_pokemon['dex_entry'] = entry._id;
                if (new_pokemon.lvl == 0) {
                    new_pokemon['exp'] = -entry.egg_steps;
                    new_pokemon['lvl'] = 0;
                    new_pokemon['next_lvl'] = entry.egg_steps;
                }
                new_pokemon.save(function (err, pokemon) {
                    if (err){
                        console.log(err);
                        res.send(err);
                        return;
                    }
                    adventure.claimedRewards.push(new_pokemon.dex);
                });
            });
        }, this);
        adventure.save(function () {
            if (err){
                console.log(err);
                res.send(err);
                return;
            }
        })
    }
}