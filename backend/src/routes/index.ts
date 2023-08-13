import { Express } from "express-serve-static-core";
import noteRoutes from "./note";
import userRoutes from "./user";

const route = (app: Express) => {
    app.use("/api/notes", noteRoutes);
    app.use("/api/users", userRoutes);
}

export default route;