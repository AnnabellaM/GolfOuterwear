const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    imageUrl: {
      type: Schema.Types.String,
      required: true,
    },

    name: {
      type: Schema.Types.String,
      required: true,
    },

    genre: {
      type: Schema.Types.String,
      enum: ['Jacket', 'Vest'],
    },

    price: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },

    currency: {
      type: Schema.Types.String,
      enum: ['USD', 'RMB'],
      required: true,
    },

    inventory: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },

    description: {
      type: Schema.Types.String,
      default: '',
    },

    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
)

productSchema.plugin(mongoosePaginate);

productSchema.statics.build = (attrs) => {
  const product = new Product(attrs);
  if (attrs.id) product._id = attrs.id;
  return product;
};

const Product = mongoose.model(
  'Product',
  productSchema,
);

module.exports = {Product}
