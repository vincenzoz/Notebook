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
      state.notes = (payload) || []
    },
    selectNote(state, { payload }: PayloadAction<Item>) {
      state.notes = state.notes
        .map(((item) => {
          if (item.description === payload.description) {
            item.isSelected = !item.isSelected
          }
          return item
        }))
    },
  },
})

export const { updateNotes, selectNote } = notebook.actions
export default notebook.reducer
