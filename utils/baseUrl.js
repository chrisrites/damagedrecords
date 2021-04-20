// NODE_ENV is a node variable and lets us know if we're in development or production
const baseUrl = process.env.NODE_ENV === "production" 
    ? 'https://damaged-d2om28926-christopherchartrand.vercel.app'
    : 'http://localhost:3000'

export default baseUrl