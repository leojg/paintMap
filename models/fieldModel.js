var mongoose = require('mongoose');


var fieldSchema = mongoose.Schema({
    name: String,
    location: { type: {}, index: '2dsphere'},
    description: String
});

mongoose.model('Field', fieldSchema);