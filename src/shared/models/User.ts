import { Item } from './Item'

export interface User {
    username: string
    email: string
    password: string
    name?: string
    notes?: Item[]
}

export interface UserLoginRequest {
    username: string
    password: string
}
