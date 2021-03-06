// import { Card } from 'semantic-ui-react'
import Link from 'next/link';
import { Row, Col, Card } from 'react-bootstrap'
import styles from '../../static/styles/store.module.scss';

function ProductList({ products }) {
  // function mapProductsToItems(products){
  //   return products.map(product => ({
  //     header: product.name,
  //     image: product.mediaUrl,
  //     meta: `$${product.price}`,
  //     color: 'teal',
  //     fluid: true,
  //     childKey: product._id,
  //     href: `/product?_id=${product._id}`
  //   }))
  // }

  // return <Card.Group itemsPerRow="3" stackable centered items={mapProductsToItems(products)} />;
  return (
    // <Row xs={2} sm={3} md={4} lg={5} className="justify-content-center g-4">
    <Row className="justify-content-center">
        {products.map((product, idx) => (
          // If quantity < 1, set pointer events to none, not-clickable
          <Col key={idx} className="mb-4 d-flex align-items-stretch" xs={10} sm={6} md={4} lg={3} style={{pointerEvents: product.quantity < 1 && 'none'}}>
            <Link href={`/product?_id=${product._id}`}>
              <Card className={styles.productCard}>
                <div style={{overflow: "hidden"}}>
                  <Card.Img variant="top" src={product.mediaUrl} />
                </div>
                <Card.Body>
                  <Card.Title style={{color: "#222222"}}>{product.name}</Card.Title>
                  <Card.Text style={{color: "#222222"}}>
                    ${product.price}
                  </Card.Text>
                  {/* if quantity < 1, mark as sold out */}
                  {product.quantity < 1 && 
                  <Card.Text style={{color: "red", fontSize: "22px", fontWeight: "800"}}>
                    SOLD OUT
                  </Card.Text>
                  }
                </Card.Body>
              </Card>
              </Link>
          </Col>
        ))}
    </Row>
  )
}

export default ProductList;
