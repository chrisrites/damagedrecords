import sgMail from '@sendgrid/mail'
// import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req, res) => {
    const { orderNumber, user } = req.body

    // New order email notification msg params
    const msg = {
        to: user.email,
        from: 'info@meltedwaxrecords.com',
        subject: 'Your Melted Wax Order Has Been Placed',
        name: 'Melted Wax Records',
        // text: 'You have a new order!  Please ship asap and mark order as shipped',
        html: '<h1>Order #: ' + orderNumber +  '</h1><p>Hey ' + user.name + ', thanks for the order!</p><p>We will get that shipped out to you asap.  You can check the shipping status of your order by logging into Melted Wax and checking your Account from the menu.</p><img src="https://res.cloudinary.com/chrischartranddevelopment/image/upload/v1647202668/epr6uehfm8cwacygsbuf.png" style="max-width: 200px;" />'
    };

    // Send order notification email
    try {
        await sgMail.send(msg);
        res.json({ message: `Email has been sent to buyer` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email to buyer' })
    }
}
