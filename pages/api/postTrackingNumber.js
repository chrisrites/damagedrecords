import Order from '../../models/Order'
import sgMail from '@sendgrid/mail'
import connectDb from '../../utils/connectDb'

sgMail.setApiKey(process.env.EMAIL_API_KEY);
connectDb()

export default async (req, res) => {
    const { orderId, trackingNumber, email, orderNumber } = req.body

    try {
        await Order.findOneAndUpdate(
            { _id: orderId },
            { $set: { trackingNumber: trackingNumber } }
        )

        // Send tracking number to customer
        const msg = {
            to: email,
            from: 'info@meltedwaxrecords.com',
            subject: 'Your Melted Wax Order Has Been Shipped',
            name: 'Melted Wax Records',
            html: '<h3>Order #: ' + orderNumber +  '</h3><p>Hello again. Your order has been shipped!<br/>You can track your order at Canada Post by clicking <a href="https://www.canadapost-postescanada.ca/track-reperage/en#/search?searchFor=' + trackingNumber + '" target="_blank">here.</a><br/>Your tracking number is: ' + trackingNumber + '.</p><p>Thanks again for your order and for supporting independent music!</p><img src="https://res.cloudinary.com/chrischartranddevelopment/image/upload/v1647202668/epr6uehfm8cwacygsbuf.png" style="max-width: 200px;" />'
        };

        // Send order notification email
        await sgMail.send(msg);

        res.status(200).json("Tracking number posted and emailed")
    } catch(error) {
        res.status(403).send("Error posting or emailing tracking number")
    }
}