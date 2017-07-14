var mongoose = require('mongoose');

var PokemonSchema = new mongoose.Schema({
    dex: {
        type: String,
        required: 'Kindly enter the pokemon national dex number'
    },
    sprites: {
        front_default: String,
    },
    trainerID: {
        type: String,
        required: 'Please include an Original Trainer ID'
    },
    ownerID: {
        type: String,
        default: this.trainerID
    },
    exp: {
        type: Number,
        default: 0
    },
    lvl:{
        type: Number,
        default: 1
    },
    egg_group: {
        type: String,
        default: ""
    },
    next_lvl: {
        type: Number,
        default: 0
    },
    IVs: {
        ATK: 0,
        HP: 0,
        DEF: 0,
        SPD: 0,
        SDE: 0,
        SAT: 0,
    },
    EVs: {
        ATK: 0,
        HP: 0,
        DEF: 0,
        SPD: 0,
        SDE: 0,
        SAT: 0,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Pokemon', PokemonSchema);
module.exports = mongoose.model('Pokemon');