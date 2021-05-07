// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'
import Product from '../../models/Product'

connectDb()

export default async (req, res) => {
    const { page, size } = req.query
    // Convert query string values to numbers
    const pageNum = Number(page)
    const pageSize = Number(size)
    let products = []
    const totalDocs = await Product.countDocuments()
    const totalPages = Math.ceil(totalDocs / pageSize)
    // Pagination logic
    if(pageNum === 1){
        products = await Product.find().limit(pageSize)
    } else {
        // Determine how many products to skip over depending on which page of products the user is on.  If on page 2, skip the first 9 products in our geet request
        const skips = pageSize * (pageNum - 1)
        products = await Product.find().skip(skips).limit(pageSize)
    }
    // const products = await Product.find()
    // res.status(200).json({ products, totalPages })
    res.status(200).json({ props: { products, totalPages }})
}