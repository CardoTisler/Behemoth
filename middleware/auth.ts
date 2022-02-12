import {Request, Response, NextFunction} from "express"
import {VerifyErrors} from "jsonwebtoken";

const jwt = require("jsonwebtoken")
import { logger } from "../logger";

interface AuthenticatedUser {
    id: string,
    username: string,
}
type AuthRequest = Request & {user: AuthenticatedUser}

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = "0";
    try{
        token = (req.headers["x-access-token"] as string).split(" ")[1]
    } catch (err) {
        return res.status(401)
            .send({
                error: "JWT not in headers",
                isLoggedIn: false,
                statusText: "Failed to authenticate"
            });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: VerifyErrors, decoded: any) => {
        if(err) {
            logger.error(`Failed to verify current JWT token.`);
            return res.status(401).send({
                error: "Could not verify JWT token",
                isLoggedIn: false,
                statusText: "Failed to authenticate"
        });}
        req.user = {
            id: decoded.id,
            username: decoded.username
        }
        logger.info(`Successfully validated user ${req.user.username}`)
        next();
    })
}
