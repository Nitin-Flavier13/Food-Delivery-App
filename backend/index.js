import express from "express";
import mongoDB from "./database.js";
import CreateUserRoute from "./Routes/CreateUser.js";
import DisplayDataRoute from "./Routes/DisplayData.js";
import OrderRoute from "./Routes/OrderData.js";

const app = express();
const PORT = 5000;
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use('/api', CreateUserRoute);
app.use('/api', DisplayDataRoute);
app.use('/api', OrderRoute);

app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(PORT,()=>{
    console.log(`Connected to port ${PORT}`);
})