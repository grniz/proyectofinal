import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = mongoose.Schema({
    products:{
        type:[{
            product:{
                type: mongoose.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
            },
        }],
        default: [],
    },
});


const cartsModels = mongoose.model(cartsCollection, cartsSchema);

export default cartsModels;