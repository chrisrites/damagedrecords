import connectDb from '../../utils/connectDb'
import Product from '../../models/Product'

connectDb()

export default async (req, res) => {
    const { page, size, filter } = req.query

    // get all artist names for Store artist select box
    const artistsList = await Product.distinct("artist")
    
    // Convert query string values to numbers
    const pageNum = Number(page)
    const pageSize = Number(size)
    let products = []
    let totalDocs
    if(filter) {
        totalDocs = await Product.countDocuments({artist: filter})
    } else {
        totalDocs = await Product.countDocuments()
    }
    
    const totalPages = Math.ceil(totalDocs / pageSize)
    // Pagination logic
    if(pageNum === 1){
        if(filter) {
            products = await Product.find({ artist: filter }).limit(pageSize)
        } else {
            products = await Product.find().limit(pageSize)
        }
    } else {
        // Determine how many products to skip over depending on which page of products the user is on.  If on page 2, skip the first 9 products in our get request
        const skips = pageSize * (pageNum - 1)
        // 1+ pages shouldn't need to filter by artist.  I have it setup so filtering by artist display ALL of their merch on ONE page
        products = await Product.find().skip(skips).limit(pageSize)
      
    }
    res.status(200).json({ props: { products, totalPages, artistsList }})
}