const mongoose = require('mongoose');
const joi = require('@hapi/joi');

var userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
});

const User = mongoose.model("User", userSchema);

//for signup auth
function validateUserRegistration(data)
{
    const schema = joi.object({
        Name: joi.string().min(3).required(),
        Email: joi.string().email().min(5).required(),
        Password: joi.string().min(3).required(),
    });
    return schema.validate(data, {abortEarly: false});
}
//for login auth
function validateUserLogin(data)
{
    const schema = joi.object({
        Email: joi.string().email().min(5).required(),
        Password: joi.string().min(3).required(),
    });
    return schema.validate(data, {abortEarly: false});
}

module.exports.User =  User;
module.exports.validateUserLogin =  validateUserLogin;
module.exports.validateUserRegistration =  validateUserRegistration;