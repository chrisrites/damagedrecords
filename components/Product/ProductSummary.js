import { Item, Label, Button, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddProductToCart from './AddProductToCart';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/product.module.scss';

function ProductSummary({ name, mediaUrl, _id, price, sku, user }) {
  const router = useRouter()

  return (
    <Item.Group>
      <Item>
        <Item.Image style={{marginLeft: 0}} size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header><h2 className={globalStyles.heading2}>{name}</h2></Item.Header>
          <Item.Description>
            <p id={styles.price}>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart user={user} productId={_id} />
          </Item.Extra>
          <Item.Extra>
          {user && 
            <>
              {/* <Button 
                color='blue'
                onClick={() => router.push('/cart')}
                style={{display:"block", marginBottom: "6px"}}
              >
                <Button.Content>
                  <Icon name='shop' />View Cart
                </Button.Content>
              </Button>
              <Button 
                color='green'
                onClick={() => router.push('/store')}
              >
                <Button.Content>
                  <Icon name='shopping bag' />Keep Shopping
                </Button.Content>
              </Button> */}
              <Link href="/store"><div className={styles.shoppingLinks} style={{marginBottom: "6px"}}><Icon name='shopping bag' />Keep Shopping</div></Link>
              <Link href="/cart"><div className={styles.shoppingLinks} style={{marginBottom: "6px"}}><Icon name='shop' />View Cart</div></Link>
            </>
          }
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ProductSummary;
