import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

schema.plugin(uniqueValidator)

export default mongoose.model('Brand', schema)