import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import Cart from '../../models/Cart'
// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connectDb()

export default async (req, res) => {
    const { name, email, password } = req.body

    try{
        // Validate name, email and password values
        if(!isLength(name, { min:3, max:20 })){
            return res.status(422).send('User name must be between 3-20 characters in length')
        } else if (!isLength(password, { min:6 })) {
            return res.status(422).send('Password must be at least 6 characters in length')
        } else if (!isEmail(email)){
            return res.status(422).send('Must provide a valid email address')
        }
        // Check to see if the user already exists in the db
        const user = await User.findOne({ email })
        if(user){
            return res.status(422).send(`User already exists with email: ${email}`)
        }
        // if not, hash their password
        const hash = await bcrypt.hash(password, 11)
        // Create user
        const newUser = await new User({
            name, 
            email,
            password: hash
        }).save()
        // Create cart for the new user
        await new Cart({ user: newUser._id }).save()
        // Create token for the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // Send back token
        res.status(201).json(token)
    } catch(error) {
        res.status(500).send('Error signing up user. Please try again')
    }
}
