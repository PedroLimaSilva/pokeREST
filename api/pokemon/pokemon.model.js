var mongoose = require('mongoose');

function genRandIVs() {
    return Math.ceil((Math.random()*15));
}

var PokemonSchema = new mongoose.Schema({
    dex: {
        type: String,
        required: 'Kindly enter the pokemon national dex number'
    },
    nickname: {
        type: String,
        default: ''
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
        ATK: {
            type: Number,
            default: genRandIVs
        },
        HP: {
            type: Number,
            default: genRandIVs
        },
        DEF: {
            type: Number,
            default: genRandIVs
        },
        SPD: {
            type: Number,
            default: genRandIVs
        },
        SDE: {
            type: Number,
            default: genRandIVs
        },
        SAT: {
            type: Number,
            default: genRandIVs
        }
    },
    EVs: {
        ATK: {
            type: Number,
            default: 0
        },
        HP: {
            type: Number,
            default: 0
        },
        DEF: {
            type: Number,
            default: 0
        },
        SPD: {
            type: Number,
            default: 0
        },
        SDE: {
            type: Number,
            default: 0
        },
        SAT: {
            type: Number,
            default: 0
        }
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Pokemon', PokemonSchema);
module.exports = mongoose.model('Pokemon');