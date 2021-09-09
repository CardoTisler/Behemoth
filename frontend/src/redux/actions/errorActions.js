export const showError = (title, message) => {
    return {
        type: 'SHOW_ERROR',
        payload: {
            title,
            message
        }
    }
}

export const hideError = () => {
    return {
        type: 'HIDE_ERROR'
    }
}