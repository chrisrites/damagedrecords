import { useState } from 'react'
import axios from 'axios';
import { Form, Header, Input, Button, Message, Accordion, Label, Segment, Icon, List, Image } from 'semantic-ui-react';
import catchErrors from '../../utils/catchErrors';
import baseURL from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';
import globalStyles from '../../static/styles/global.module.scss';

function AccountOrders({ orders }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [orderShipped, setOrderShipped] = useState([])
  const [trackingNumbers, setTrackingNumbers] = useState([])
  const [numberPosted, setNumberPosted] = useState([])

  async function toggleShipping(id, idx) { 
    const url = `${baseURL}/api/adminOrders`
    const payload = { id }
    await axios.put(url, payload)

    let newArr = [...orderShipped]
    newArr[idx] = true

    setOrderShipped(newArr)
  }; 

  function handleChange(event){
    const { value, id } = event.target
    // copy state array into new array
    let newArr = [...trackingNumbers]; 
    newArr[id] = value; 
    setTrackingNumbers(newArr);
  }

  function orderHasShipped(idx) {
    let newArr = [...orderShipped]
    if(newArr[idx]) {
      return true
    } else {
      return false
    }
  }

  async function postTracking(orderId, idx, email, orderNumber){
    const newArray = [...trackingNumbers];
    const trackingNumber = newArray[idx]
    try{
      setLoading(true)
      setError('')
      const url = `${baseURL}/api/postTrackingNumber`
      const payload = { orderId, trackingNumber, email, orderNumber }
      await axios.put(url, payload)
    } catch(error){
      catchErrors(error, setError)
    }finally {
      setLoading(false)
      let newNumberPosted = [...numberPosted];
      newNumberPosted[idx] = true
      setNumberPosted(newNumberPosted)
    } 
  }

  function trackingNumberPosted(idx) {
    let newArr = [...numberPosted]
    if(newArr[idx]) {
      return true
    } else {
      return false
    }
  }

  function mapOrdersToPanels(orders) {
    return orders.map((order, idx) => ({
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
                       
                      <List.Description>
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
            <h4 className={globalStyles.orderNumber}>Order ID: {order.orderID}</h4>
            <div className={globalStyles.shippingContainer}>
                <div className={globalStyles.shippingContainerInline}>
                    <h4 className={globalStyles.shippingStatusLabel}>Mark as shipped?</h4>
                    <input className={globalStyles.shippedCheckBox} type="checkbox" name="shipped" onChange={() => toggleShipping(order._id, idx)} disabled={orderHasShipped(idx)} ></input><br/>
                </div>
            </div>
            {orderHasShipped(idx) && 
              <div className={globalStyles.trackingNumberContainer}>
                <Form 
                  loading={loading} 
                  error={Boolean(error)} 
                  onSubmit={() => postTracking(order._id, idx, order.email, order.orderID)}
                >
                  <Message 
                    error
                    header="ERROR"
                    content={error}
                  />
                  <Form.Group width="equal">
                    <Form.Field 
                      control={Input}
                      label="Tracking Number"
                      placeholder=""
                      id={idx}
                      onChange={handleChange}
                      disabled={trackingNumberPosted(idx) || loading}
                    />
                  </Form.Group>
                  <Form.Field 
                    control={Button}
                    disabled={trackingNumberPosted(idx) || loading}
                    color="blue"
                    icon="send"
                    content="Submit"
                    type="submit"
                    style={{marginTop: "4px"}}
                  />
                </Form>
              </div>
            }
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
