import axios from 'axios';
import getServerUrl from './ProperiesUtils'

interface Notes {
    notes: string[]
}

class NoteService {

    addNote(noteListUpdated: string[]) {
        const notes: Notes = { "notes": noteListUpdated };
        let config = { headers: { 'Access-Control-Allow-Origin': '*' } }
        axios.post(getServerUrl() + '/add', notes, config).then(resp => console.log(resp.data))
    }
}

export default NoteService