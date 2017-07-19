var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrainerSchema = new mongoose.Schema({
    authID: {
        type: String,
        required: 'A trainer needs to be assinged to an authentication object'
    },
    name: {
        type: String,
        required: 'A trainer needs a name'
    },
    caught: [{type: String, required: 'Caught Pokemon needs a dex entry'}],
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Trainer', TrainerSchema);
module.exports = mongoose.model('Trainer');
