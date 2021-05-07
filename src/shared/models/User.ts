import { Item } from './Item'

export interface User {
    username: string
    email: string
    password: string
    name?: string
    notes?: Item[]
    token: string
}

export interface UserLoginRequest {
    username: string
    password: string
}
