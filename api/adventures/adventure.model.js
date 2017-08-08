var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdventureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please include a short adventure description'
    },
    duration: {
        type: Number,
        required: 'Please include the adventure\'s duration in minutes'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Pokemon'
    },
    completedOn: Date,
    successful: Boolean,
    claimed: {
        type: Boolean,
        default: false
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
    },
    claimedRewards:[String]
});

mongoose.model('Adventure', AdventureSchema);
module.exports = mongoose.model('Adventure');