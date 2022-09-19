module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "2910",
  DB: "bio",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
