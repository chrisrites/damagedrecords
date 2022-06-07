import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs' 
import isLength from 'validator/lib/isLength'

connectDb()

export default async (req, res) => {
    const { email, newPassword } = req.body

    try{
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