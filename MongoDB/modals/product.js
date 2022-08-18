import mongoose from 'mongoose';

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    desc: {
        type: String,
        required: true,
        maxlength: 200
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: [Number],
        required: true,

    },
    extras: {
        type: [
            {
                text: { type: String, required: true },
                price: { type: Number, required: true },
            }
        ]

    },
},
    { timestamps: true })





export const product = mongoose.models.product || mongoose.model("product", schema);
