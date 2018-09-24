var mongo = require('mongodb');
var url = "mongodb://127.0.0.1:27017/got";

var connMongoDB = {
    insert: function(user){
        mongo.MongoClient.connect(url, function (err, db) {
            if(err) return console.log("error", err);
            var database = db.db("got");
            database.collection('usuarios', function(errCollection, collection) {
                if(errCollection) return console.log("error", errCollection);
                collection.insertOne(user);
                db.close();
            });
        });
    }
};

module.exports = function () {
    return connMongoDB;
};
