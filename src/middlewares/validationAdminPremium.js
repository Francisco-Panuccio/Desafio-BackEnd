export async function validationAdminPremium(req, res, next){
    if(req.session.email === ("adminCoder@coder.com") || req.session.userRole === "Premium") {
        next()
    } else {
        return res.redirect("/sessionExpired")
    }
}