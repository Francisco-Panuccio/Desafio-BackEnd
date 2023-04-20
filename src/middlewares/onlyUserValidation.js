export async function onlyUserValidation(req, res, next){
    if(req.session.email === ("adminCoder@coder.com")) {
        return res.redirect("/sessionExpired")
    } else {
        next()
    }
}