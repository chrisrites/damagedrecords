// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'
import NewsItem from '../../models/NewsItem'

connectDb()

export default async (req, res) => {
    let artists = []
    let news = []

    try {
        artists = await Artist.find()
        news = await NewsItem.find().sort({date: 'desc'}).limit(2)
        res.status(200).json({ artists, news })
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error fetching artists.  Please try again')
    }
}