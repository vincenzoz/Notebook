import * as React from 'react'
import * as PropTypes from 'prop-types'
import { InferProps } from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserLoginRequest } from '../../../shared/models/User'
import { getUser } from '../../services/UserService'
import alert, { alertConfig } from '../../utility/alert'
import './login.css'

function Login({ setToken, setUser }: InferProps<typeof Login.propTypes>) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const history = useHistory()

  async function login() {
    const loginRequest: UserLoginRequest = { username, password }
    await getUser(loginRequest)
      .then((result) => {
        if (result != null) {
          setUser(result)
          setToken(result.token)
          history.push('/list')
        }
      })
      .catch(() => {
        alert.showInfoAlert(alertConfig.userNotFoundInfo)
      })
  }
  return (
    <div className="login-form centered">
      <form className="login-form centered" onSubmit={login}>
        <input id="username" placeholder="username" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
        <input id="password" type="password" placeholder="password" autoComplete="off" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default Login
