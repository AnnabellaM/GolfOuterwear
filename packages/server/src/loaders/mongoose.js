const mongoose = require('mongoose')
const config = require('../config')

module.exports = async () => {
  mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });
  mongoose.Schema.Types.String.checkRequired(v => v != null);
  console.info('Mongoose initialized');
};
