export async function userValidationPremium(req, res, next){
    if(req.session.userRole === "Premium") {
        next()
    } else {
        return res.redirect("/sessionExpired")
    }
}