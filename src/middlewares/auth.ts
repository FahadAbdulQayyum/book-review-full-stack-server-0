import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
// import { IIUser } from "../utils/features";

interface DecodedToken {
    _id: string;
    iat: number;
    exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers['authorization']
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
        // const user = await User.findById(decoded.user._id).exec();
        const user = await User.findById(decoded._id).exec();
        console.log('userrrr', user)
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        // req.body.user = user;
        req.rawTrailers.push(decoded._id)
        // req.rawTrailers.push(decoded.user._id)

        next();
    } catch (error) {
        console.log('errorrrr', error)
        return res.status(401).json({
            success: false,
            msg: "Invalid Token",
        });
    }
};











// import { Request, Response, NextFunction } from "express";
// import { User, IUser } from "../models/user";
// import jwt from "jsonwebtoken";

// interface DecodedToken {
//     _id: string;
//     iat: number;
//     exp: number;
// }

// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.status(404).json({
//             success: false,
//             message: "Login First",
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

//         const user = await User.findById(decoded._id).exec();
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // req.user = user;
//         req.user = user as IUser;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token",
//         });
//     }
// };







// // import { Request, Response, NextFunction } from "express";
// // import { User, IUser } from "../models/user";
// // import jwt from "jsonwebtoken";
// // import { ObjectId } from "mongoose";

// // interface DecodedToken {
// //     _id: string;
// //     iat: number;
// //     exp: number;
// // }

// // export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
// //     const { token } = req.cookies;

// //     if (!token) {
// //         return res.status(404).json({
// //             success: false,
// //             message: "Login First",
// //         });
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

// //         const user = await User.findById(decoded._id).exec();
// //         if (!user) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User not found",
// //             });
// //         }

// //         req.user = user as IUser;
// //         next();
// //     } catch (error) {
// //         return res.status(401).json({
// //             success: false,
// //             message: "Invalid Token",
// //         });
// //     }
// // };





// // // import { Request, Response, NextFunction } from "express";
// // // import { User, IUser } from "../models/user";
// // // import jwt from "jsonwebtoken";
// // // import { Document, ObjectId } from "mongoose";

// // // interface DecodedToken {
// // //     _id: string;
// // //     iat: number;
// // //     exp: number;
// // // }

// // // export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
// // //     const { token } = req.cookies;

// // //     if (!token) {
// // //         return res.status(404).json({
// // //             success: false,
// // //             message: "Login First",
// // //         });
// // //     }

// // //     try {
// // //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

// // //         // const user = await User.findById(decoded._id) as IUser;
// // //         const user = await User.findById(decoded._id).exec();
// // //         if (!user) {
// // //             return res.status(404).json({
// // //                 success: false,
// // //                 message: "User not found",
// // //             });
// // //         }

// // //         // req.user = user as IUser & Document;
// // //         req.user = user as IUser;
// // //         next();
// // //     } catch (error) {
// // //         return res.status(401).json({
// // //             success: false,
// // //             message: "Invalid Token",
// // //         });
// // //     }
// // // };









// // // // import  { Request, Response, NextFunction } from "express";
// // // // import { User, IUser } from "../models/user";
// // // // import jwt from "jsonwebtoken";

// // // // interface DecodedToken {
// // // //     _id: string;
// // // //     iat: number;
// // // //     exp: number;
// // // // }

// // // // export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
// // // //     const { token } = req.cookies;
// // // //     console.log('token', token)

// // // //     if (!token)
// // // //         return res.status(404).json({
// // // //             success: false,
// // // //             message: "Login First",
// // // //         });
// // // //     }

// // // //     // // const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // //     // const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

// // // //     // req.user = await User.findById(decoded._id);
// // // //     // next();

// // // //     try {
// // // //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

// // // //         const user = await User.findById(decoded._id);
// // // //         if (!user) {
// // // //             return res.status(404).json({
// // // //                 success: false,
// // // //                 message: "User not found",
// // // //             });
// // // //         }

// // // //         req.user = user;
// // // //         next();
// // // //     } catch (error) {
// // // //         return res.status(401).json({
// // // //             success: false,
// // // //             message: "Invalid Token",
// // // //         });
// // // // }
// // // // };