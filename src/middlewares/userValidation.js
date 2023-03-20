export async function userValidation(req, res, next){
    if(req.session.hasOwnProperty("email") || req.session.hasOwnProperty("passport")) {
        next()
    } else {
        return res.redirect("/sessionExpired")
    }
}