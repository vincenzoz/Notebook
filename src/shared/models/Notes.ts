import { Item } from './Item'

export interface Notes {
    username: string,
    notes: Item[]
}

export interface UpdateNoteRequest {
    username: string,
    notes: Item[]
}
