const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async ({ expressApp }) => {
  // mongo initialize
  await mongooseLoader()

  // express initialize
  expressLoader({ app: expressApp })
}
