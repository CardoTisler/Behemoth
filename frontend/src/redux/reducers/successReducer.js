const successReducer = (state = {showSuccess: false, message: null}, action) => {
    switch (action.type){
        default:
            return state
        
        case 'SHOW_SUCCESS':
            const message = action.payload.message
            return {
                showSuccess: true,
                message
            }

        case 'HIDE_SUCCESS':
            return {
                showSuccess: false,
                message: null
            }
    }
}

export default successReducer