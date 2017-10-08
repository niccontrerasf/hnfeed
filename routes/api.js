var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require('mongodb');

//no valid url link
router.get("/none",(req,res)=>{
    res.end("There is no valid url");
});

router.get("/",(req,res)=>{
    
    request.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs','',function(err,respo,body){
        var bodyjson = JSON.parse(body);
        bodyjson = bodyjson.hits
        if(err)
            console.log("Error: "+err);
        else{
            for(var i in bodyjson){
                console.log(bodyjson[i].objectID);
            }
            //console.log(bodyjson);
        }

        res.render("index", {
            title:"HN Feed",
            user : "pop",
            news : bodyjson
        });
    });        
});


module.exports = router;