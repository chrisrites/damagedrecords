import Order from '../../models/Order'
// I was getting an error when not importing the Product model.  Even though it is not directly referenced, it is referenced in the populate method below.  This crash was nont happening if the user first went to the store route, which leads me to believe the Product model needed to be used once first, otherwise we need the import statement here as this is the first time the Product model is referenced/used
import Product from '../../models/Product'
// import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetOrders(req, res)
            break
        case "PUT":
            await handleMarkShipped(req, res)
            break
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break
    }
}

async function handleGetOrders (req, res) {
    try {
        const orders = await Order.find({ shipped: false }).sort({ createdAt: 'desc' }).populate({
            path: 'products.product',
            model: "Product"
        })
        res.status(200).json({ props: { orders }})
    } catch(error) {
        res.status(403).send("Please login again")
    }
}

async function handleMarkShipped (req, res) {
    const { id } = req.body

    try {
        await Order.findOneAndUpdate(
            { _id: id },
            { $set: { shipped: true } }
        )
        res.status(200).json("Marked as shipped")
    } catch(error) {
        res.status(403).send("Please login again")
    }
}