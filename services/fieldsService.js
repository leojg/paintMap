var mongoose = require('mongoose');

require('../models/fieldModel');

var Field = mongoose.model('Field');


module.exports = {
    getFieldsByLocation: function(location) {
        
        var query = {
            "location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates:[-34.89,-56.18]
                    },
                    $maxDistance : 20000
                }
            }
        };
        
        queryStr = JSON.stringify(query);
                
        var promise = Field.find(queryStr).exec()
        
        return promise;
    },
    
    getFieldsByCity: function(city, radius) {
        return "TBD";        
    },
    
    saveField: function(f) {
        
        var field = new Field(f);
        
        var promise = field.save();
    }
    
};