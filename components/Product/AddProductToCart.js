import React from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import cookie from 'js-cookie'

function AddProductToCart({ user, productId, size }) {
  const [quantity, setQuantity] = React.useState(1)
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
      // if (size) {
      const payload = { quantity, productId, size }
      const token = cookie.get('token')
      const headers = { headers: { Authorization: token } }
      console.log('Fake console log')
      await axios.put(url, payload, headers)
      setSuccess(true)
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
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
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
        disabled: loading,
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
