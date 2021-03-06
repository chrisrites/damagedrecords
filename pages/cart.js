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
  const [orderNumber, setOrderNumber] = React.useState()

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

  async function handleCheckout(currentUserEmail, orderID, totalAmount, cartAmount, shippingAmount) {
    let orderProcessed = false

    try{
      setLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = { currentUserEmail, orderID, totalAmount, cartAmount, shippingAmount }
      const headers = { headers: { Authorization: token } }
      await axios.post(url, payload, headers)
      setSuccess(true)
      orderProcessed = true;
      window.scrollTo(0, 0)
    } catch(error){
      catchErrors(error, window.alert)
    }finally{
      setLoading(false)
    }
    if(orderProcessed) {
      // Email order notificationn to MWR
      try{
        const url = `${baseUrl}/api/emailNotification`
        const payload = { orderNumber }
        await axios.post(url, payload)
      } catch(error){
        catchErrors(error, window.alert)
      }
      // Email order confirmation to Customer
      try{
        const url = `${baseUrl}/api/emailCustomer`
        const payload = { orderNumber, user }
        await axios.post(url, payload)
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
            <CartSummary products={cartProducts} handleCheckout={handleCheckout} currentUserEmail={user.email} success={success} orderNumber={orderNumber} setOrderNumber={setOrderNumber} />
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
  return response.data
}

export default Cart;
