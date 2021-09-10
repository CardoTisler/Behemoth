interface Action {
    type: string,
    payload: Payload
}

interface Payload{
    title: string | null,
    message: string | null
}

interface State {
    showError: boolean,
    message: null,
    title: null
}
export type {
    Action,
    Payload,
    State
}