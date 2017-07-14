var mongoose = require('mongoose');

var PokedexSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'A pokemon needs an unique name',
        unique: true,
        index: true
    },
    dex: {
        type: String,
        required: 'Kindly enter the pokemon national dex number',
        index: true,
        unique: true
    },
    sprites: {
        front_default: String,
    },
    types: {
        type:[String],
        default:[""]
    },
    exp_group:{
        type: String,
        required: 'Every pokemon needs an exp group'
        // ref: 'EXP Group'
    },
    egg_groups: {
        type: [String],
        default: [""]
    },
    egg_steps: Number
});

mongoose.model('Pokedex', PokedexSchema);
module.exports = mongoose.model('Pokedex');