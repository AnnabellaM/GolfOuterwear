const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    email: {
      type: Schema.Types.String,
      required: true,
    },

    password: {
      type: Schema.Types.String,
      required: true
    },

    address: {
      type: Schema.Types.String,
      required: true
    },

    firstName: {
      type: Schema.Types.String,
      require: true
    },

    lastName: {
      type: Schema.Types.String,
      require: true
    },

    phone: {
      type: Schema.Types.String,
      required: true
    }
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

customerSchema.plugin(mongoosePaginate);

customerSchema.statics.build = (attrs) => {
  const customer = new Customer(attrs);
  if (attrs.id) customer._id = attrs.id;
  return customer;
};

const Customer = mongoose.model(
  'Customer',
  customerSchema,
);

module.exports = {Customer}
