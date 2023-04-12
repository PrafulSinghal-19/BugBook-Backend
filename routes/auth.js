const route = require("express").Router();
const auth = require("../controllers/auth");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/login";

route.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }

  else {
    res.status(400).json(new Error("No User Found"))
  }

  return res;
});

route.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

route.get("/logout", async (req, res) => {
  req.logOut();
  res.clearCookie("session");
  res.clearCookie("session,sig");
  res.redirect(CLIENT_URL);
});

route.post(
  "/logIn",
  passport.authenticate("logIn", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

route.post(
  "/signIn",
  auth.isRegistered,
  passport.authenticate("signIn", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

route.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

route.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = route;
