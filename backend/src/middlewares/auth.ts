import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requireAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }

}