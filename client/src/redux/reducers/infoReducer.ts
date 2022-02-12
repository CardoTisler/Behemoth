interface infoState {
    showInfo: boolean,
    message: string
}
interface Action{
    type: string,
    payload: string
}
const infoReducer = (state: infoState = {showInfo: false, message: ''}, action: Action) => {
    switch (action.type){
        default:
            return state
        
        case 'SHOW_INFO':
            return {
                showInfo: true,
                message: action.payload
            }

        case 'HIDE_INFO':
            return {
                showInfo: false,
                message: ''
            }
    }
}

export default infoReducer