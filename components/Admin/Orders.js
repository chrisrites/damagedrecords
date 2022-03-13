import axios from 'axios';
import { Header, Accordion, Label, Segment, Icon, Button, List, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import baseURL from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';
import globalStyles from '../../static/styles/global.module.scss';
// import Order from '../../models/Order';
// import toggleShipping from '../../utils/toggleShipping';
// import { OrderReturns } from 'stripe/lib/resources';

function AccountOrders({ orders }) {
  const router = useRouter()

  async function toggleShipping(id) { 
    const url = `${baseURL}/api/adminOrders`
    console.log("Front End Order#:" + id)
    const payload = { id }
    await axios.put(url, payload)

    // const url = `${baseUrl}/api/product`
    // const payload = { params: { _id } }
    // await axios.put(url, payload)
    // router.push('/store')

    // console.log("Toggled")
  }; 

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3">
              <Label  
                content={order.email}
                icon="mail"
                basic
                horizontal
                // style={{ marginLeft: '1em' }}
              />
              <List style={{ marginBottom: "0" }}>
                {order.products.map(p => (
                  <List.Item key={p.product._id}>
                    <Image style={{marginTop: "10px"}} avatar src={p.product.mediaUrl} />
                    <List.Content>
                      <List.Header>{p.product.name}</List.Header>  
                      <List.Description>
                        {p.quantity} x {p.product.price}
                      </List.Description>
                    </List.Content>
                    <List.Content floated="right">
                      <Label style={{width: "100px", textAlign: 'center'}} tag color="red" size="tiny">
                        {p.product.sku}
                      </Label>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
              <span className={globalStyles.orderTotal}>Total: ${order.total}</span>
            </List.Header>
            <div className={globalStyles.shippingContainer}>
                <div className={globalStyles.shippingContainerInline}>
                    <h4 className={globalStyles.shippingStatusLabel}>Mark as shipped?</h4>
                    <input className={globalStyles.shippedCheckBox} type="checkbox" name="shipped" onChange={() => toggleShipping(order._id)}></input>
                </div>
            </div>
          </>
        )
      }
    }))
  }

  return <>

    <Header as="h2" block>
        <Icon name="shipping" color="green" />
        New Orders
    </Header>
    {orders.length === 0 ? (
      <Segment inverted tertiary color="grey" textAlign="center">
        <Header icon>
          <Icon name="copy outline" />
          No new orders
        </Header>
        {/* <div>
          <Button onClick={() => router.push('/store')} color="orange">
            View Products
          </Button>
        </div> */}
      </Segment>
    ) : (
      <Accordion 
        fluid
        styled
        exclusive={false}
        panels={mapOrdersToPanels(orders)}
      />
    )}
  </>;
}

export default AccountOrders;
