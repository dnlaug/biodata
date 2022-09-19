module.exports = (sequelize, Sequelize) => {
  const BioData = sequelize.define("biodata", {
    targetName: {
      type: Sequelize.STRING,
    },
    accession: {
      type: Sequelize.STRING,
    },
    queryName: {
      type: Sequelize.STRING,
    },
    acession: {
      type: Sequelize.STRING,
    },
    mdl: {
      type: Sequelize.STRING,
    },
    mdlFrom: {
      type: Sequelize.INTEGER,
    },
    mdlTo: {
      type: Sequelize.INTEGER,
    },
    seqFrom: {
      type: Sequelize.INTEGER,
    },
    seqTo: {
      type: Sequelize.INTEGER,
    },
    strand: {
      type: Sequelize.STRING,
    },
    trunc: {
      type: Sequelize.STRING,
    },
    pass: {
      type: Sequelize.INTEGER,
    },
    gc: {
      type: Sequelize.DOUBLE,
    },
    bias: {
      type: Sequelize.DOUBLE,
    },
    score: {
      type: Sequelize.DOUBLE,
    },
    eValue: {
      type: Sequelize.DOUBLE,
    },
    inc: {
      type: Sequelize.STRING,
    },
    descriptionOfTarget: {
      type: Sequelize.STRING,
    },
  });

  // BioData.removeAttribute("id");
  // BioData.removeAttribute("updatedAt");
  // BioData.removeAttribute("createdAt");

  return BioData;
};
