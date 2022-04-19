import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import baseUrl from '../utils/baseUrl';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/product.module.scss';

function Product({ product, user }) {
  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.productContainer + " container"}>
          <ProductSummary user={user} {...product} />
          <ProductAttributes user={user} {...product} />
        </div>
      </div>
    </div>
  )
}

// query is destructured from ctx, and _id is destructured from query
// Product.getInitialProps = async ({ query: { _id } }) => {
export async function getServerSideProps({ query: { _id } }) {
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  return response.data
}

export default Product;
