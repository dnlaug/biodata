module.exports = (app) => {
  const { authJwt, upload } = require("../middlewares");
  const controller = require("../controllers/biodata.controller.js");

  var router = require("express").Router();

  // Create a new data
  router.post(
    "/upload",
    [authJwt.verifyToken, authJwt.isUser],
    upload.single("file"),
    controller.create
  );

  // Retrieve all data
  router.get(
    "/table",
    [authJwt.verifyToken, authJwt.isUser],
    controller.findAll
  );

  // Delete all data
  router.delete(
    "/delete",
    [authJwt.verifyToken, authJwt.isUser],
    controller.deleteAll
  );

  app.use("/api/data", router);
};
