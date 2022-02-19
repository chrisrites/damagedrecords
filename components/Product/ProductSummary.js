import { Item, Label } from 'semantic-ui-react';
import AddProductToCart from './AddProductToCart';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/product.module.scss';

function ProductSummary({ name, mediaUrl, _id, price, sku, user }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header><h2 className={globalStyles.heading2}>{name}</h2></Item.Header>
          <Item.Description>
            <p id={styles.price}>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart user={user} productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ProductSummary;
