import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserLoginRequest } from '../../../shared/models/User'
import { getUser } from '../../services/UserService'
import alert, { alertConfig } from '../../utility/alert'
import './login.css'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const history = useHistory()

  function login() {
    console.log(username, password)
    const loginRequest :UserLoginRequest = { username, password }
    getUser(loginRequest)
      .then((result) => {
        if (result) {
          history.push('/list')
        } else {
          alert.showInfoAlert(alertConfig.userNotFoundInfo)
        }
      })
      .catch(() => {
        console.log('Error!')
      })
  }

  return (
    <div className="login-form centered">
      <input id="username" placeholder="username" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
      <input id="password" type="password" placeholder="password" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
      <div className="loginButton" onClick={login}>Login</div>
    </div>
  )
}

export default Login
