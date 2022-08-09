import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from 'express-validator';
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", [
    body('email', 'Email not valid')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password must be at least 5 characters')
        .trim()
        .isLength({ min: 5 })

], auth, login)

router.post("/register", [
    body('email', 'Email not valid')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password must be at least 5 characters')
        .trim()
        .isLength({ min: 5 })
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
],
    auth,
    register
)

export default router;