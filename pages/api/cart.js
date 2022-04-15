import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const { ObjectId } = mongoose.Types

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await handleGetRequest(req, res)
            break
        case "PUT":
            await handlePutRequest(req, res)
            break
        case "DELETE":
            await handleDeleteRequest(req, res)
            break
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break
    }
}

async function handleGetRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        })
        const products = cart.products
        // console.log(products)
        // res.status(200).json(cart.products)
        res.status(200).json({ props: { products } })
    } catch(error){
        console.error(error)
        res.status(403).send('Please login again')
    }
}

async function handlePutRequest(req, res) {
    const { quantity, productId, size } = req.body
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // Get user cart based on userId
        const cart = await Cart.findOne({ user: userId })
        // Check if product already exists in cart
        // instead of the 'every' function, we use 'some' which will stop as soon as it meeets its given condition instead of search through every element

        // const productExists = cart.products.some(doc => ObjectId(productId).equals(doc.product))

        // const productExists = cart.products.find({
        //     $and: [ { product: { $eq: ObjectId(productId) } }, 
        //         { size: { $exists: true, $eq: size } }
        //     ]
        // })

        const productExists = cart.products.some( doc => ObjectId(productId).equals(doc.product) && doc.size === size )

        console.log("Product Exists Val: " + productExists)
        // If so, increment quantity by number provided to request
        if(productExists) {
            await Cart.findOneAndUpdate(
                { _id: cart._id,  "products.product": productId },
                // inc for increment.  The '$' is known as the positional operator.  It references the index of the array element that we want to update
                { $inc: { "products.$.quantity": quantity } }
            )
        } else {
            // If not, add new product with given quantity
            const newProduct = { quantity, product: productId, size }
            await Cart.findOneAndUpdate(
                { _id: cart._id },
                // Use addToSet instead of push to add an element only once and ensure it's unique
                { $addToSet: { products: newProduct } }
            )
        }
        res.status(200).send("Cart updated")
    } catch(error){
        console.error(error)
        res.status(403).send('Cart update error')
    }
}

async function handleDeleteRequest(req, res){
    const { productId } = req.query
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            // { $pull: { products: { product: productId } } },
            { $pull: { products: { _id: productId } } },
            { new: true }
        ).populate({
            path: "products.product",
            model: "Product"
        })
        res.status(200).json(cart.products)
    } catch(error) {
        console.error(error)
        res.status(403).send('Please login again')
    }
}