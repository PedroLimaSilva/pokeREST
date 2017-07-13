var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pedrocas403:pokemon@ds155529.mlab.com:55529/pokebreeder',{useMongoClient: true});