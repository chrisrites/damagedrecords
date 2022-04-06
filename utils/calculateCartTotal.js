function calculateCartTotal(products){
    // acc for accumulator.  Like map function but adds values as it goes
    const total = products.reduce((acc, el) => {
        acc += el.product.price * el.quantity
        // pass the total to the next iteration of the products array to add the neext value
        return acc
        // the second parameter '0' is for the default total value
    }, 0)
    // Remove any rounding errors
    const cartTotal = ((total * 100) / 100).toFixed(2)
    // const stripeTotal = Number((total * 100).toFixed(2))

    // return { cartTotal, stripeTotal }
    return { cartTotal }
}

export default calculateCartTotal