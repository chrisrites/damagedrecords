import React from "react"
import axios from 'axios'
import ProductList from '../components/Store/ProductList'
import ProductPagination from '../components/Store/ProductPagination'
import baseUrl from '../utils/baseUrl'

function Store({ products, totalPages }) {
   return (
        <div className="content-container">
            <ProductList products={products} />
            <ProductPagination totalPages={totalPages} />
        </div>
    )
}

// This is a NEXT.JS function to fetch data on the server (we don't have to wait until our component is mounted like using the useEffect hook)
Store.getInitialProps = async ctx =>{
    const page = ctx.query.page ? ctx.query.page : "1"
    const size = 9
    // fetch data on the server
    const url = `${baseUrl}/api/products`
    const payload = { params: { page, size } }  
    const response = await axios.get(url, payload);
    return response.data
    // return response data as an object
    // note: this object will be merged with existing props
}

export default Store;
