const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema(
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

adminSchema.plugin(mongoosePaginate);

adminSchema.statics.build = (attrs) => {
  const admin = new Admin(attrs);
  if (attrs.id) admin._id = attrs.id;
  return admin;
};

const Admin = mongoose.model(
  'Admin',
  adminSchema,
);

module.exports = {Admin}
