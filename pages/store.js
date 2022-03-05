import React from 'react';
import axios from 'axios';
import ProductList from '../components/Store/ProductList';
import ProductPagination from '../components/Store/ProductPagination';
import baseUrl from '../utils/baseUrl';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/store.module.scss';

function Store({ products, totalPages }) {
   return (
        <div className={globalStyles.pageContainer}>
            <div className={globalStyles.darkContainer}>
                <div className={globalStyles.contentContainer + " " + styles.storeContainer + " container"}>
                    <h2 className={globalStyles.newsh2} id={styles.storeh2}>Melted Store</h2>
                    <ProductList products={products} />
                    <ProductPagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}

// This is a NEXT.JS function to fetch data on the server (we don't have to wait until our component is mounted like using the useEffect hook)
// Store.getInitialProps = async ctx => {
export async function getServerSideProps(context){
    // const page = ctx.query.page ? ctx.query.page : "1"
    const page = context.query.page ? context.query.page : "1"
    const size = 8
    // fetch data on the server
    const url = `${baseUrl}/api/products`
    const payload = { params: { page, size } }  
    const response = await axios.get(url, payload);
    return response.data
    // return { 
    //     props: { response }
    // }
    // return response data as an object
    // note: this object will be merged with existing props
}

export default Store;