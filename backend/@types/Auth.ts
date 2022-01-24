import {Request} from "express";

interface AuthenticatedUser {
    id: string;
    username: string;
}
export type AuthRequest = Request & {user: AuthenticatedUser}
export type FileRequest = AuthRequest & { file: any }
