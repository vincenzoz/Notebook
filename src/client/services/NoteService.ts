import axios from 'axios';
import { Notes } from '../../shared/models/Notes';
import getServerUrl from './ProperiesUtils'
import alert, { alertConfig } from './../utility/alert'

const NoteService = {

    saveNotes(notes: Notes) {
        let config = { headers: { 'Access-Control-Allow-Origin': '*' } }
        axios.post(getServerUrl() + '/add', notes, config)
        .then(resp => {
            alert.showSuccessAlert(alertConfig.saveNoteSuccess)
        },
            error => console.log(error)
        )
    },

    async retrieveNotesByUsername(username: string) {
        const queryString = { params: {username: username }}
        return axios.get(getServerUrl() + '/getNotesByUsername', queryString).then(
            response => {
                return response.data
            }
        )
    },
    

    async deleteNotesByUsername(username: string): Promise<DeleteNoteResponse> {
        return new Promise((resolve) => { 
            alert.showConfirmAlert(alertConfig.deleteNoteConfirm)
                .then(result => {
                    if (result.isConfirmed) {
                        const queryString = { data: {username: username }}
                        axios.delete(getServerUrl() + '/deleteNotesByUsername', queryString)
                        .then((response) => {
                            alert.showSuccessAlert(alertConfig.deleteNoteSuccess)
                            let deleteCount: DeleteCount = DeleteCount.ZERO
                            if (response.data == 1) {
                                deleteCount = DeleteCount.ONE
                            }
                            const deleteResponse: DeleteNoteResponse = {deleteCount: deleteCount}
                            resolve(deleteResponse)
                        })
                    }
            })
         });
    }
}

export default NoteService

export interface DeleteNoteResponse {
    deleteCount: DeleteCount
    description?: string
    size?: number
}

export enum DeleteCount {
    ZERO,
    ONE,
    MULTY
}