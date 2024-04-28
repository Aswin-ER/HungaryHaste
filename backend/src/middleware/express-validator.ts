import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

export const validateSignup = [
    body('name').trim().notEmpty().escape().withMessage('Name is too short!'),
    body('email').isEmail().escape().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().isLength({ min: 8}).escape().withMessage('Please provide strong password!'),
    body('phone').isMobilePhone('any').escape().withMessage('Invalid phone number!'),
    (req: Request, res: Response, next: NextFunction)=> {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ success: false, errors: errors.array()});
        }
        next();
    }
];