import React from 'react';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/create.module.scss';

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState("")
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    // Object.values returns an array of the values in our product object.  Then the every function goes through each value and we're using the Boolean function to check if they have values (if they're truthy)
    const isProduct = Object.values(product).every(el => Boolean(el))
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  function handleChange(event){
    const { name, value, files } = event.target
    if(name === 'media'){
      setProduct(prevState => ({...prevState, media: files[0]}))
      // createOjectURL is great at creating image previews
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      // adding the arrow function within the setState hook and using the prevState object is called the "Updater Pattern". Without this each bit of state will be updated individually, instead of one state object being update on each form field change
      // putting name in square brackets tells react that this is a variable, not a string.  It's called a computed property
      setProduct(prevState => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload(){
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'damaged')
    data.append('cloud_name', 'chrischartranddevelopment')
    // const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const response = await axios.post("https://api.cloudinary.com/v1_1/chrischartranddevelopment/image/upload", data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  async function handleSubmit(event){
    try {
      // prevent the form submission from refreshing the page
      event.preventDefault()
      setLoading(true)
      setError('')
      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const { name, price, description } = product
      const payload = { name, price, description, mediaUrl }
      const response = await axios.post(url, payload)
      setProduct(INITIAL_PRODUCT)
      setSuccess(true)
    } catch(error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.createContainer + " container"}>
          <Header as="h2" block>
            <Icon name="add" color="orange" />
            Create New Product
          </Header>
          <Form inverted loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
            <Message 
              error
              header="ERROR"
              content={error}
            />
            <Message 
              success
              icon="check"
              header="Success!"
              content="Your product has been posted"
            />
            <Form.Group width="equal">
              <Form.Field 
                control={Input}
                name="name"
                label="Name"
                placeholder="Name"
                value={product.name}
                onChange={handleChange}
              />
              <Form.Field 
                control={Input}
                name="price"
                label="Price"
                placeholder="Price"
                min="0.00"
                step="0.01"
                type="number"
                value={product.price}
                onChange={handleChange}
              />
              <Form.Field 
                control={Input}
                name="media"
                type="file"
                label="Media"
                accept="image/*"
                content="Select Image"
                onChange={handleChange}
              />
            </Form.Group>
            <Image src={mediaPreview} rounded centered size="small" />
            <Form.Field 
              control={TextArea}
              name="description"
              label="Description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
            <Form.Field 
              control={Button}
              disabled={disabled || loading}
              color="blue"
              icon="pencil alternate"
              content="Submit"
              type="submit"
            />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct;
