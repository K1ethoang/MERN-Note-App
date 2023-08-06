import "dotenv/config";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import route from "./routes";

const app = express();

app.use(express.json());

// HTTP logger
app.use(morgan("dev"));

// Route init
route(app);

app.use((req, res, next) => next(Error("Endpoint not found")));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage })
});

export default app;