var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EvolutionSchema = new mongoose.Schema({
    evolves_from: {
        type: String,
        required: 'If this pokemon does not evolve from anything this entry is useless'
    },
    evolves_to: {
        type: String,
        required: 'If this pokemon does not evolve to anything this entry is useless'
    },
    lvl: {
        type: Number,
        default: 150 
    },
    condition: {
        type: String,
        default: ''
    }
});

mongoose.model('Evolution', EvolutionSchema);
module.exports = mongoose.model('Evolution');
