interface Action{
    type: string,
    payload: Payload
}

interface Payload{
    message: string
}

interface successState {
    showSuccess: boolean,
    message: string | null
}

export type {
    Action,
    Payload,
    successState
}