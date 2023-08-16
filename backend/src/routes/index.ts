import { Express } from "express-serve-static-core";
import noteRoutes from "./note";
import userRoutes from "./user";
import { requireAuth } from "../middlewares/auth";

const route = (app: Express) => {
    app.use("/api/notes", requireAuth, noteRoutes);
    app.use("/api/users", userRoutes);
}

export default route;