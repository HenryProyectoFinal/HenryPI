const { Schema, model }= require('mongoose')

const categorySchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength:3
    },
    description: {
        type: String,
        required: true,
    },
    father:
        {
          type: Schema.ObjectId,
          ref: "category"
        },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
}, {timestamps: true}) //Agregarlo a todos...

module.exports= model('Category', categorySchema)