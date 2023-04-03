const route = require("express").Router();
const auth = require("../controllers/auth");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/login";

route.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user
        });
    }     
    return res;
});

route.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
})

route.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})

route.post("/logIn", auth.logIn);
route.post("/signIn", auth.signIn);

route.get("/google",passport.authenticate('google', { scope: ['profile','email'] }));

route.get("/google/callback", passport.authenticate('google', { successRedirect: CLIENT_URL, failureRedirect: "/login/failed" }));

route.get("/github", passport.authenticate('github', { scope: ['user:email'] }));

route.get("/github/callback", passport.authenticate('github', { successRedirect: CLIENT_URL, failureRedirect: "/login/failed" }));

module.exports = route;