const {Product} = require("../../models/product");

module.exports = async (req, res) => {
  const {
    name,
    price,
    currency,
    unit,
    description,
    imageUrl,
    stock,
    isActive,
  } = req.body;

  // build product doc
  const product = Product.build({
    name,
    price,
    currency,
    unit,
    description,
    imageUrl,
    stock,
    isActive,
  });
  // save doc into db
  await product.save();

  res.send({
    name: product.name,
    price: product.price,
    currency: product.currency,
    unit: product.unit,
    description: product.description,
    imageUrl: product.imageUrl,
    stock: product.stock,
    isActive: product.isActive,
  });
}
