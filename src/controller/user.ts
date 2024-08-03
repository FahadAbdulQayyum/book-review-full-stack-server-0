import express, { Request, Response, NextFunction } from "express";

import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator";

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
                _id: user.id
        }

        jwt.sign(payload, process.env.JWT_SECRET as string,{
            expiresIn: 360000
        },(err, token) => {
            if(err)throw err;
            res.json({token});
        })


    } catch (err: any) {
        res.status(500).send('Server error');
        console.error(err.message);
    }
    
})

