import {Action} from '../../@types/Info/Error'

const defaultPayload = {
    title: null,
    message: null
}

export const showError = (title: string, message: string): Action => {
    return {
        type: 'SHOW_ERROR',
        payload: {
            title,
            message
        }
    }
}

export const hideError = (): Action => {
    return {
        type: 'HIDE_ERROR',
        payload: defaultPayload
    }
}