export async function loginControl(req, res, next){
    if(req.session.hasOwnProperty("email") || req.session.hasOwnProperty("passport")) {
        if(req.session.userRol === "Admin") {
            return res.redirect("/indexAdmin")
        } else {
            return res.redirect("/index")
        }
    } else {
        next()
    }
}   