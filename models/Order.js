import mongoose from 'mongoose'
import shortid from 'shortid'

// ObjectId is a special kind of data type that mongodb uses to essentially link documents together.  Like a user and their shopping cart document for example
const { ObjectId, Number } = mongoose.Schema.Types

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        // default: shortid.generate()
        default: shortid.generate
    },
    user: {
        type: ObjectId,
        // We need to provide a reference to what model are we referencing with this ObjectId
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
    ],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    shipped: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)