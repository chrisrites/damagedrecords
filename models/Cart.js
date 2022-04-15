import mongoose from 'mongoose'

// ObjectId is a special kind of data type that mongodb uses to essentially link documents together.  Like a user and their shopping cart document for example
const { ObjectId, Number } = mongoose.Schema.Types

const CartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        // We need to provide a reference to what modal are we referencing with this ObjectId
        ref: "User",
    },
    products: [
        {
            quantity: { 
                type: Number,
                default: 1     
            },
            product: {
                type: ObjectId,
                ref: "Product"
            },
            size: {
                type: String
            }
        }
    ]
})

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema)