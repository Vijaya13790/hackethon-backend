import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config";
import cors from "cors"; 
import IndexController from "./controllers/index";
import router from './routes';


dotenv.config();
connectDB();

const app = express();
const indexController = new IndexController();

app.use(cors()); 
app.use(express.json());

app.use(router);
console.log("Test log");
app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});
    