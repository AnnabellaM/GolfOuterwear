const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    metadata: {
      type: Object,
      default: {},
    },

    url: {
      type: Schema.Types.String,
      required: true,
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

fileSchema.plugin(mongoosePaginate);

fileSchema.statics.build = (attrs) => {
  const file = new File(attrs);
  if (attrs.id) file._id = attrs.id;
  return file;
};

const File = mongoose.model(
  'File',
  fileSchema,
);

module.exports = {File}
