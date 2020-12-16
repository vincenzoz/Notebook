import Swal, { SweetAlertOptions } from "sweetalert2";

interface ContextualAlertOptions {
    title: string
}

export interface SuccessAlertOptions extends ContextualAlertOptions {
    text?: string
}

export interface ConfirmAlertOptions extends ContextualAlertOptions {
    text: string
    confirmButtonText: string
}

export interface InfoAlertOptions extends ContextualAlertOptions {
}

function showConfirmAlert(alertConfig: ConfirmAlertOptions) {
    const questionAlertOptions: SweetAlertOptions = {
        icon: 'warning',
        title: alertConfig.title,
        text: alertConfig.text,
        confirmButtonColor: '#3085d6',
        confirmButtonText: alertConfig.confirmButtonText,
        cancelButtonColor: '#d33',
        showCancelButton: true,
    }

    return sholwAlert(questionAlertOptions)
}

function showInfoAlert(alertConfig: InfoAlertOptions) {
    const options: SweetAlertOptions = {
        icon: 'info',
        title: alertConfig.title,
    }
    addDefaultOptions(options)
    sholwAlert(options)
}

function showSuccessAlert(alertConfig: SuccessAlertOptions) {
    const options: SweetAlertOptions = {
        icon: 'success',
        title: alertConfig.title,
        text: alertConfig.text !== undefined ? alertConfig.text : null
    }
    addDefaultOptions(options)
    sholwAlert(options)
}

function sholwAlert(config: SweetAlertOptions) {
    return Swal.fire(config)
}

function addDefaultOptions(config: SweetAlertOptions) {
    config['showConfirmButton'] = false
    config['timer'] = 2500
}

export const alertConfig = {
    deleteNoteConfirm:  {
        title: 'Are you sure you want to delete?', text: "All notes will be lost!", confirmButtonText: 'Yes, delete!'
    },
    deleteNoteSuccess:  {
        title: 'Good!', text: 'Your notes have been deleted.'
    },
    saveNoteSuccess:  {
        title: 'Notes saved correctly'
    },
    saveNoteInfo:  {
        title: 'There are no notes to save'
    },
    deleteNoteInfo:  {
        title: 'There are no notes to delete'
    }
}

export default {showSuccessAlert, showInfoAlert, showConfirmAlert, alertConfig}