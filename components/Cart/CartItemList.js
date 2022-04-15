import { useRouter } from 'next/router'
import { Header, Segment, Button, Icon, Item, Message } from 'semantic-ui-react'
import styles from '../../static/styles/cart.module.scss'

function CartItemList({ products, user, handleRemoveFromCart, success }) {
  const router = useRouter()
  
  function mapCartProductsToItems(products) {
    return products.map(p => ({
      childKey: p._id,
      header: (
        <Item.Header className={styles.cartItemName} as='a' onClick={() => router.push(`/product?_id=${p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.size ? 'Size: ' + p.size : ''}` ,
      description: `${p.quantity} x $${p.product.price}`,
      fluid: "true",
      extra: (
        <Button 
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p._id)}
        />    
      )
    }))
  }

  

  if(success) {
    return (
      <Message 
        success
        header="Success!"
        content="Your order and payment has been accepted"
        icon="star outline"
        green
      />
    )
  }

  if(products.length === 0){
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No merch in your basket.
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push('/store')}>
              View Merch
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push('/login')}>
              Login to Purchase
            </Button>
          )}
        </div>
      </Segment>
    )
  }
  
  return <Item.Group divided relaxed items={mapCartProductsToItems(products)}/>
}

export default CartItemList
