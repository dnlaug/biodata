const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

exports.adminBoard = (req, res) => {
  // res.status(200).send("Admin Content.");
  const { page, size, username } = req.query;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);

  User.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving users.",
      });
    });
};
