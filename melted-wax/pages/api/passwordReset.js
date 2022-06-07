import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs' 
import shortid from 'shortid'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.EMAIL_API_KEY);

connectDb()

export default async (req, res) => {
    const { email } = req.body

    try{
        // Check if a user exists with the provided email.
        const user = await User.findOne({ email })
        // if not, return an error
        if(!user){ 
            return res.status(404).send('No user exists with that email address')
        }
        
        // create a new password
        const newPassword = shortid.generate()

        // hash their password
        const hash = await bcrypt.hash(newPassword, 11)
        // Create user
        await User.findOneAndUpdate(
            { email: email },
            { password: hash }
        )

        const msg = {
            to: 'christopherchartrand@gmail.com',
            from: 'christopherchartrand@gmail.com',
            subject: 'Password Changed',
            name: 'Melted Wax Records',
            // text: 'You have a new order!  Please ship asap and mark order as shipped',
            html: '<h3>Password changed confirmation</h3><p>Your password has been changed to: ' + newPassword + '<br/><br/><p>Once logged back in you can change your password in the Account page<br/><br/></p><img src="https://res.cloudinary.com/chrischartranddevelopment/image/upload/c_scale,w_228/v1647202668/epr6uehfm8cwacygsbuf.png"></img>'
        };
        await sgMail.send(msg);
        res.status(200).send("Password changed successfully")
    }catch(error){
        console.error(error)
        res.status(500).send('Error updating password')
    }
}