import { Header, Accordion, Label, Segment, Icon, Button, List, Image } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import formatDate from '../../utils/formatDate'
import globalStyles from '../../static/styles/global.module.scss'

function AccountOrders({ orders }) {
  const router = useRouter()

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3" style={{ marginBottom: "0" }}>
              <Label  
                content={order.email}
                icon="mail"
                basic
                horizontal
              />
              <List style={{ marginBottom: "0" }}>
                {order.products.map((p, idx) => (
                  <List.Item key={idx}>
                    <Image style={{marginTop: "10px"}} avatar src={p.product.mediaUrl} />
                    <List.Content>
                      <List.Header>{p.product.name}</List.Header> 
                      {p.size &&
                        <List.Description style={{margin: "4px 0"}}>
                          Size: {p.size}
                        </List.Description>
                      } 
                      <List.Description style={{margin: "4px 0"}}>
                        {p.quantity} x {p.product.price}
                      </List.Description>
                    </List.Content>
                    {/* <List.Content floated="right">
                      <Label style={{width: "100px", textAlign: 'center'}} tag color="red" size="tiny">
                        {p.product.sku}
                      </Label>
                    </List.Content> */}
                  </List.Item>
                ))}
              </List>
              <span className={globalStyles.orderTotal}>Total: ${order.total}</span>
            </List.Header>
            <h4 className={globalStyles.orderNumber}>Order #: {order.orderID}</h4>
            <div className={globalStyles.shippingContainer}> 
              <div className={globalStyles.shippingContainerInline}> 
                <h4 className={globalStyles.shippingStatusLabel}>Shipping Status:</h4>
                {order.shipped ? 
                  <h5 className={globalStyles.shippingStatus} style={{color: '#00cc00'}}>Shipped</h5>
                :
                  <h5 className={globalStyles.shippingStatus} style={{color: 'red'}}>Processing</h5>
                }
              </div>
            </div>
          </>
        )
      }
    }))
  }

  return <>
    
    <Header>
      <h2>
        <Icon name="folder open" />
        Order History
      </h2>
    </Header>
    {orders.length === 0 ? (
      <Segment inverted tertiary color="grey" textAlign="center">
        <Header icon>
          <Icon name="copy outline" />
          No past orders
        </Header>
        <div>
          <Button onClick={() => router.push('/store')} color="orange">
            View Products
          </Button>
        </div>
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
