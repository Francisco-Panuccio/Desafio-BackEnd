import passport from "passport";
import { usersModel } from "../persistence/mongoDB/models/users.model.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { addCartService } from "../service/carts.services.js";

passport.use("github", new GithubStrategy({
    clientID: "Iv1.fec2eb6bc05e9fec",
    clientSecret: "81811249b3c4a7772a33d88d7814f5c2e429a80c",
    callbackURL: "http://localhost:8080/api/users/github",
}, async (accessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({email: profile._json.email})
    if(!user) {
        const newCart = await addCartService()
        const newUser = {
            first_name: profile._json.name.split(" ")[0],
            last_name: profile._json.name.split(" ")[1] || " ",
            email: profile._json.email,
            password: " ",
            cart: newCart,
        }
        const userDB = await usersModel.create(newUser)
        done(null, userDB)
    } else {
        done(null, user)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
passport.deserializeUser(async (id, done) => {
const user = await usersModel.findById(id)
done(null, user)
})

/* App ID: 306052
Client ID: Iv1.fec2eb6bc05e9fec
Client Secret: 81811249b3c4a7772a33d88d7814f5c2e429a80c */