import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token){
    cookie.set('token', token)
    Router.push('/store')
    // Router.push('/account')
}

export function redirectUser(ctx, location) {
    // Check to see that we're on the server with ctx.req
    if(ctx.req){
        // redirect with Node.  302: We're are performing a url redirect
        ctx.res.writeHead(302, { Location: location })
        // stop writing to this response
        ctx.res.end()
        // Otherwise, redirect if we are on the client
    } else {
        Router.push(location)
    }
}

export function handleLogout(){
    cookie.remove('token')
    // Make sure we are logged out across all browser windows
    // We included the current time because we need to include SOMETHING as the second parameter for setItem
    window.localStorage.setItem('logout', Date.now())
    // Redirect to login page
    // Router.push('/login')
}