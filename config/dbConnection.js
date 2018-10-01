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
    insertJogo: function (infos) {
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('jogo', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);
                collection.insertOne(infos);
                db.close();
            });
        });
    },
    iniciaJogo: function (res, usuario, casa, msg) {
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('jogo', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);

                collection.find({
                    usuario: usuario
                }).toArray(function (err, result) {
                    res.render('jogo', {
                        imgCasa: casa,
                        jogo: result[0],
                        mensagem: msg
                    });
                    db.close();
                });
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
                    if (result[0] !== undefined) {
                        req.session.autorizado = true;
                        req.session.usuario = result[0].usuario;
                        req.session.casa = result[0].casa;
                    }

                    if (req.session.autorizado) {
                        res.redirect("jogo");
                    } else {
                        res.render('index', {
                            validacao: {},
                            formulario: {}
                        });
                    }
                });

                db.close();
            });
        });
    },
    executaAcao: function (params, res) {
        var date = new Date();
        var tempo = 0;
        switch (params.acao) {
            case 1:
                tempo = 1 * 60 * 60000;
                break;
            case 2:
                tempo = 2 * 60 * 60000;
                break;
            case 3:
            case 4:
                tempo = 5 * 60 * 60000;
                break;
        }
        params.acao_termina_em = date.getTime() + tempo;
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('acao', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);
                collection.insertOne(params);
                res.redirect("jogo?msg=B");
                db.close();
            });
        });
    },
    getAcoes: function (res, usuario) {
        mongo.MongoClient.connect(url, function (err, db) {
            if (err) return console.log("error", err);
            var database = db.db("got");
            database.collection('acao', function (errCollection, collection) {
                if (errCollection) return console.log("error", errCollection);

                collection.find({
                    usuario: usuario
                }).toArray(function (err, result) {
                    res.render('pergaminhos', {
                        acoes: result
                    });
                    db.close();
                });
            });
        });
    }
};

module.exports = function () {
    return connMongoDB;
};
