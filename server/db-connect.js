const mongoose = require('mongoose');
const dbConst = require('../config/config.js')

module.exports = class DBConfig {
    static init() {
      const URL = (process.env.NODE_ENV === "production") ? process.env.MONGOHQ_URL : dbConst.localhost;

      mongoose.Promise = global.Promise;
      mongoose.connect(URL, {
        useMongoClient: true
      });
      mongoose.connection.on("error", console.error.bind(console, "An error ocurred with the DB connection: "));
    }
};
