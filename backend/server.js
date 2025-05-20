import express from 'express';
import cors from 'cors';
import { get } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import 'dotenv/config'
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;

//middle ware
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get('/', (req, res) => {
    res.send("API is running");
})


app.listen(port, () =>{
    console.log(`Server Started on http://localhost:${port}`);
})
