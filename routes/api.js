var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require('mongodb');
var tx = require('../db_fun.js');

//no valid url link
router.get("/none",(req,res)=>{
    res.end("There is no valid url");
});

//home get all document from db and sent as JSON to pug template
router.get("/",(req,res)=>{
    tx.getHits((cb)=>{
        var bjson = cb;
        res.render("index", {
            title:"HN Feed",
            user : "pop",
            news : bjson
        });
    });
});

router.post("/delete/:id",(req,res)=>{
    tx.remo(req.params.id,(cb)=>{
        res.jsonp({fin:cb});//return from db        
    });
});


module.exports = router;