import { Express } from "express-serve-static-core";
import note from "./note"; ''

const route = (app: Express) => {
    app.use("/api/notes", note);
}

export default route;