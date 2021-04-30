import axios from 'axios'
import { User, UserLoginRequest } from '../../shared/models/User'
import getServerUrl from './ProperiesUtils'

function getMockUser(): User {
  const mockedUser: User = {
    username: 'Jhon',
    email: 'user@mail.com',
    password: '',
  }
  return mockedUser
}

function getUser(loginRequest: UserLoginRequest): Promise<User> {
  return axios.post(`${getServerUrl()}/login`, loginRequest).then(
    (response) => response.data,
  )
}

export { getMockUser, getUser }
