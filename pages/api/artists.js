import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'

connectDb()

export default async (req, res) => {
   
   try {
        // .sort to sort by artist name
        const artists = await Artist.find().sort({ name: 1 })
        res.status(200).json({ props: { artists }})
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error fetching artists.  Please try again')
    } 
}