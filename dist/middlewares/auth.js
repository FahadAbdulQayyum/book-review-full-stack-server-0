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
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Authorization denied, token missing",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('decodeddd', decoded);
        const user = yield User_1.User.findById(decoded._id).exec();
        console.log('userrrr', user);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }
        req.rawTrailers.push(decoded._id);
        next();
    }
    catch (error) {
        console.log('errorrrr', error);
        return res.status(401).json({
            success: false,
            msg: "Invalid Token",
        });
    }
});
