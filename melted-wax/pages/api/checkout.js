import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import Product from '../../models/Product'
// import calculateCartTotal from '../../utils/calculateCartTotal'

export default async (req, res) => {
    const { currentUserEmail, orderID, totalAmount, cartAmount, shippingAmount } = req.body

    try{
        // Verify and get user id from token
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // Find cart based on user id and populate it
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        })
        // Calculate cart totals again from cart products
        // const { cartTotal } = calculateCartTotal(cart.products)

        // Add order data to database
        await new Order({
            user: userId,
            // email: paymentData.email,
            email: currentUserEmail,
            total: totalAmount, 
            cartAmount: cartAmount,
            shippingAmount: shippingAmount,
            products: cart.products,
            orderID: orderID,
            shipped: false,
            trackingNumber: ""
        }).save()
        
        // Decrement the product stock from this purchase
        // Call an async function since we're doing await calls within a map function
        cart.products.map(prdct => {
            handleDecrementProduct(prdct)
        })

        // Clear products in cart
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } }
        )

        // Send back a 200 response
        res.status(200).send("Checkout successful")
    } catch(error) {
        console.error(error)
        res.status(500).send('Error processing charge')
    }
}

async function handleDecrementProduct(prdct) {
    // Decrement products from db
    await Product.findOneAndUpdate(
        { _id: prdct.product },
        { $inc: { quantity: -prdct.quantity } }
    )
}