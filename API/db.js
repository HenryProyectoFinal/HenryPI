import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://henry-pi:PHC3594LaXa924XZ@henry.yepnpbp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.error('Error connection to MongoDB', error.message)
})