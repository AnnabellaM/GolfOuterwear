const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

// _id: Index
// name: string
// price: float
// currency: string
// unit: string
// description: string
// image_url: string
// stock: int
// is_active: boolean

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },

    name: {
      type: Schema.Types.String,
      required: true,
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

    unit: {
      type: Schema.Types.String,
      enum: ['pair', 'box', 'bag', 'piece'],
    },

    description: {
      type: Schema.Types.String,
      default: '',
    },

    imageUrl: {
      type: Schema.Types.String,
      required: true,
    },

    stock: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
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

productSchema.statics.buildById = (id) => {
  const product = new Product({id});
  product._id = id;
  return product;
};

const Product = mongoose.model(
  'Product',
  productSchema,
);

module.exports = {Product}
