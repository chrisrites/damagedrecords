import { useState } from 'react'
import { Item, Label, Button, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddProductToCart from './AddProductToCart';
import globalStyles from '../../static/styles/global.module.scss';
import styles from '../../static/styles/product.module.scss';

function ProductSummary({ name, mediaUrl, _id, price, sku, user, size }) {
  const router = useRouter()
  const [selectSize, setSelectSize] = useState(size ? size[0] : '')

  const handleSelectSizeChange = (e) => {
    setSelectSize(e.target.value)
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image style={{marginLeft: 0}} size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header><h2 className={globalStyles.heading2}>{name}</h2></Item.Header>
          <Item.Description>
            <p id={styles.price}>${price}</p>
            {/* <Label>SKU: {sku}</Label> */}
          </Item.Description>
          <Item.Extra>
            {size &&
              <>
                <label id={styles.size}>Size:</label>
                <select id={styles.sizeSelect} value={selectSize} onChange={handleSelectSizeChange}>
                  {size.map( (x,y) => (
                    <option key={y} value={x}>{x}</option> 
                  ))}
                </select>
              </>
            }
            <AddProductToCart user={user} productId={_id} size={selectSize ? selectSize : undefined} />
          </Item.Extra>
          <Item.Extra>
          {user && 
            <>
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
