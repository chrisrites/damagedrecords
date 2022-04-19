import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import calculateCartTotal from '../../utils/calculateCartTotal'

export default async (req, res) => {
    const { currentUserEmail } = req.body

    try{
        // Verify and get user id from token
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // Find cart based on user id and populate it
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        })
        // Calculate cart totals again from cart products
        const { cartTotal } = calculateCartTotal(cart.products)
        // Add order data to database
        await new Order({
            user: userId,
            // email: paymentData.email,
            email: currentUserEmail,
            total: cartTotal, 
            products: cart.products,
            shipped: false
        }).save()
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