const { Schema, model } = require('mongoose');

const Review = require("./review.js"); //Si se borra no funcionará .populate para los arreglos...
const Question = require("./question.js");

const productSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 50
        },
        description:{
            type: String,
            required: true,
            minLength: 5,
            maxLength: 250
        },
        price:{
            type: Number,
            required: true
        },
        images:{
            type: [String],
            required: true
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        brand:{
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },
        reviews:{
            type: [Schema.Types.ObjectId],
            ref: "Review"
        },
        questions:{
            type: [Schema.Types.ObjectId],
            ref: "Question"
        },
        active:{
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)
module.exports = model('Product', productSchema);