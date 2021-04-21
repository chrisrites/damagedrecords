import Order from '../../models/Order'
// I was getting an error when not importing the Product model.  Even though it is not directly referenced, it is referenced in the populate method below.  This crash was nont happening if the user first went to the store route, which leads me to believe the Product model needed to be used once first, otherwise we need the import statement here as this is the first time the Product model is referenced/used
// import Product from '../../models/Product'
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        console.log(`UUUUSSSSSSSEEEERRRRRRR: ${userId}`)
        const orders = await Order.find({ user: userId }).sort({ createdAt: 'desc' }).populate({
            path: 'products.product',
            model: "Product"
        })
        res.status(200).json({ orders })
    } catch(error) {
        res.status(403).send("Please login again")
    }
}