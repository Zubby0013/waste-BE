import express,{Application} from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConnect } from "./config/dbConfig";

const port: number = 2000;
const app:Application = express();

app.use(cors());
app.use(express.json());
mainApp(app);

const server = app.listen(port, ()=>{
   dbConnect()
    
})
process.on("uncaughtException", (error:Error)=>{
    console.log("uncaughtException",error)
    process.exit(1)
})

process.on("unhandledRejection",(reason: Error)=>{
    console.log("unhandledRejection",reason);
    server.close(()=>{
        process.exit(1)
    })
})