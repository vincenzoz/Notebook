import axios from 'axios'
import { UpdateNoteRequest } from '../../shared/models/Notes'
import getServerUrl from './ProperiesUtils'

const NoteService = {
  saveNotes(noteRequest: UpdateNoteRequest) {
    const config = { headers: { 'Access-Control-Allow-Origin': '*' } }
    return axios.post(`${getServerUrl()}/add`, noteRequest, config)
  },

  async retrieveNotesForUser(username: string) {
    const queryString = { params: { username } }
    return axios.get(`${getServerUrl()}/getNotesForUser`, queryString)
      .then((response) => response.data)
  },

  async deleteNotesForUser(username: string): Promise<any> {
    return axios.put(`${getServerUrl()}/deleteNotesForUser`, username)
  },
}

export default NoteService
