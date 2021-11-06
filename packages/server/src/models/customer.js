const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerScheme = new mongoose.Schema(
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
    
        first_name: {
          type: Schema.Types.String,
          require: true
        },
    
        last_name: {
          type: Schema.Types.String,
          require: true
        },
    
        phone: {
          type: Schema.Types.String,
          required: true
        }
      }
)

const Customer = mongoose.model(
    'Customer',
    customerScheme,
  );
  
  module.exports = {Customer}
