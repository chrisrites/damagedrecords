// import { useEffect, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

const PaypalCheckoutButton = (props) => {
    // const [orderTotal, setOrderTotal] = useState(0)
    const { handleCheckout, currentUserEmail, cartAmount, isCartEmpty, success } = props;

    // console.log("Cart Amount: " + cartAmount)
    // useEffect(() => {
    //     setOrderTotal(cartAmount)
        
    // }, [])

    // const [paidFor, setPaidFor] = useState(false)
    // const [error, setError] = useState(null)

    // const handleApprove = (order_id) => {
        // Call backend function to fulfill the order

        // if successful, update state to true
        // setPaidFor(true);
        // Refresh users accounnt or subscription status

        // if response returns an error
        // setError("Your payment was processed successfully, However we are unable to process your order.  Please contact info@meltedwaxrecords.com")
    // }

    // if (paidFor) {
        // Display success message modal, or redirect user to another page?
        // alert("Thanks for your purchase!");
    // }

    // if (error) {
        // Display error message modal or redirect user to error page
    //     alert(error)
    // }

    return (
        <PayPalButtons 
            // style={{
            //     color: 'silver',
            //     layout: 'horizontal',
            //     height: 48,
            //     tagline: true,
            //     shape: 'pill'
            // }}
            disabled={isCartEmpty || success}
            // onClick={ (data, actions) => {
                // Validate on button click, client or server side
                // const alreadyPurchased = false

                // if(alreadyPurchased){
                //     setError('Your purchase is complete.  Go to Account to view your purchase and shipping status')

                //     return actions.reject()
                // } else {
                //     return actions.resolve()
                // }
            // }}
            createOrder = {(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: "Melted Wax Records order",
                            amount: {
                                value: cartAmount
                            }
                        }
                    ]
                })
            }}
            onApprove = {async (data, actions) => {
                // const order = await actions.order.capture()
                // console.log('Order: ', order)

                // handleApprove(data.orderID)
                handleCheckout(currentUserEmail)
            }}
            onCancel = {() => {
                // Display cancel message modal or redirect user to cancel page or even back to cart
            }}
            onError = {(err) => {
                // setError(err)
                console.error("Error: ", err)
            }}
        />
    )
        
}

export default PaypalCheckoutButton;