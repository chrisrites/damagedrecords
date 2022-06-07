import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req, res) => {
    const { orderNumber } = req.body
    // New order email notification msg params
    const msg = {
        to: 'info@meltedwaxrecords.com',
        from: 'info@meltedwaxrecords.com',
        subject: 'New Order Placed',
        name: 'Melted Wax Records',
        html: '<h4>Order #: ' + orderNumber +  '</h4><p>Please ship asap and mark order as shipped</p>'
    };

    // Send order notification email
    try {
        await sgMail.send(msg);
        res.json({ message: `Email has been sent to seller` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email to seller' })
    }
}
