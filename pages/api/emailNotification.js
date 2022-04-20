import sgMail from '@sendgrid/mail'
// import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req, res) => {
    const { orderNumber } = req.body
    // New order email notification msg params
    const msg = {
        to: 'info@meltedwaxrecords.com',
        from: 'info@meltedwaxrecords.com',
        subject: 'New Order Placed',
        name: 'Melted Wax Records',
        // text: 'You have a new order!  Please ship asap and mark order as shipped',
        html: '<h1>Order #: ' + orderNumber +  '</h1></img><p>Please ship asap and mark order as shipped</p>'
    };

    // Send order notification email
    try {
        await sgMail.send(msg);
        res.json({ message: `Email has been sent to seller` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email to seller' })
    }
}
