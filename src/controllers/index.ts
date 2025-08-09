import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import UserService from "../services/UserService";
import Joi from "joi"; 
import { info, log } from "console";
import Logger from "../utils/Logger";


// Joi validation schemas
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    userType: Joi.string().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required()
});

class IndexController {

        private userService = new UserService();
        
    getIndex(req: Request, res: Response): void {
        res.send("Hello, World!");
    }

    async register(req: Request, res: Response): Promise<void> {
        try {

            // Joi validation
            const { error } = registerSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { name, email, userType, password } = req.body;

            await this.userService.registerUser(name, email, userType, password);

            res.status(201).json({ message: "User registered successfully" });
        } catch (err: any) {
            res.status(400).json({ message: err.message || "Server error" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {

            // Joi validation
            const { error } = loginSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { email, password, userType } = req.body;

            const user = await User.findOne({ email, userType });
            if (!user) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            Logger.info("Login attempt:", { email, userType, password });
            if (!isMatch) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: "1h"
            });

            res.status(200).json({ message: "Login successful", token });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    }
}

export default IndexController;


