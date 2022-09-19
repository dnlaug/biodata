const fs = require("fs");

const db = require("../models");
const BioData = db.biodata;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: biodatas } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, biodatas, totalPages, currentPage };
};

// Create and Save a new data in db
exports.create = async (req, res) => {
  try {
    // Store data and Regexp
    var data = [];
    var search = /(\w|\||\.|\-|\+|\!|\,|\'|\&)+/gm;

    if (req.file == undefined) {
      return res.send("You must select a file.");
    }
    fs.readFile(req.file.path, "utf8", (err, contents) => {
      // console.log(contents);
      var result = contents.split(/\r?\n|\r/);
      for (let i of result) {
        if (i.substring(0, 1) == "#" || i.length == 0) {
          continue;
        }
        data = i.match(search);
        if (data.length > 18) {
          const start = data.indexOf(data[18]);
          const rest = data.splice(start - 1).join(" ");
          data = data.concat(rest);
        }
        BioData.create({
          targetName: data[0],
          accession: data[1],
          queryName: data[2],
          acession: data[3],
          mdl: data[4],
          mdlFrom: data[5],
          mdlTo: data[6],
          seqFrom: data[7],
          seqTo: data[8],
          strand: data[9],
          trunc: data[10],
          pass: data[11],
          gc: data[12],
          bias: data[13],
          score: data[14],
          eValue: data[15],
          inc: data[16],
          descriptionOfTarget: data[17],
        });
      }
    });
    // Exclude the file from resources/upload/temp folder
    return fs.unlink(req.file.path, function (err) {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          message: `Uploaded file successfully!`,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload the file: ${error}`);
  }
};

// Retrieve all data from the db
exports.findAll = (req, res) => {
  const { page, size, targetName } = req.query;
  var condition = targetName
    ? { targetName: { [Op.like]: `%${targetName}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);

  BioData.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving data.",
      });
    });
};

// Delete all data from the db
exports.deleteAll = (req, res) => {
  BioData.destroy({
    where: {},
    truncate: true,
  })
    .then((nums) => {
      res.send({ message: `${nums} Data were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all data.",
      });
    });
};
