var express = require('express');
var router = express.Router();
var fieldsService = require("../services/fieldsService");

router.get('/fields',function(req, res, next) {
    if (req.query.location == undefined && req.query.city == undefined) {
        res.status(400).json({error:"Missing parameter"});   
    } else {
        next();
    }
});

router.get('/fields',function(req, res, next) {
    
    var result = {};
    
    if (req.query.location) {

        var location = [];        
        req.query.location.split(",").map(function(val){
            location.push(parseInt(val));   
        });
        
        promise = fieldsService.getFieldsByLocation(location);
        
        promise.then(function(result) {
                res.status(200).json(result)
        });        
    } else if (req.query.city) {
        var radius = 50;
        if (req.query.radius) {
            radius = req.query.radius;
        }
        
        result = fieldsService.getFieldsByCity(req.query.city,radius);
        console.log(result, radius);
    }    
});

module.exports = router;