import React from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import cookie from 'js-cookie'

function AddProductToCart({ user, productId, size, price, artist, quantity }) {
  const [cartQuantity, setCartQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    // timeout variablee in case we need to cancel our setTimeout in the event of the user navigating off the current route before the timeout is finished
    let timeout

    if(success) {
      timeout = setTimeout(() => setSuccess(false), 3000) 
    }

    // stop our timeout if the user navigates off the current route during our 3 second timeout
    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  async function handleAddProductToCart() {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      // cartQuantity is what the user has currently selected, quantity is the available quantity of that product
      const payload = { cartQuantity, productId, size, price, artist, quantity }
      const token = cookie.get('token')
      const headers = { headers: { Authorization: token } }
      const response = await axios.put(url, payload, headers)
      // Check what's in our response to see if we have enough product for customer to add to basket
      const data = response.data
      switch(data.msg) {
        // OOS = Out of stock.  Not enough to complete the add to basket request
        case "OOS":
          alert("We currently don't have enough stock to add that many to your basket. We only have " + data.quantity + " of these left :(")
          break;
        case "Cart updated":
          setSuccess(true)
          break;
        default:
          break;
      }
    } catch(error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Input 
      type="number" 
      min="1" 
      placeholder="Quantity" 
      value={cartQuantity}
      onChange={event => setCartQuantity(Number(event.target.value))}
      action={
        user && success ? {
          color: 'blue',
          content: 'Item Added!',
          icon: 'plus cart',
          disabled: true
        } : 
        user ? { 
        color: "orange",
        content: "Add To Cart",
        icon: "plus cart",
        loading,
        disabled: loading || !cartQuantity,
        onClick: handleAddProductToCart
      } : {
        color: 'blue',
        content: 'Login To Purchase',
        icon: 'signup',
        onClick: () => router.push('/signup')
      }} 
    />
  )
}

export default AddProductToCart;
