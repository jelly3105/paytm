import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { connectToDB } from "./database/connectToDB";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, async () => {
    await connectToDB();
    console.log(`Server is running on port : ${PORT}`);
})