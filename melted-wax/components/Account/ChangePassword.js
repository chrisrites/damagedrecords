import React from 'react';
import axios from 'axios'
import { Button, Form, Message, Segment, Header, Icon } from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';
import globalStyles from '../../static/styles/global.module.scss';

function ChangePassword({ email }) {
    const [newPassword, setNewPassword] = React.useState("")
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
          setSuccess(true)
        } catch(error){
          catchErrors(error, setError)
        }finally {
          setLoading(false)
        }
      }

    return (
        <div className={globalStyles.contentContainer + " " + globalStyles.changePasswordContainer + " container"}>
            <Header>
                <h2>
                    <Icon name="key" />
                    Change Password
                </h2>
            </Header>
            {success ?
                <Message 
                    attached
                    success
                    header="Success."
                    content="Your password has been changed."
                    icon="star outline"
                />
            :
                <Message 
                    attached
                    content="Enter your new password below"
                    color="blue"
                />
            }
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
                    disabled={success}
                />
                <Button 
                    disabled={loading || success}
                    icon="pencil alternate"
                    type="submit"
                    color="orange"
                    content="Change Password"
                />
            </Segment>
            </Form> 
        </div>
    )
}

export default ChangePassword;
