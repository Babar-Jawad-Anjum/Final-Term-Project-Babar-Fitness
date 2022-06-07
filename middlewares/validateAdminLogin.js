const {validateAdminLogin} = require("../Models/admin")

function validateAdmin(req,res, next)
{
    let {error} = validateAdminLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}
module.exports = validateAdmin;