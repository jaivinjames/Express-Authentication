let mongoose = require('mongoose');

// create a model class
let userModel = mongoose.Schema({
    username: String,
    password: String,
    email: String
},
{
    collection: "users"
});

module.exports = mongoose.model('Users', userModel);