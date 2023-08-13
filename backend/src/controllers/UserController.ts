import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../models/User";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

interface LoginBody {
    username?: string,
    password?: string,
}

class UserController {
    // [GET] /api/users
    getAuthenticatedUser: RequestHandler = async (req, res, next) => {
        const authenticatedUserId = req.session.userId;

        try {
            if (!authenticatedUserId) {
                throw createHttpError(401, "User not authenticated");
            }

            const user = await User.findById(authenticatedUserId).select("+email");
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    // [POST] /api/users/signup
    signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
        const { username, email, password: passwordRaw } = req.body;

        try {
            if (!username || !email || !passwordRaw) {
                throw createHttpError(400, "Parameters missing");
            }

            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
            }

            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
            }

            const passwordHashed = await bcrypt.hash(passwordRaw, 10);

            const newUser = await User.create({
                username,
                email,
                password: passwordHashed,
            })

            req.session.userId = newUser._id;
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };

    // [POST /api/users/login
    login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                throw createHttpError(400, "Parameters missing");
            }

            const user = await User.findOne({ username }).select("+password +email");
            if (!user) {
                throw createHttpError(401, "Invalid credentials")
            }

            const passwordMatch = await bcrypt.compare(password, user.password!);
            if (!passwordMatch) {
                throw createHttpError(401, "Invalid credentials");
            }

            req.session.userId = user._id;
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    // [POST] /api/users/logout
    logout: RequestHandler = (req, res, next) => {
        req.session.destroy((error) => {
            if (error) {
                next(error);
            }
            else {
                res.sendStatus(200);
            }
        });
    }
}

export default new UserController;