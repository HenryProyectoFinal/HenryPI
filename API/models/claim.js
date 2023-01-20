const { model, Schema } = require('mongoose');

const claimSchema = new Schema(
    {
        sale: {
            type: Schema.ObjectId, //Necesita una referencia a la venta...
            ref: "sale",
            required: true
        },
        issue:{
            type: String,
            enum: ['missing','damaged','wrong'],
            required: true
        },
        description:{
            type: String,
            required: true,
            minLength: 10,
            maxLength: 300
        },
        user:{
            type: Schema.ObjectId,
            ref: "user",
            required: true
        },
        status:{
            type: String,
            enum: ['pending','solved'],
            default: 'pending' 
        },
        solution:{
            type: String,
            enum: ['refund','replaced','forward'],
            required: function() { //NO funciona con arrow functions...
                return this.status === "solved";
            }
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
module.exports= model('Claim', claimSchema)