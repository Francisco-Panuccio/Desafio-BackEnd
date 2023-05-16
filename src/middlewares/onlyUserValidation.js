export async function onlyUserValidation(req, res, next){
    if(req.session.email === ("adminCoder@coder.com") || req.session.userRole === "Premium") {
        return res.redirect("/sessionExpired")
    } else {
        next()
    }
}