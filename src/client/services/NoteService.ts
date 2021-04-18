import axios from 'axios'
import { Notes } from '../../shared/models/Notes'
import getServerUrl from './ProperiesUtils'
import alert, { alertConfig } from '../utility/alert'

const NoteService = {

  saveNotes(notes: Notes) {
    const config = { headers: { 'Access-Control-Allow-Origin': '*' } }
    axios.post(`${getServerUrl()}/add`, notes, config)
      .then(() => {
        alert.showSuccessAlert(alertConfig.saveNoteSuccess)
      },
      (error) => console.log(error))
  },

  async retrieveNotesByUsername(username: string) {
    const queryString = { params: { username } }
    return axios.get(`${getServerUrl()}/getNotesByUsername`, queryString).then(
      (response) => response.data,
    )
  },

  async deleteNotesByUsername(username: string): Promise<DeleteNoteResponse> {
    return new Promise((resolve) => {
      alert.showConfirmAlert(alertConfig.deleteNoteConfirm)
        .then((result) => {
          if (result.isConfirmed) {
            const queryString = { data: { username } }
            axios.delete(`${getServerUrl()}/deleteNotesByUsername`, queryString)
              .then((response) => {
                alert.showSuccessAlert(alertConfig.deleteNoteSuccess)
                let deleteCount: DeleteCount = DeleteCount.ZERO
                if (response.data === 1) {
                  deleteCount = DeleteCount.ONE
                }
                const deleteResponse: DeleteNoteResponse = { deleteCount }
                resolve(deleteResponse)
              })
          }
        })
    })
  },
}

export default NoteService

export enum DeleteCount {
  ZERO,
  ONE,
  MULTY
}

export interface DeleteNoteResponse {
    deleteCount: DeleteCount
    description?: string
    size?: number
}
