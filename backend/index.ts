import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use('/api', routes);

app.listen(PORT, async () => {
    console.log(`Server is running on port : ${PORT}`);
})