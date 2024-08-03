"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { IIUser, sendCookie } from "../utils/features";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// @routes POST api/users
// @desc Register a user
// @access Public
exports.register = router.post('/', [
    (0, express_validator_1.check)('name', 'Please enter a name').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Please enter a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'Please enter a password with at least 6 characters').isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        user = new User_1.User({
            name, email, password
        });
        console.log('reigstration usre...', user);
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(password, salt);
        console.log('hashed pass uer', user);
        yield user.save();
        const payload = {
            // user: {
            _id: user.id
            // }
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
        // res.send('User created in MongoDB.')
    }
    catch (err) {
        res.status(500).send('Server error');
        console.error(err.message);
    }
    // res.send('passed without errors')
}));
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
