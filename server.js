let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();
let PORT = 3000;

// set up app tp handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// make sql call here and store result into array of objects
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];
  

  //routes
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // api route


  app.get('/api/characters/:character', function(req, res) {
    // connect to db to make a sequelize call to db to get yoda 
    let chosen = req.params.character;
    for(var i = 0; i < characters.length; i++) {
        if (chosen == characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    return res.send('no character found');
});
  app.get('/api/characters', function(req, res) { 
      return res.json(characters);
});

  // create new characters
  app.post('/api/characters', function(req, res) {
      let newcharacter = req.body;
      // parse the body, but parseBody does that
      console.log(newcharacter);
      characters.push(newcharacter);

      res.json(newcharacter);
  });

  //listeners

  app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
  });
  