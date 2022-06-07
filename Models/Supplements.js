var mongoose = require("mongoose")
const joi = require('@hapi/joi');

const supplementSchema = new mongoose.Schema({
    Name:
    {
        type: String,
        required: true,
    },
    Price:
    {
        type: String,
        required:true,
    },
    Servings:
    {
        type:String,
        required:true,
    },
    Discount:
    {
        type:String,
        required:true,
    }
});
const Supplements = mongoose.model('Supplements', supplementSchema);

function validateSupplement(data)
{
    const schema = joi.object({
        Name: joi.string().min(3).required(),
        Price: joi.string().min(5).required(),
        Servings: joi.string().min(3).required(),
        Discount: joi.string().min(2).required(),
    });
    return schema.validate(data, {abortEarly: false});
}

module.exports.Supplements =  Supplements;
module.exports.validate =  validateSupplement;
