import Cart from '../../models/Cart'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await handleGetRequest(req, res)
            break
        case "POST":
            await handlePostRequest(req, res)
            break
        case "DELETE":
            await handleDeleteRequest(req, res)
            break
        default:
            // 405 indicates an error with how the request was made.  User's fault not server
            res.status(405).send(`Method ${req.method} not allowed`)
            break
    }
}

async function handleGetRequest(req, res){
    const { _id } = req.query
    const product = await Product.findOne({ _id })
    res.status(200).json({ props: { product }})
}

async function handlePostRequest(req, res){
    const { name, price, description, mediaUrl } = req.body
    try{
        if(!name || !price || !description || !mediaUrl) {
            // User hasn't provided the necessary info to make the request.  IE not all product details have been provided to create a new product entry
            return res.status(422).send("Product missing one or more fields")   
        }
        const product = await new Product({
            name, 
            price, 
            description,
            mediaUrl
        }).save()
        // 201 status for when a resource is successfully created
        res.status(201).json(product)
    }catch(error){
        console.error(error)
        // 500 range status codes indicate a server error as opposed to a user error
        res.status(500).send("There was a problem on the server :/")
    }
}

async function handleDeleteRequest(req, res){
    const { _id } = req.query
    try{
        // Delete product by Id
        await Product.findOneAndDelete({ _id })
        // Remove product from all carts, reference as 'product'
        await Cart.updateMany(
            { 'products.product': _id },
            { $pull: { products: { product: _id } } }
        )
    } catch(error) {
        console.error(error)
        res.status(500).send('Error deleting product')
    }
    
    res.status(204).json({})
}