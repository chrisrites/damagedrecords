import sgMail from '@sendgrid/mail'
// import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req, res) => {
// New order email notification msg params
    const msg = {
        to: 'christopherchartrand@gmail.com',
        from: 'christopherchartrand@gmail.com',
        subject: 'New Order Placed',
        name: 'Melted Wax Records',
        // text: 'You have a new order!  Please ship asap and mark order as shipped',
        html: '<h1>You have a new order!</h1><img src="https://res.cloudinary.com/chrischartranddevelopment/image/upload/c_scale,w_228/v1647202668/epr6uehfm8cwacygsbuf.png"></img><p>Please ship asap and mark order as shipped</p>'
    };

    // Send order notification email
    try {
        await sgMail.send(msg);
        // console.log("Backend MADE IT")
        res.json({ message: `Email has been sent` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' })
    }
}
