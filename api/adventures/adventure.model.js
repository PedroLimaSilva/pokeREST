var mongoose = require('mongoose');

var AdventureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please include a short adventure description'
    },
    duration: {
        type: Number,
        required: 'Please include the adventure\'s duration in minutes'
    },
    recTypes: [String],
    avoidTypes: [String],
    lvl: {
        type: Number,
        required: 'Please include a recommended lvl'
    },
    rewards: {
        exp: Number,
        eggs: {
            type: [{
                dex: String,
                probability: {
                    type: Number,
                    required: 'Please include a probability this egg is found'
                }
            }]
        }
    }
});

mongoose.model('Adventure', AdventureSchema);
module.exports = mongoose.model('Adventure');