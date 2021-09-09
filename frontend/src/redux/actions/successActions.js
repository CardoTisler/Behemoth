export const showSuccess = (message) => {
    return {
        type: 'SHOW_SUCCESS',
        payload: {
            message
        }
    }
}

export const hideSuccess = () => {
    return {
        type: 'HIDE_SUCCESS'
    }
}