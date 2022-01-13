export interface User {
    username: string,
    password: string,
}

export interface dbUser {
    username: string,
    password: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}
