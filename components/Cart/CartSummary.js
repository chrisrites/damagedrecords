import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

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
        name="Damaged Records"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_Jk7KsW1mZeoQtdAGedEKOfA000iR03YhTW"
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button 
          disabled={isCartEmpty || success}
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
        />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;
