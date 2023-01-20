const { Schema, model } = require('mongoose');

// const question = require("./question.js");
// const review = require("./review.js");
// const category = require("./category.js");
// const brand = require("./brand.js");

const productSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            minLength: 10,
            maxLength: 50
        },
        description:{
            type: String,
            required: true,
            minLength: 50,
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
            type: Schema.ObjectId,
            ref: "category",
            required: true
        },
        brand:{
            type: Schema.ObjectId,
            ref: "brand",
            required: true
        },
        reviews:{
            type: [Schema.ObjectId],
            ref: "review"
        },
        questions:{
            type: [Schema.ObjectId],
            ref: "question"
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