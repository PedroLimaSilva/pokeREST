/*
var app = require('./app');

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
*/

var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Pokedex = require('./api/pokedex/pokedex.model'),
  Pokemon = require('./api/pokemon/pokemon.model'),
  Level = require('./api/level/level.model'),
  Evolution = require('./api/evolution/evolution.model'),
  Trainer = require('./api/trainer/trainer.model'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
/* connect local */
mongoose.connect('mongodb://localhost/PokeREST',{useMongoClient: true});
/* connect remote
mongoose.connect('mongodb://pedrocas403:pokemon@ds155529.mlab.com:55529/pokebreeder',{useMongoClient: true});
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var routes = require('./api/index');
routes(app);

/*
io.on('connection', (socket) => {
  console.log('user connected');
  //io.emit('message',{type:'welcome-message', text: 'Welcome to the chat'} );
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});    
  });
});
*/

http.listen(port,
  () => console.log('socket open on: ' + port),
  error => console.log(error)
);

//app.listen(port);


console.log('Pokebreeder RESTful API server started on: ' + port);
