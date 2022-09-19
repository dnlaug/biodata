module.exports = (app) => {
  const { verifySnp } = require("../middlewares");
  const controller = require("../controllers/auth.controller");

  var router = require("express").Router();

  // Make signup
  router.post(
    "/auth/signup",
    [verifySnp.checkDuplicateUsernameOrEmail, verifySnp.checkRolesExisted],
    controller.signup
  );

  // Make signin
  router.post("/auth/signin", controller.signin);

  // Make a new token
  router.post("/auth/refreshtoken", controller.refreshToken);

  app.use("/api", router);
};
