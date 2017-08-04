var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.genRandIVs = function() {
    return Math.ceil((Math.random()*15));
}
exports.genGender = function() {
    return Math.random() > 0.5 ? 'male' : 'female';
}

var PokemonSchema = new mongoose.Schema({
    dex: {
        type: String,
        required: 'Kindly enter the pokemon national dex number'
    },
    dex_entry: {
        type: Schema.Types.ObjectId,
        ref: 'Pokedex'
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
    gender: {
        type: String,
        default: exports.genGender
    },
    exp: {
        type: Number,
        default: 0
    },
    lvl:{
        type: Number,
        default: 0
    },
    next_lvl: {
        type: Number,
        default: 0
    },
    mate: {
        type: Schema.Types.ObjectId,
        ref: 'Pokemon'
    },
    busyUntil: Date,
    IVs: {
        ATK: {
            type: Number,
            default: exports.genRandIVs
        },
        HP: {
            type: Number,
            default: exports.genRandIVs
        },
        DEF: {
            type: Number,
            default: exports.genRandIVs
        },
        SPD: {
            type: Number,
            default: exports.genRandIVs
        },
        SDE: {
            type: Number,
            default: exports.genRandIVs
        },
        SAT: {
            type: Number,
            default: exports.genRandIVs
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Pokemon', PokemonSchema);
module.exports = mongoose.model('Pokemon');
