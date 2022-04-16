import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs' 
import isLength from 'validator/lib/isLength'
// import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const { email, newPassword } = req.body

    try{
        // Check if a user exists with the provided email.  **the select function is to get the password which was purposely omitted in the user model
        // const user = await User.findOne({ email }).select('+password')
        // const user = await User.findOne({ email })
        // if not, return an error
        // if(!user){ 
        //     return res.status(404).send('No user exists with that email address')
        // }
        if (!isLength(newPassword, { min:6 })) {
            return res.status(422).send('Password must be at least 6 characters in length')
        }
        // hash their password
        const hash = await bcrypt.hash(newPassword, 11)
        // Create user
        await User.findOneAndUpdate(
            { email: email },
            { password: hash }
        )
        res.status(200).send("Password changed successfully")
    }catch(error){
        console.error(error)
        res.status(500).send('Error updating password')
    }
}