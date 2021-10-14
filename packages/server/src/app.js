const express = require('express');
const config = require('../src/config');

exports.run = async () => {
  const app = express();

  await require('./loaders')({expressApp: app});

  app.listen(config.server.port, () => {
    console.info(`
      ################################################
        🛡️  Server listening on port: ${config.server.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });
}
