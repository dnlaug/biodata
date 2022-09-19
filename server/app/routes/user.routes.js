module.exports = (app) => {
  const { authJwt } = require("../middlewares");
  const controller = require("../controllers/user.controller");

  var router = require("express").Router();

  //Get admin page
  router.get(
    "/board/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.use(
    "/api",
    function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    },
    router
  );
};
