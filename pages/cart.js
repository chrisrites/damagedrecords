import React from 'react';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/cart.module.scss';


function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = React.useState(products)
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function handleRemoveFromCart(productId){
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const response = await axios.delete(url, payload)
    setCartProducts(response.data)
  }

  async function handleCheckout(paymentData) {
    let orderProcessed = false

    try{
      setLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = { paymentData }
      const headers = { headers: { Authorization: token } }
      await axios.post(url, payload, headers)
      setSuccess(true)
      orderProcessed = true;
    } catch(error){
      catchErrors(error, window.alert)
    }finally{
      setLoading(false)
    }
    if(orderProcessed) {
      // console.log("Front End MADE IT")
      try{
        const url = `${baseUrl}/api/emailNotification`
        // console.log("Front End MADE IT")
        await axios.post(url)
      } catch(error){
        catchErrors(error, window.alert)
      }
    }
  }

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.cartContainer + " container"}>
          <Segment loading={loading}>
            <CartItemList handleRemoveFromCart={handleRemoveFromCart} user={user} products={cartProducts} success={success}/>
            <CartSummary products={cartProducts} handleCheckout={handleCheckout} success={success}/>
          </Segment>
        </div>
      </div>
    </div>
  )
}

// Cart.getInitialProps = async ctx => {
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx) 
  if(!token) {
    return { props: { products: [] }}
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token }}
  const response = await axios.get(url, payload)
  // return { products: response.data }
  return response.data
}

export default Cart;
