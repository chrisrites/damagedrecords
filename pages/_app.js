import App from "next/app";
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from "axios";
import Router from "next/router";
import { PayPalScriptProvider } from'@paypal/react-paypal-js'

class MyApp extends App {
  
  // This is a NEXT.JS function which lets us run getInitialProps and send it to each child Component
  static async getInitialProps({ Component, ctx }){
    const { token } = parseCookies(ctx)
    let pageProps = {}

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    if(!token) {
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'
      if(isProtectedRoute){
        redirectUser(ctx, '/login')
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user = response.data
        const isRoot = user.role === 'root'
        const isAdmin = user.role === 'admin'
        // If authenticated but not of role admin or root, redirect from '/create' pageProps
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create'
        if(isNotPermitted){
          redirectUser(ctx, '/')
        }
        pageProps.user = user
      } catch(error) {
        console.error("Error getting current user: ", error)
        // Throw out invalid token
        destroyCookie(ctx, 'token')
        // Redirect to login page
        redirectUser(ctx, 'login')
      }
    }
    
    return { pageProps }
  }

  componentDidMount() {
    // Detect when the storage event changes and call our syncLogout function (We change local storagee in our handleLogout function so we can make sure the user is logged out across all browswer windows)
    window.addEventListener('storage', this.syncLogout)
  }

  syncLogout = event => {
    if(event.key === 'logout'){
      Router.push('/login')
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <PayPalScriptProvider
        options={{ 
          // "client-id": process.env.PAYPAL_CLIENT_ID,
          "client-id": "AaHdCaMRG8nztlMTHgWLajyd5EHAiS_FpfPmSNE3BhQfCKcj5tmjljLW8ovVIJom0Kf8NkxJcFscWqEO",
          "currency": "CAD"
        }}
      >
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    );
  }
}

export default MyApp;
