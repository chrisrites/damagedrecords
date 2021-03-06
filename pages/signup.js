import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/signup.module.scss';

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event){
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      setLoading(true)
      setError('')
      // Make a request to signup user
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch(error){
      catchErrors(error, setError)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.signupContainer + " container"}>
          <Message 
            attached
            icon="settings"
            header="Get Started"
            content="Create a new account"
            color="teal"
          />
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
                icon="user"
                iconPosition="left"
                label="Name"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <Form.Input 
                fluid
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Input 
                fluid
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />
              <Button 
                disabled={disabled || loading}
                icon="signup"
                type="submit"
                color="orange"
                content="Signup"
              />
            </Segment>
          </Form>
          <Message attached="bottom" warning>
            <Icon name="info"/>
            Existing user?{" "}
            <Link href="/login">
              <a>Login here</a>
            </Link>{" "}instead
          </Message>
        </div>
      </div>
    </div>
  );
}

export default Signup;
