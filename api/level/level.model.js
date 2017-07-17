var mongoose = require('mongoose');

var LevelSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: 'Without a level, this means nothing',
        unique: true,
        index: true
    },
    total: {
        erratic: Number,
        fast: Number,
        medium_fast: Number,
        medium_slow: Number,
        slow: Number,
        fluctuating: Number
    },
    next_lvl: {
        erratic: Number,
        fast: Number,
        medium_fast: Number,
        medium_slow: Number,
        slow: Number,
        fluctuating: Number
    },
});

mongoose.model('Level', LevelSchema);
module.exports = mongoose.model('Level');