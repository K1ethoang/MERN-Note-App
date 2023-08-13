import "dotenv/config";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import route from "./routes";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

// HTTP logger
app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URL,
    }),
}));

// Route init
route(app);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage })
});

export default app;