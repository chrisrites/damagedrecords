import { useEffect, useState }from 'react'
import Link from 'next/link';
import { Segment, Divider, Icon } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'
import globalStyles from '../../static/styles/global.module.scss'
import cartStyles from '../../static/styles/cart.module.scss'
import { PayPalButtons } from '@paypal/react-paypal-js'

function CartSummary({ products, handleCheckout, success, currentUserEmail, orderNumber, setOrderNumber }) {
  const [cartAmount, setCartAmount] = useState(0)
  const [isCartEmpty, setIsCartEmpty] = useState(false)
  const [shippingAmount, setShippingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const { cartTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setShippingAmount(calculateShipping())
    // setTotalAmount(Math.round((+cartTotal + +calculateShipping()) * 100) / 100 )
    setTotalAmount((+cartTotal + +calculateShipping()).toFixed(2))
    setIsCartEmpty(products.length === 0)
    setOrderNumber(Date.now())
  }, [products])

  function calculateShipping(){
    let productQuantity = 0
    products.map(product => {
      productQuantity += product.quantity
    })
    let cost = 0
    if(productQuantity > 0){
      // Minus one because the first product automatically costs $20 shipping
      productQuantity -= 1
      // * 3 because each additional product costs $3
      cost = productQuantity * 3
      // + 20 for the first product shipping cost $20 
      cost += 20
    }
    return cost.toFixed(2)
  }

  return <>
    <Divider />
    {!isCartEmpty && 
      <Segment clearing size="large">
          <div style={{display: !success ? 'block' : 'none'}}>
            <p id={cartStyles.shippingNotice}><span id={cartStyles.note}>NOTE</span> Shipping calculated for Canada and the US only. For other countries, please send your order to <a id={cartStyles.email} href="mailto:info@meltedwaxrecords.com" target="_blank">info@meltedwaxrecords.com</a> and we'll get you a quote!</p>
            <h6 className={globalStyles.cartTotals} style={{float: "unset"}}>Sub Total: ${cartAmount}</h6>
            <h6 className={globalStyles.cartTotals}>Shipping: ${shippingAmount}</h6>
            <h5 className={globalStyles.cartTotals} id={globalStyles.cartTotal}>Total: ${totalAmount} (CAD)</h5>
          </div>
        <Link href="/account">
          <div className={globalStyles.viewOrderBtn} style={{display: success ? 'block' : 'none'}}>
            <Icon name="file alternate outline"></Icon>
            <span>View Order</span>
          </div>
        </Link>
      </Segment>
    }
      <PayPalButtons 
        className={cartStyles.payPalButtons}
        disabled={isCartEmpty || success}
        forceReRender={[cartAmount]}
        createOrder = {(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: "Melted Wax Records Order#: " + orderNumber,
                        amount: {
                            // currency_code: "CAD",
                            value: totalAmount
                        }
                    }
                ]
            })
        }}
        onApprove = {async (data, actions) => {
          return actions.order.capture().then((details) => {
            // See what's in 'details', or see what more options actions.order.create has.  
            // Need to connect MWR order and paypal orders more clearly
            handleCheckout(currentUserEmail, orderNumber, totalAmount, cartAmount, shippingAmount)
          });
        }}
        onCancel = {() => {
          // Display cancel message modal or redirect user to cancel page or even back to cart
          alert("The PayPal transaction has been cancelled")
        }}
        onError = {(err) => {
          console.error("Error: ", err)
        }}
        // onClick = {() => {}}
      />
  </>;
}

export default CartSummary;
