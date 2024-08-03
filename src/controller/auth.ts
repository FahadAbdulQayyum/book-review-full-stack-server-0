import  express, { Request, Response, NextFunction } from "express";

import User from "../models/User";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth";
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator";

const router = express.Router()

// @routes GET api/auth
// @desc Get the logged in user    
// @access Private

export const getLoggedIn = router.get('/', auth, async (req: Request, res: Response)=> {
    try {
        console.log('welcome but...', req.rawTrailers[0])
        const user = await User.findById(req.rawTrailers[0]);
        res.json(user)

    } catch (err: any) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @routes POST api/auth
// @desc Authorize user and get the token    
// @access Public

export const login: any = router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({min: 6}),
], async (req: Request, res: Response)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { email, password } = req.body;

    console.log('reqbodyyyy0', req.body)

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: "Invalid email", success: false});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid password', success:false});            
        }

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