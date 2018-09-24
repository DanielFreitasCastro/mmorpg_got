var mongo = require('mongodb');
var url = "mongodb://127.0.0.1:27017/got";

var connMongoDB = {
    insert: function (user) {
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('usuarios', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);
                collection.insertOne(user);
                db.close();
            });
        });
    },
    autenticar: function (user, req, res) {
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('usuarios', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);

                collection.find(user).toArray(function (err, result) {
                    req.session.autorizado = false;
                    if(result[0] !== undefined){
                        req.session.autorizado = true;
                        req.session.usuario = result[0].usuario;
                        req.session.casa = result[0].casa;
                    }
                    
                    if(req.session.autorizado){
                        res.redirect("jogo");
                    }else{
                        res.render('index', {
                            validacao: {},
                            formulario: {}
                        });
                    }
                });

                db.close();
            });
        });
    }
};

module.exports = function () {
    return connMongoDB;
};
