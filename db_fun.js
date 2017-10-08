'use strict'
var conn = require('./connection.js');
var request = require('request');
var moment = require('moment');
var url = conn.url;


//check if hit already and return count (should be 1 or 0)
function existe(ide, dat, callback){
    conn.MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("hit").find({ objectID:ide, created_at_i:dat}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            callback(result.length);
        });
    });
}


//get all hits from db sort by date
exports.getHits = (cb)=>{
    conn.MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("hit").find({}).sort({created_at:-1}).toArray(function(err, result) {
            if (err) throw err;
            //lo(result.length);
            db.close();
            cb(result);
        });
    });
}

//delete 1 element by id and return success for ajax validation
exports.remo = (id,cb)=>{
    conn.MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { _id: id };
    db.collection("hit").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        if (obj.result.n >= 1) console.log("1 document deleted");
        db.close();
        cb(obj.result.n);
        });
    });
}


//search for new hits if it exist insert them to db
exports.anynews = function (){
    request.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs','',function(err,respo,body){
        var bodyjson = JSON.parse(body).hits;
        var narr = [];
        if(err) console.log("Error: "+err);
        else{
            var urdy = 0, fin=bodyjson.length;
            for(let i = bodyjson.length-1; i>=0 ; i--){
                bodyjson[i]._id = bodyjson[i].objectID;//create id

                //check if already exist, if it is not insert it          
                existe(bodyjson[i].objectID,bodyjson[i].created_at_i,(len)=>{
                    //lo(bodyjson[i]._id);
                    if(len == 0) narr.push(bodyjson[i]);
                    urdy++;
                    if(urdy == fin){
                        if(narr.length){
                             conn.MongoClient.connect(url, function(err, db) {
                                 lo("======== trying to insert "+narr.length+" ===========");
                                    if (err) throw err;
                                    db.collection("hit").insertMany(narr,(err, res)=>{
                                        if (err) console.log(err);
                                        else lo(narr.length+" document inserted");
                                        db.close();
                                    });
                            });
                        }
                        else lo("*nothing to insert* up-to-date");
                    }   
                });
            }
        }
        
    lo("Last check: "+moment(Date.now()).format('llll'));
    });
}

function lo(a){
    console.log(a);
}