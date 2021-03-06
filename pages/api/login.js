import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const { email, password } = req.body

    try{
        // Check if a user exists with the provided email.  **the select function is to get the password which was purposely omitted in the user model
        const user = await User.findOne({ email }).select('+password')
        // if not, return an error
        if(!user){ 
            return res.status(404).send('No user exists with that email address')
        }
        // Check if the user's password matches password in db
        const passwordsMatch =  await bcrypt.compare(password, user.password)
        // if so, generate a token
        if(passwordsMatch){
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            // send token to client
            if(token){
            }
            res.status(200).json(token)
        } else {
            res.status(401).send('Passwords do not match')
        }
    }catch(error){
        console.error(error)
        res.status(500).send('Error logging in user')
    }
}