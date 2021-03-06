import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';
import globalStyles from '../static/styles/global.module.scss';

const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
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
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
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
        <div className={globalStyles.contentContainer + " container"}>
          <div style={{maxWidth: "500px"}}>
            <Message 
              attached
              icon="privacy"
              header="Welcome Back"
              content="Login with email and password"
              color="blue"
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
                  icon="sign in"
                  type="submit"
                  color="orange"
                  content="Login"
                />
              </Segment>
            </Form>
            <Message attached="bottom" warning>
              <Icon name="info"/>
              New user?{" "}
              <Link href="/signup">
                <a>Sign up here</a>
              </Link>{" "}instead.{" "}
              <Link href="/password-reset">
                <a>Forgot password</a>
              </Link>?
            </Message>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
