import express, { Request, Response, NextFunction } from "express";

import { User } from "../models/User";
import bcrypt from "bcrypt";
// import { IIUser, sendCookie } from "../utils/features";
import jwt from "jsonwebtoken";
import {sendCookie } from "../utils/features";
import {check, validationResult} from "express-validator";
import ErrorHandler from "../middlewares/error";

const router = express.Router();

// @routes POST api/users
// @desc Register a user
// @access Public

export const register = router.post('/', [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({min: 6}),
], async (req: Request, res: Response)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{msg: 'User already exists'}]});
        }

        user = new User({
            name, email, password
        });

        console.log('reigstration usre...', user)

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

console.log('hashed pass uer', user)

        await user.save();

        const payload = {
            // user: {
                _id: user.id
            // }
        }

        jwt.sign(payload, process.env.JWT_SECRET as string,{
            expiresIn: 360000
        },(err, token) => {
            if(err)throw err;
            res.json({token});
        })

        // res.send('User created in MongoDB.')

    } catch (err: any) {
        res.status(500).send('Server error');
        console.error(err.message);
    }
    
    // res.send('passed without errors')
})

// export const Login = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email })

//         // if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
//         if (!user) return res.json({ success: false, message: 'Invalid Email or Password' });

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch)
//             return res.json({ success: false, message: 'Invalid Email or Password' });
//         // return next(new ErrorHandler("Invalid Email or Password", 400));

//         sendCookie(user.toJSON(), res, `Welcome back, ${user.name}`, 200);
//     } catch (error) {
//         next(error);
//     }
// };

// export const Register = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { name, email, password } = req.body;

//         let user = await User.findOne({ email });

//         // // if (user) return next(new ErrorHandler("User Already Exist", 400));
//         if (user) return res.json({ success: false, message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);

//         user = await User.create({ name, email, password: hashedPassword });

//         sendCookie(user.toJSON(), res, "Registered Successfully", 201);

//     } catch (error) {
//         next(error);
//     }
// };

// export const getMyProfile = (req: Request, res: Response) => {

//     const {body} = req 
    
//     res.status(200).json({
//         success: true,
//         user: body.user,
//     });
// };

// export const UpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
//     console.log('UpdateProfile called....')
//     try {
//         const {params:{id}} = req

//         if (!req.body) {
//             return res.send({ success: false, message: "Empty (No data provided)" });
//           }

//           const updatedProfile = await User.findByIdAndUpdate(
//             id,
//             req.body
//           );

//           if (!updatedProfile) {
//             return res.status(404).send({ success: false, message: "Review not found" });
//         }

//           sendCookie(updatedProfile.toJSON(), res, "Profile Updated Successfully", 201);
//     } 
// catch (error) {
//         next(error);
//     }
// };

// export const logout = (req: Request, res: Response) => {
//     res
//         .status(200)
//         .clearCookie("token", {
//             httpOnly: true,
//             sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
//             secure: process.env.NODE_ENV === "Development" ? false : true,    
//         })
//         .json({
//             success: true,
//             message: "Logged out successfully"
//         });
// };