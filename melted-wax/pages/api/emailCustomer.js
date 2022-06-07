import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export default async (req, res) => {
    const { orderNumber, user } = req.body

    // New order email notification msg params
    const msg = {
        to: user.email,
        from: 'info@meltedwaxrecords.com',
        subject: 'Your Melted Wax Order Has Been Placed',
        name: 'Melted Wax Records',
        html: '<p>Hey ' + user.name + ', thanks for the order!</p><p>We will get that shipped out to you asap.  You will receive an email when your order has shipped. You can also check the status of your order at <a href="https://www.meltedwaxrecords.com" target="_blank">meltedwaxrecords.com</a>.</p><h4>Order #: ' + orderNumber +  '</h4><img src="https://res.cloudinary.com/chrischartranddevelopment/image/upload/v1647202668/epr6uehfm8cwacygsbuf.png" style="max-width: 200px;" /><br/><a href="meltedwaxrecords.com" target="_blank">www.meltedwaxrecords.com</a><br/><a href="mailto:info@meltedwaxrecords.com">info@meltedwaxrecords.com</a>'
    };

    // Send order notification email
    try {
        await sgMail.send(msg);
        res.json({ message: `Email has been sent to customer` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email to customer' })
    }
}
