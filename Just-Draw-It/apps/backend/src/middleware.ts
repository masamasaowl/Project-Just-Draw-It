import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || " ";

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || "";

    if (!token) {
        return res.status(401).json({ error: "Token missing from Authorization header" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        // error
        if (err || !decoded) {
            return res.status(403).json({ error: "Invalid or expired token!" });
        }

        // fix ts error
        // decoded can be string OR object, so ensure it's JwtPayload
        const payload = decoded as JwtPayload;
        // successful security check
        req.user = {
            id: payload.id as string,
            email: payload.email as string,
            username: payload.username as string | undefined,
        };
    });   
};

export default AuthToken;