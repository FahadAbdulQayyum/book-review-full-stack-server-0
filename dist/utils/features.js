"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendCookie = (user, res, message, statusCode = 200) => {
    // export const sendCookie = (user: IIUser, res: Response, message:string, statusCode:number = 200) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
        .json({
        success: true,
        message,
        user: user,
        token
    });
};
exports.sendCookie = sendCookie;
