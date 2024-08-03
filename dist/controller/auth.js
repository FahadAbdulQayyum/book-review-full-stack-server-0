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
exports.login = exports.getLoggedIn = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// @routes GET api/auth
// @desc Get the logged in user    
// @access Private
exports.getLoggedIn = router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('welcome but...', req.rawTrailers[0]);
        const user = yield User_1.User.findById(req.rawTrailers[0]);
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
// @routes POST api/auth
// @desc Authorize user and get the token    
// @access Public
exports.login = router.post('/', [
    (0, express_validator_1.check)('email', 'Please enter a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'Please enter a password with at least 6 characters').isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log('reqbodyyyy0', req.body);
    try {
        let user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email", success: false });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password', success: false });
        }
        const payload = {
            _id: user.id
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        res.status(500).send('Server error');
        console.error(err.message);
    }
}));
