const multer = require("multer");

const dataFilter = (req, file, cb) => {
  const fileType = /^.+\.(tbl|txt|csv)$/;
  if (file.originalname.match(fileType)) {
    cb(null, true);
  } else {
    cb("Please upload text files.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/app/resources/uploads/temp");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-biodata-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: dataFilter });

module.exports = uploadFile;
