const expressLoader = require('./express')

module.exports = async ({ expressApp }) => {
  expressLoader({ app: expressApp })
}
