const mongoose = require('mongoose');
const joi = require('@hapi/joi');

var adminSchema = mongoose.Schema({
    Email: String,
    Password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

//for login auth
function validateAdminLogin(data)
{
    const schema = joi.object({
        Email: joi.string().email().min(5).required(),
        Password: joi.string().min(3).required(),
    });
    return schema.validate(data, {abortEarly: false});
}

module.exports.Admin =  Admin;
module.exports.validateAdminLogin =  validateAdminLogin;