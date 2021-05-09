import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../../shared/models/Item'

interface NotesState {
    notes: Item[]
}

const initialState = { notes: [] } as NotesState

const notebook = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    updateNotes(state, { payload }: PayloadAction<Item[]>) {
      state.notes = payload
    },
  },
})

export const { updateNotes } = notebook.actions
export default notebook.reducer
