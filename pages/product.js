import axios from 'axios'
import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributes'
import baseUrl from '../utils/baseUrl'

function Product({ product, user }) {
  return (
    <>
      <ProductSummary user={user} {...product} />
      <ProductAttributes user={user} {...product} />
    </>
  )
}

// query is destructured from ctx, and _id is destructured from query
// Product.getInitialProps = async ({ query: { _id } }) => {
export async function getServerSideProps({ query: { _id } }) {
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  // return { product: response.data }
  return response.data
}

export default Product;
