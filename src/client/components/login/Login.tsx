import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserLoginRequest } from '../../../shared/models/User'
import { getUser } from '../../services/UserService'
import alert, { alertConfig } from '../../utility/alert'
import './login.css'
import { useAppDispatch } from '../../store/store'
import { login } from '../../store/authSlice'

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const history = useHistory()
  const dispatch = useAppDispatch()

  async function doLogin() {
    const loginRequest: UserLoginRequest = { username, password }
    await getUser(loginRequest)
      .then((result) => {
        if (result != null) {
          dispatch(login(result))
          history.push('/list')
        }
      })
      .catch(() => {
        alert.showInfoAlert(alertConfig.userNotFoundInfo)
      })
  }
  return (
    <div className="login-form centered">
      <form className="login-form centered" onSubmit={doLogin}>
        <input id="username" placeholder="username" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
        <input id="password" type="password" placeholder="password" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  )
}

export default Login
