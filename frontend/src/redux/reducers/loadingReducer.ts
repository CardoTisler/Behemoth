interface loadingState {
    loading: boolean;
}

interface Action{
    type: string,
    loading: boolean
}

const loadingReducer = (state: loadingState = {loading: false}, action: Action ): loadingState => {
    switch (action.type){
        default:
            return {loading: false};
        case 'SHOW_LOADING':
            return {loading: true}
        
        case 'HIDE_LOADING':
            return {loading: false}
    }
}

export default loadingReducer