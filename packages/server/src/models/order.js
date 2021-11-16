const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },

    items: [
      {
        product: {
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

          description: {
            type: Schema.Types.String,
            default: '',
          },
        },

        amount: {
          type: Schema.Types.Number,
          required: true,
        },

        totalPrice: {
          type: Schema.Types.Number,
          required: true,
        },
      }
    ],

    payment: {
      method: {
        type: Schema.Types.String,
        enum: ['creditcard', 'paypal', 'applepay'],
        required: true,
      },

      detail: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },

    shipment: {
      email: {
        type: Schema.Types.String,
        required: true,
      },
      firstName: {
        type: Schema.Types.String,
        required: true,
      },
      lastName: {
        type: Schema.Types.String,
        required: true,
      },
      phone: {
        type: Schema.Types.String,
        required: true,
      },
      address: {
        type: Schema.Types.String,
        required: true,
      },
    },

    amount: {
      type: Schema.Types.Number,
      required: true,
    },

    totalPrice: {
      type: Schema.Types.Number,
      required: true,
    },

    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: new Date()
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

orderSchema.plugin(mongoosePaginate);

orderSchema.statics.build = (attrs) => {
  const order = new Order(attrs);
  if (attrs.id) order._id = attrs.id;
  return order;
};

const Order = mongoose.model(
  'Order',
  orderSchema,
);

module.exports = {Order}
