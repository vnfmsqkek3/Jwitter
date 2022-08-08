import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * authController from '../controller/auth.js';

const router = express.Router();

//로그인을 할 때의 유효성검사
const validateCredential = [
    body('username')
     .trim()
     .notEmpty()
     .withMessage('username should be at least 5 characters'),
    body('password')
     .trim()
     .isLength({ min : 5})
     .withMessage('username should be at least 5 characters'),
     validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').notEmpty().withMessage('invalid email'),
    body('url').isURL().withMessage('invalid URL').optional({ nullable: true, checkFalsy: true}),
    validate
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

export default router;