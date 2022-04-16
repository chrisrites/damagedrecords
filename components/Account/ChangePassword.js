import React from 'react';
import axios from 'axios'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
// import Link from 'next/link';
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';
import globalStyles from '../../static/styles/global.module.scss';
import loginStyles from '../../static/styles/login.module.scss';

// const INITIAL_USER = {
//     email: "",
//     password: ""
//   }

function ChangePassword({ email }) {
    const [newPassword, setNewPassword] = React.useState("")
    // const [disabled, setDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState('')

    function updatePasswordState(event){
        const { value } = event.target
        setNewPassword(value)
    }

    async function handlePasswordChange(event){
        event.preventDefault()
        try{
          setLoading(true)
          setError('')
          const url = `${baseUrl}/api/changePassword`
          const payload = { email, newPassword }
          const response = await axios.post(url, payload)
        //   handleLogin(response.data)
          // Make a request to signup user
          setSuccess(true)
        } catch(error){
          catchErrors(error, setError)
        }finally {
          setLoading(false)
        }
      }

      if(success) {
        return (
          <Message 
            success
            header="Success!"
            content="Your password has been changed"
            icon="star outline"
          />
        )
      }

    return (
        <div className={globalStyles.contentContainer + " " + loginStyles.loginContainer + " container"}>
            <Message 
                attached
                icon="privacy"
                header="Change Your Password"
                content="Enter new password to change"
                color="blue"
            />
            <Form 
                error={Boolean(error)} 
                loading={loading} 
                onSubmit={handlePasswordChange}
            >
            <Message 
                error
                header="ERROR"
                content={error}
            />
            <Segment>
                {/* <Form.Input 
                    fluid
                    icon="envelope"
                    iconPosition="left"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    // onChange={handleChange}
                /> */}
                <Form.Input 
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label="New Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={updatePasswordState}
                />
                <Button 
                    disabled={loading}
                    icon="sign in"
                    type="submit"
                    color="orange"
                    content="Change Password"
                />
            </Segment>
            </Form>
            {/* <Message attached="bottom" warning>
                <Icon name="info"/>New user?{" "}
                <Link href="/signup">
                    <a>Sign up here</a>
                </Link>{" "}instead
            </Message> */}
        </div>
    )
}

export default ChangePassword;
