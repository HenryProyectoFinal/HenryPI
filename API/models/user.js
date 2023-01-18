const {Schema, model}= require('mongoose')

const schema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength:5
    },
    lastName: {
        type: String,
        required: true,
        minlength:5
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength:5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        default: true,
        minlength:8
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        default: true,
        minlength:8
    },
    active: {
        type: Boolean,
        required: true,
        default: true
      },
    location:[
        {
            province: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true,
                minlength:5
            },
            cyty: {
                type: String,
                required: true,
                minlength:3
            },
            cp: {
                type: Number,
                required: true,
                minlength:5
            }
        }
    ],
    ShoppingCart: [
        {
            product:[
                {
                    productName: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    }
                }
            ] ,
            units: {
                type: Number,
                required: true,
            },
        },
    ]
}, {
  timestamps: true
})


module.exports= model('User', schema)