function sessionAuth(req, res, next)
{
    //set variable for every ejs file
    res.locals.user = req.session.user;
    res.locals.admin = req.session.admin;
    next();
}
module.exports = sessionAuth;