const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    items: [
      {
        cartId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        amount: {
          type: Schema.Types.Number,
          required: true,
        },
      }
    ],
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

cartSchema.plugin(mongoosePaginate);

cartSchema.statics.build = (attrs) => {
  const cart = new Cart(attrs);
  if (attrs.id) cart._id = attrs.id;
  return cart;
};

const Cart = mongoose.model(
  'Cart',
  cartSchema,
);

module.exports = {Cart}
