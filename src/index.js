import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config(); 

connectDB()
.then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server is running at port : http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error("MongoDb Connection Failed:!!!", err);
});
