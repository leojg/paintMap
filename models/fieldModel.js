var mongoose = require('mongoose');
var util = require('util');


var fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: { 
        type: {}, 
        index: '2dsphere',
        validate: function(location) {
            return (util.isArray(location) && location.length == 2);   
        }
    },
    description: String
});

fieldSchema.pre('save', function(next) {
    
    coords = this.location;     
    this.location = {
        type:"Point",
        coordinates:coords
    };
    
    next();
});

mongoose.model('Field', fieldSchema);