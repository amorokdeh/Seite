var express = require('express');
var mysql = require('mysql');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/dist/seite')));

app.get('/', function(req,res)
{
    res.sendFile('index.html', {root: __dirname+'/dist/seite'});

});

app.listen(process.env.PORT || 8080, function(){    
  console.log("App listening on port http://localhost:8080");
});

  //Notwendige Informationen für die Verbindung zur MySQL-Datenbank
  const pool = mysql.createPool({
    host: "eu-cdbr-west-03.cleardb.net",
    port: "3306",
    user: "b7ffd035b7b257",
    password: "65ea2445",
    database: "heroku_7f7487bdff2a71b"
  }); 

  

  //User Login-Anfrage
  app.get('/api/userlist/:username/:passwort', function(req, res)
  {
        const username = (req.params.username);
        const passwort = (req.params.passwort);
        var sql = "SELECT * FROM benutzer WHERE benutzername = ? AND passwort = ?;";
        var values = [username, passwort];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //User suchen (bei Username)
  app.get('/api/userlist/:username', function(req, res)
  {
        const username = (req.params.username);
        var sql = "SELECT * FROM verwaltung WHERE benutzername = ?;";
        var values = [username];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //change profil data
  app.put('/api/changeUser', function(req, res)
  {
        const oldUsername = (req.body.oldUsername);
        const username = (req.body.username);
        const passwort = (req.body.passwort);
        var sql = "UPDATE benutzer SET benutzername = ?, passwort = ? WHERE benutzername = ?;";
        var values = [username, passwort, oldUsername];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //change management data
  app.put('/api/changeVerwaltung', function(req, res)
  {
        const username = (req.body.username);
        const oldUsername = (req.body.oldUsername);
        var sql = "UPDATE verwaltung SET benutzername = ? WHERE benutzername = ?;";
        var values = [username, oldUsername];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //Mitarbeiter Registrierung in die Datenbank ein 
  app.post('/api/register', function(req,res) {
    const username = req.body.username;
    const passwort = req.body.passwort;
    const sql = "INSERT INTO benutzer (benutzername, passwort) VALUES(?, ?)";
    const values = [username, passwort];

    pool.query(sql, values,
      function (error, result, fields) {
        if(error) res.send(error);
        res.send(result);
      })
  });

  //Mitarbeiter Registrierung in Verwaltung 
  app.post('/api/regVerwaltung', function(req,res) {
    const username = req.body.username;
    const berechtigung = "Mitarbeiter";
    const sql = "INSERT INTO verwaltung (benutzername, berechtigung) VALUES(?, ?)";
    const values = [username, berechtigung];

    pool.query(sql, values,
      function (error, result, fields) {
        if(error) res.send(error);
        res.send(result);
      })
  });

  //delete Mitarbeiter data
  app.put('/api/deleteUser', function(req, res)
  {
        const username = (req.body.username);
        var sql = "DELETE FROM benutzer WHERE benutzername = ?;";
        var values = [username];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //delete Mitarbeiter data
  app.put('/api/deleteUserInVerwaltung', function(req, res)
  {
        const username = (req.body.username);
        var sql = "DELETE FROM verwaltung WHERE benutzername = ?;";
        var values = [username];
        sql=mysql.format(sql, values);
    
        pool.query(sql, values, function(err, result, fields)
        {
          if(err) throw err;
          res.send(result[0]);
        });
  });

  //get all users
  app.get('/api/allUsers', function(req, res) {
    pool.query("SELECT * FROM verwaltung", function(err, result, fields) {
      if(err) throw err;
      res.send(result);
    }); 
});

  //for refresh the web site
  app.route('/*').get(function (req, res) {
    return res.sendFile('index.html', {root: __dirname+'/dist/seite'});
  });