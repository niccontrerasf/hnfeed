var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var url = "mongodb://localhost:27017/hnfeed";

exports.MongoClient = MongoClient;
exports.url = url;

exports.createBd = ()=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      lo("Database created!");
      db.close();
    });
}

exports.createColl = ()=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.createCollection("hit", function(err, res) {
        if (err) throw err;
        lo("Collection created!");
        db.close();
      });
    });
}

function lo(a){
    console.log(a);
}