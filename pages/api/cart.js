import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'
// import product from './product'

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

        res.status(200).json({ props: { products } })
    } catch(error){
        console.error(error)
        res.status(403).send('Please login again')
    }
}

async function handlePutRequest(req, res) {
    const { cartQuantity, productId, size, price, artist, quantity } = req.body
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // Get user cart based on userId
        const cart = await Cart.findOne({ user: userId })
        // Check if product already exists in cart
        // instead of the 'every' function, we use 'some' which will stop as soon as it meeets its given condition instead of search through every element
        const productExists = cart.products.some( doc => ObjectId(productId).equals(doc.product) && doc.size === size )
        // If so, increment quantity by number provided to request
        if(productExists) {
            let existingCartQuantity = 0
            // Go through products in basket and find which one matches the one their adding more of 
            cart.products.map(product => {
                if(product.product == productId) {
                    // Then get the quantity of that item that already exists in the basket
                    existingCartQuantity = product.quantity
                }
            })
            // Add existing cart quantity to the quantity their trying to add
            const totalCartQuantity = existingCartQuantity + cartQuantity
            // if that amount is greater than what is available, stop them from adding it to cart and send an alert message back to client
            if(totalCartQuantity > quantity) {
                res.status(200).send(
                    {
                        quantity: quantity,
                        msg: "OOS"
                    }
                )
            } else {
                // If we have enough in stock, go ahead and update the quantity of that item
                await Cart.findOneAndUpdate(
                    { _id: cart._id,  "products.product": productId },
                    // inc for increment.  The '$' is known as the positional operator.  It references the index of the array element that we want to update
                    { $inc: { "products.$.quantity": cartQuantity } }
                )
                res.status(200).send({msg:"Cart updated"})
            }
        } else {
            // Same logic as commented above, except in this case there isn't an existing instance of this product already in the cart
            if(cartQuantity > quantity) {
                res.status(200).send(
                    {
                        quantity: quantity,
                        msg: "OOS"
                    }
                )
            } else {
                // If not, add new product with given quantity
                const newProduct = { quantity: cartQuantity, product: productId, size, price, artist }
                await Cart.findOneAndUpdate(
                    { _id: cart._id },
                    // Use addToSet instead of push to add an element only once and ensure it's unique
                    { $addToSet: { products: newProduct } }
                )
                res.status(200).send({msg:"Cart updated"})
            }
        }
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