# biodata

### biodata/server
``` 
node server.js
```
### biodata/client
```
npm start
```
### MySQL
```
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "add your password here",
  DB: "bio",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```
