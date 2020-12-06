import axios from 'axios';
import getServerUrl from './ProperiesUtils'

class NoteService {

    addNote() {
        const url = getServerUrl()
        console.log('addNote()', url)
        axios.get(url + '/add').then(resp => console.log(resp.data))
    }
}

export default NoteService