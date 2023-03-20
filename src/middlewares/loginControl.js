export async function loginControl(req, res, next){
    if(!req.session.hasOwnProperty("email") || !req.session.hasOwnProperty("passport")) {
        next()
    } else {
        if(req.session.userRol === "Admin") {
            return res.redirect("/indexAdmin")
        } else {
            return res.redirect("/index")
        }
    }
}