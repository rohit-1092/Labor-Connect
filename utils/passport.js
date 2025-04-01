import passport from "passport";
import passport_local from "passport-local";
import { User } from "../models/index.js";

const LocalStrategy = passport_local.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]'
}, async function (username, password, done) {
    try {
        const user = await User.findOne({ username: username });
        if (!user || !user.validatePassword(password)) {
            return done(null, false, { error: 'Invalid username and/or password, please try again' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));