import mongoose from 'mongoose';

const schema = mongoose.Schema({

    customer: {
        type: String,
        required: true,
        maxlength: 40
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    total: {
        type: Number,
        required: true,

    },
    status: {  //order status  0, 1, 2, 3
        type: Number,
        required: true,
        default: 0,

    },
    paymentMethod: {
        type: Number,    // 1 means card
        required: true,
        default:0

    },

},
    { timestamps: true }
)





export const order  =  mongoose.models.order || mongoose.model("order", schema);