const { Schema, model, models }= require('mongoose');

const emailSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})


module.exports = models["Email"] || model("Email", emailSchema);