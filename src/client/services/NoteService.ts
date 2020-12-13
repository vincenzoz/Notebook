import axios from 'axios';
import { Notes } from '../../shared/models/Notes';
import getServerUrl from './ProperiesUtils'

const NoteService = {

    saveNotes(notes: Notes) {
        let config = { headers: { 'Access-Control-Allow-Origin': '*' } }
        axios.post(getServerUrl() + '/add', notes, config)
        .then(resp => console.log(resp.data), 
              error => console.log(error))
    },

    async retrieveNotesByUsername(username: string) {
        const queryString = { params: {username: username }}
        let res;
        return axios.get(getServerUrl() + '/getNotesByUsername', queryString).then(
            response => {
                res = response
                return response.data
            }
        )
    },
    
    async deleteNotesByUsername(username: string) {
        const queryString = { data: {username: username }}
        let res;
        return axios.delete(getServerUrl() + '/deleteNotesByUsername', queryString).then(
            response => {
                res = response
                return response.data
            }
        )
    }
}

export default NoteService