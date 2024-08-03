import { Request, Response, NextFunction } from "express";
// import  User from "../models/User";
import  User from "@models/User";
import jwt from "jsonwebtoken";

interface DecodedToken {
    _id: string;
    iat: number;
    exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Authorization denied, token missing",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        console.log('decodeddd', decoded)
        const user = await User.findById(decoded._id).exec();
        console.log('userrrr', user)
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        req.rawTrailers.push(decoded._id)

        next();
    } catch (error) {
        console.log('errorrrr', error)
        return res.status(401).json({
            success: false,
            msg: "Invalid Token",
        });
    }
};