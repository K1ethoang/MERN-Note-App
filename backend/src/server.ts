import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// Connect DB
mongoose.connect(env.MONGODB_URL)
    .then(() => {
        console.log("Mongo connected!");
        app.listen(port, () => {
            console.log(`Server running on: http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error + "Can not connect to Mongo"));