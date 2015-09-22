var express = require('express');
var router = express.Router();
var fieldsService = require("../services/fieldsService");
var bodyParser = require('body-parser');

router.get('/fields',function(req, res, next) {
    if (req.query.location == undefined && req.query.city == undefined) {
        res.status(400).json({error:"Missing parameter"});   
    } else {
        next();
    }
});

router.get('/fields',function(req, res) {
        
    if (req.query.location) {

        var location = [];        
        req.query.location.split(",").map(function(val){
            location.push(parseInt(val));   
        });
        
        promise = fieldsService.getFieldsByLocation(location);
        
        promise.then(function(fields) {
            
            var result = [];
            
            fields.map(function(val) {
                result.push({
                    name: val.name,
                    description: val.description, 
                    location: val.location.coordinates
                });
            });
            
            return result;
        }).then(function(fields) {
            res.status(200).json(fields)
        });       
        
    } else if (req.query.city) {
        res.status(204).send("TBD");
    }    
});

router.use(bodyParser.json());

router.post('/fields', function(req, res, next) {
    var body = req.body;
    
    if (!body.name || !body.location) {
        res.status(400).json({error:"missing or malformed mandatory field"});       
    }
    
    next();
});

router.post('/fields', function(req, res) {
    var body = req.body;
    
    var field = {
        name: body.name,
        location: body.location,
    }
    
    if (body.description)
        field.description = body.description;
        
    promise = fieldsService.saveField(field);
    
    promise.then(
        function(result) {
            console.log(result);
            res.status(201);
        },
        function(err) {
            console.log(err);
        }
    );
    
});


module.exports = router;