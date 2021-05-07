import axios from 'axios'
import { User, UserLoginRequest } from '../../shared/models/User'
import getServerUrl from './ProperiesUtils'

function getMockUser(): User {
  const mockedUser: User = {
    username: 'Jhon',
    email: 'user@mail.com',
    password: '',
    token: 'bla bla bla',
  }
  return mockedUser
}

async function getUser(loginRequest: UserLoginRequest): Promise<User> {
  return axios.post(`${getServerUrl()}/login`, loginRequest).then(
    (response) => {
      response.data.token = response.headers.token
      return response.data
    },
  )
}

export { getMockUser, getUser }
