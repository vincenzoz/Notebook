import axios from 'axios';
import { Notes } from '../../shared/models/Notes';
import { User } from '../../shared/models/User';
import getServerUrl from './ProperiesUtils'
import getMockedUser from './UserService'

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
                console.log(res)
                return response.data
            }
        )
    }
}

export default NoteService