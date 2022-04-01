import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Link from 'next/link';
import { Button, Segment, Divider, Icon } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'
import globalStyles from '../../static/styles/global.module.scss'

function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [stripeAmount, setStripeAmount] = React.useState(0)
  const [isCartEmpty, setIsCartEmpty] = React.useState(false)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setIsCartEmpty(products.length === 0)
  }, [products])

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong style={{color:"black"}}>Sub Total:</strong> <span style={{color:"black"}}>${cartAmount}</span>
      <StripeCheckout
        name="Melted Wax Records"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="CAD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_Jk7KsW1mZeoQtdAGedEKOfA000iR03YhTW"
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button 
          disabled={isCartEmpty || success}
          style={{display: success ? 'none' : 'block'}}
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
        />
      </StripeCheckout>
      {/* <Button 
          style={{display: success ? 'block' : 'none'}}
          // disabled={isCartEmpty || success}
          icon="shopping bag"
          color="blue"
          floated="right"
          content="View Order"
          href="/account"
      /> */}
      <Link 
        href="/account"
      >
        <div className={globalStyles.viewOrderBtn} style={{display: success ? 'block' : 'none'}}>
          <Icon name="file alternate outline"></Icon>
           <span>View Order</span>
        </div>
      </Link>
    </Segment>
  </>;
}

export default CartSummary;
