import User from '../../models/User'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // $ne means 'not equal to'.  We want to get all the users who are not us (the root user)
        const users = await User.find({ _id: { $ne: userId } }).sort({ role: 'asc', name: 'desc' })
        res.status(200).json(users)
    } catch(errors) {
        console.error(error)
        res.status(403).send('Please login again')
    }
}