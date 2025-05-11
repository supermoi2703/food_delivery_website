import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';


//app config
const app = express();
const port = 4000;

//middle ware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
// app.use("/image", express.static('uploads'))


app.get('/', (req, res) => {
    res.send("API is running");
})


app.listen(port, () =>{
    console.log(`Server Started on http://localhost:${port}`);
})
