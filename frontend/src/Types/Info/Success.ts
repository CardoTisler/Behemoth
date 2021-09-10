interface Action{
    type: string,
    payload: Payload
}

interface Payload{
    message: string
}


export type {
    Action,
    Payload
}