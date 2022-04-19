import connectDb from '../../utils/connectDb'
import Artist from '../../models/Artist'

connectDb()

export default async (req, res) => {
   
   try {
        const artists = await Artist.find()
        res.status(200).json({ props: { artists }})
    } catch (error) {
        console.error(error)
        res.status(403).send('DB/Server Error fetching artists.  Please try again')
    } 
}