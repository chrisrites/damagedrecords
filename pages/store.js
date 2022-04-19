import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/Store/ProductList';
import ProductPagination from '../components/Store/ProductPagination';
import baseUrl from '../utils/baseUrl';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/store.module.scss';

function Store({ products, totalPages }) {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentTotalPages, setCurrentTotalPages] = useState(0);

    useEffect(() => {
        setCurrentTotalPages(totalPages);
    }, [])

    useEffect(() => {
        setCurrentProducts(products);
    },[products])
   
    // Passing null to this function acts to reset the filter.  ie it re-gets all the products
    async function filterProducts(filter){
        const page = 1
        const size = filter ? 99 : 12;
        
        
        // fetch data on the server
        const url = `${baseUrl}/api/products`
        const payload = { params: { page, size, filter } }  
        try {
            const response = await axios.get(url, payload).then(res => {
                setCurrentProducts(res.data.props.products)
                setCurrentTotalPages(res.data.props.totalPages)
            });
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className={globalStyles.pageContainer}>
            <div className={globalStyles.darkContainer}>
                <div className={globalStyles.contentContainer + " " + styles.storeContainer + " container"}>
                    <h2 className={globalStyles.newsh2} id={styles.storeh2}>Melted Store</h2>
                    <div id={styles.filterContainer}>   
                        <select id={styles.filterSelect} name="filter" onChange={(e) => filterProducts(e.target.value)}>
                            <option className={styles.filterOption} value="">All Artists</option>  
                            <option className={styles.filterOption} value="aciidz">Aciidz</option>
                            <option className={styles.filterOption} value="choirz">Choirz</option>
                            <option className={styles.filterOption} value="zuku">ZUKU</option>
                        </select>
                    </div>
                    <ProductList products={currentProducts} />
                    <ProductPagination totalPages={currentTotalPages} />
                </div>
            </div>
        </div>
    )
}

// This is a NEXT.JS function to fetch data on the server (we don't have to wait until our component is mounted like using the useEffect hook)
// Store.getInitialProps = async ctx => {
export async function getServerSideProps(context){
    const page = context.query.page ? context.query.page : "1"
    const size = 12
    const filter = null
    // fetch data on the server
    const url = `${baseUrl}/api/products`
    const payload = { params: { page, size, filter } }  
    const response = await axios.get(url, payload);
    return response.data
}

export default Store;