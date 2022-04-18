import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
// import { handleLogin } from '../utils/auth';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/login.module.scss';

function passwordReset() {
  const [email, setEmail] = React.useState("")
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    email ? setDisabled(false) : setDisabled(true)
  }, [email])

  function handleChange(event){
    const { value } = event.target
    // setEmail(prevState => ({ ...prevState, [name]: value }))
    setEmail(value)
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/passwordReset`
      const payload = { email }
      const response = await axios.post(url, payload)
      setSuccess(true)
      // Make a request to signup user
    } catch(error){
      catchErrors(error, setError)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.loginContainer + " container"}>
          {success ?
            <Message 
                success
                header="Success."
                content="Your password has been reset and emailed to you.  Once logged back in, set a new password in the Account page"
                icon="star outline"/>
            :<Message 
                attached
                icon="privacy"
                header="Forgot your password?"
                content="Enter your email address and we will reset your password"
                color="blue"/>
            }
          <Form 
            error={Boolean(error)} 
            loading={loading} 
            onSubmit={handleSubmit}
          >
            <Message 
              error
              header="ERROR"
              content={error}
            />
            <Segment>
              <Form.Input 
                fluid
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                disabled={success}
              />
              <Button 
                disabled={disabled || loading || success}
                icon="key"
                type="submit"
                color="red"
                content="Reset Password"
              />
            </Segment>
          </Form>
          <Message attached="bottom" warning>
            <Icon name="info"/>
            New user?{" "}
            <Link href="/signup">
              <a>Sign up here</a>
            </Link>{" "}instead.
          </Message>
        </div>
      </div>
    </div>
  );
}

export default passwordReset;
