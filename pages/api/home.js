// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'
import NewsItem from '../../models/NewsItem'
import Event from '../../models/Event'

connectDb()

export default async (req, res) => {
    let artists = []
    let news = []
    let events = []

    try {
        artists = await Artist.find()
        news = await NewsItem.find().sort({date: 'desc'}).limit(3)
        // Get today's date
        const yesterday = new Date()
        // subtract 1 from it, resulting in yesterdays date
        yesterday.setDate(yesterday.getDate()-1)
        events = await Event.find({ date: { $gte: yesterday}  }).sort({date: 'asc'}).limit(3)
        // res.status(200).json({ artists, news, events })
        console.log('PAYPAL ENV VAR: ' + process.env.REACT_APP_PAYPAL_CLIENT_ID)
        console.log('CLOUDINARY ENV VAR: ' + process.env.CLOUDINARY_URL)
        res.status(200).json({ props: { artists, news, events }})
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error.  Please try again')
    }
}