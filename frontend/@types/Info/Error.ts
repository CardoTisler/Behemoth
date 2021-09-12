interface Action {
    type: string,
    payload: Payload
}

interface Payload{
    title: string | null,
    message: string | null
}

interface errorState {
    showError: boolean,
    message: string | null,
    title: string | null
}
export type {
    Action,
    Payload,
    errorState
}