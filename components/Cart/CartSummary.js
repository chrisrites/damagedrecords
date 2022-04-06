import { useEffect, useState }from 'react'
// import StripeCheckout from 'react-stripe-checkout'
import Link from 'next/link';
import { Button, Segment, Divider, Icon } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'
import globalStyles from '../../static/styles/global.module.scss'
import cartStyles from '../../static/styles/cart.module.scss'
// import PaypalCheckoutButton from  '../PaypalCheckoutButton'
import { PayPalButtons } from '@paypal/react-paypal-js'

function CartSummary({ products, handleCheckout, success, currentUserEmail }) {
  const [cartAmount, setCartAmount] = useState(0)
  // const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setIsCartEmpty] = useState(false)

  useEffect(() => {
    const { cartTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setIsCartEmpty(products.length === 0)
  }, [products])

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong style={{color:"black"}}>Sub Total:</strong><span style={{color:"black"}}>${cartAmount}</span>
      <Link 
        href="/account"
      >
        <div className={globalStyles.viewOrderBtn} style={{display: success ? 'block' : 'none'}}>
          <Icon name="file alternate outline"></Icon>
           <span>View Order</span>
        </div>
      </Link>
    </Segment>
    <PayPalButtons 
      className={cartStyles.payPalButtons}
      disabled={isCartEmpty || success}
      forceReRender={[cartAmount]}
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
        handleCheckout(currentUserEmail)
      }}
      onCancel = {() => {
        // Display cancel message modal or redirect user to cancel page or even back to cart
        alert("The PayPal transaction has been cancelled")
      }}
      onError = {(err) => {
        // setError(err)
        console.error("Error: ", err)
      }}
      onClick = {() => {
        console.log("On Click Cart Amount: " + cartAmount)
      }}
    />
  </>;
}

export default CartSummary;
